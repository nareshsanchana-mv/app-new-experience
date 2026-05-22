# Reflections Habit Loop — Design Spec

**Date:** 2026-05-22
**Scope:** Wire a demo-able reflection habit loop across the Today screen (mood pills), Eve chat (save-as-reflection), and Profile screen (reflections summary card), unified by a new in-memory reflections store.

## Goal

Today the Reflections screen exists with mock history, but reflections are not actually capturable from anywhere else in the app. This design makes reflections a habit loop: log a mood from Today, deepen with Eve, save the chat back as a reflection, and review the cumulative picture from Profile — all backed by one live in-session data store so the demo flow feels real.

## Non-goals

- Persistence across reloads. State lives in-memory only; the seed resets on app restart. Sufficient for a demo.
- Editing previously-saved reflections. Tap-through to the Reflections screen is read-only for past days.
- Real AI for Eve. Existing `getMockReply` keeps driving responses.

---

## Architecture: `ReflectionsContext`

New context provider at `src/context/ReflectionsContext.tsx`, mounted in `App.tsx` between `DemoProvider` and `SafeAreaProvider`.

### Shape

```ts
interface ReflectionsContextType {
  reflectionHistory: ReflectionDay[];           // live state, mutable via actions
  todayEntry: ReflectionDay;                    // computed: history[0]
  stats: { currentStreak: number; daysWithInput: number };  // computed from history
  logMood: (mood: Mood) => void;
  saveJournalText: (text: string) => void;
  saveEveConversation: (entry: { title: string; snippet: string }) => void;
}
```

### Behavior

- **Initial state** — seed with the existing `reflectionHistory` array currently exported from `src/data/reflectionsData.ts`. After this change, the export stays (re-exported from context internals) but consumers read it via `useReflections()`.
- **`logMood(mood)`** — sets `history[0].mood = mood` and `history[0].hasUserInput = true`. Overwrites previous mood for today; does not append.
- **`saveJournalText(text)`** — sets `history[0].journalText = text` and `hasUserInput = true`. Overwrites.
- **`saveEveConversation({ title, snippet })`** — appends a new `EveConversationEntry` with id `eve-${Date.now()}` and `timestamp` formatted as `"h:mm AM/PM"` (matching the snippet style already in mock data). Sets `hasUserInput = true`.
- **Streak computation** — `currentStreak` is the count of consecutive days from today backward where `hasUserInput === true`. (Same logic as the current `getReflectionStats()` helper, lifted into context.)

### Migration of existing consumers

- `ReflectionsScreen.tsx` — switch from `import { reflectionHistory, getReflectionStats } from '../data/reflectionsData'` to `const { reflectionHistory, stats } = useReflections()`.
- `ReflectionsCard.tsx` — same switch. Mood selection on this card calls `logMood`. Journal-input save calls `saveJournalText`.
- `src/data/reflectionsData.ts` — keep type exports (`Mood`, `ReflectionDay`, `EveConversationEntry`, `ActivityEntry`, `moodOptions`, `evePrompts`) and the seed data export, but remove `getReflectionStats` (moved into context).

---

## Piece 1 — Mood pills in the Eve toast on Today

**Location:** Inside the returning-active Eve toast card at `src/components/AdaptiveGreeting.tsx:203-232` (the `LinearGradient` styled `eveToast`). Shows only for scenarios 3–6 (returning-active), never on first-visit or free-user scenarios.

### Layout addition

Within the same gradient card, below the existing greeting row, add:

1. A 1px divider — `rgba(255,255,255,0.08)`, full width, vertical margin 12.
2. A small label — text *"How's today?"*, typography.caption, color `rgba(255,255,255,0.7)`.
3. A row of 5 mood pills using `moodOptions` from reflectionsData. Pills are emoji-forward with the mood label underneath, evenly spaced (`justifyContent: 'space-between'`).

### Pill style (dark-gradient variant)

```
Default:    bg rgba(255,255,255,0.08)   border rgba(255,255,255,0.12)   label rgba(255,255,255,0.8)
Selected:   bg LinearGradient #6C5CE7 → #9B8FFF   border #9B8FFF   label #fff
Disabled:   n/a (always tappable)
```

Pill dimensions: ~52×64 (emoji 24, label 11pt). Selected state shows the gradient fill behind the emoji.

### Interactions

- **Tap a mood pill** —
  1. Call `logMood(mood)`.
  2. Call new prop `onMoodReflect(mood)` which `NewTodayScreen` wires to:
     - Set `eveChatInitialMessage = evePrompts[mood]` (existing map in `reflectionsData.ts`, e.g. for *amazing* → *"That's wonderful to hear! What made today so special?…"*).
     - Set `showEveChat = true`.
     - **No EveChat change required.** The existing `getInitialMessages` at `EveChat.tsx:201-205` already takes `initialMessage` and renders it as the first Eve bubble prefixed with `"Hi {userName}! "`. The mood prompts in `evePrompts` are written to flow naturally after that prefix.
- **Tap the existing greeting/chevron area** — unchanged (`onTalkToEve`).
- **Already-logged-today state** — if `todayEntry.mood !== undefined`, the matching pill renders in its Selected style, and the label *"How's today?"* changes to *"Logged today · tap to update"*. Tapping any pill (same mood or different) still works — same actions as above.

### Component contract change

`AdaptiveGreeting` adds one new optional prop:
```ts
onMoodReflect?: (mood: Mood) => void;
```
`NewTodayScreen` passes a handler that calls `logMood` from context and primes + opens the chat.

---

## Piece 2 — "Save as Reflection" in EveChat

**Location:** `src/components/EveChat.tsx`. New slim action bar between the message list and the input bar.

### Visibility rules

- Hidden when `messages.length <= 1` (only Eve's opener, no user turn yet).
- Visible after the first user message has been sent.
- Hidden again for 2 seconds after a successful save (the button morphs to a confirmation state, then the bar collapses out).
- Once saved in the current chat session, the bar does not return — one save per chat open.

### Layout

```
[message list scrolls above ─────────────────────]
[─────────────────────────────────────────────────]
[                              [💾 Save as Reflection] ]   ← height ~44, bg colors.surface
[ TextInput "Ask Eve anything..."   🎤  ➤            ]
```

- Padding 12 horizontal, 8 vertical.
- Right-aligned single button (pill, primary purple `#6C5CE7` fill, white icon + label, 14pt label).
- Top border `1px rgba(255,255,255,0.06)` for separation from the message list.

### After-tap states

1. Tap → button locks (disabled) and label changes to *"Saving…"* for ~300 ms.
2. Then morphs to *"✓ Saved to today"* on a success-green fill (`colors.success`) for ~2 s.
3. Bar slides out (height animates to 0) and stays out for the rest of the session.

### What gets saved

`saveEveConversation({ title, snippet })` where:

- **title** — derived from the FIRST user message in the chat:
  - Strip leading "I'm interested in: " prefix if present (this is what the Today chips inject).
  - Truncate to 40 characters at the nearest word boundary; append `…` if truncated.
  - If the first user message is empty (shouldn't happen with the visibility rule), fall back to `"Conversation with Eve"`.
- **snippet** — Eve's most recent reply (last message where `sender === 'eve'`), truncated to 100 characters at word boundary with `…`.
- Timestamp and id are set inside the context action.

### Edge cases

- Voice-mode messages — `MOCK_VOICE_TRANSCRIPT` ("I want to feel calmer today") becomes a user message, so it satisfies the visibility rule and is eligible as the title source.
- Mood-primed chat — when chat opens with `initialMessage` from a mood tap, the first Eve message is the mood-contextual prompt. The user still has to send at least one message before the save bar appears.

---

## Piece 3 — Reflections card on Profile screen

**Location:** new section in `src/screens/ProfileScreen.tsx`, inserted between the Progress section (`ProfileScreen.tsx:67-97`) and the Achievements section (`ProfileScreen.tsx:99-122`).

### Layout

```
┌──────────────────────────────────────────────┐
│ Reflections                       See all  > │   ← section header (matches existing style)
├──────────────────────────────────────────────┤
│ 🔥  5-day streak  ·  12 reflections          │   ← streak row
│                                              │
│ Last 7 days                                  │   ← caption
│  🤩    😊    😊    😐    😊    🤩    ·       │
│  Mon   Tue   Wed   Thu   Fri   Sat   Today   │
│                                              │
│ ──────────────────────────────────────────── │   ← subtle divider
│ Yesterday — "Had a breakthrough during the   │
│  Silva visualization exercise…"              │
└──────────────────────────────────────────────┘
```

### Data

- **Streak + count** — from `stats.currentStreak` and `stats.daysWithInput` (context-provided).
- **7-day strip** — iterate `reflectionHistory.slice(0, 7).reverse()` so Today is rightmost. For each day:
  - If `mood` is set, render the corresponding emoji from `moodOptions`.
  - If `mood` is unset, render `·` (color `colors.textMuted`).
  - Label below = short weekday (`Mon`, `Tue`, …) except for index 6 which is *Today*.
- **Snippet** — find the most recent entry in `reflectionHistory` that has either `journalText` OR `eveConversations.length > 0`, and pick:
  - `journalText` truncated to 80 chars at word boundary, OR
  - First eve-conversation `snippet` truncated to 80 chars, whichever exists. If both exist, prefer `journalText` (it's the user's own words).
  - Prefix with the day's `displayDate` (e.g. *"Yesterday — …"*).
  - Hide the snippet row entirely if no entry has any content.

### Style

Match the card style of the existing `streakCard` (`ProfileScreen.tsx:205-215` styles): rounded `colors.surface` background, padding 16, gap 12. Header row uses existing `sectionHeader` / `sectionTitle` / `seeAllText` styles.

### Interactions

- **Section header `See all >`** — navigates to `Reflections` (route already exists via `navigation.navigate('Reflections')`).
- **Card body tap** — same navigation. Whole card is tappable.

---

## Demo flow (end-to-end)

1. Open app on returning-active scenario. Today screen: Eve toast shows greeting + mood row.
2. Tap 🤩 *Amazing*. Chat opens; Eve's first bubble is the *amazing*-context prompt. The mood pill on Today is now in Selected state (label *"Logged today · tap to update"*).
3. Type a user message ("Manifesting visualization clicked today"). Eve replies. The "Save as Reflection" bar appears above the input.
4. Tap *Save as Reflection*. Bar morphs to *✓ Saved to today*. Bar slides out.
5. Close chat. Navigate to Profile. Reflections card shows: streak +1, today's 🤩 in the rightmost slot of the strip, snippet *"Today — …"* with the conversation snippet.
6. Tap the card → Reflections screen → today's entry now shows the mood, the Eve conversation entry, and the existing activity log.

---

## File changes summary

| File | Change |
|---|---|
| `src/context/ReflectionsContext.tsx` | **new** — provider + hook |
| `App.tsx` | wrap with `<ReflectionsProvider>` |
| `src/data/reflectionsData.ts` | remove `getReflectionStats` (moved to context); keep types, `moodOptions`, `evePrompts`, seed array |
| `src/components/AdaptiveGreeting.tsx` | add mood-pill row inside `eveToast`, accept `onMoodReflect` prop |
| `src/screens/NewTodayScreen.tsx` | wire `onMoodReflect` → `logMood` + open chat with mood prompt |
| `src/components/EveChat.tsx` | add Save-as-Reflection action bar with state machine (hidden → idle → saving → saved → hidden) |
| `src/screens/ProfileScreen.tsx` | add Reflections section between Progress and Achievements |
| `src/components/ReflectionsCard.tsx` | switch to `useReflections()` for reads + writes |
| `src/screens/ReflectionsScreen.tsx` | switch to `useReflections()` for reads |

No native module changes, no new dependencies.
