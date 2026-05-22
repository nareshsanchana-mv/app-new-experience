# app-new-experience — design.md

> Drop this file at the root of the repo. Any LLM coding assistant (or human) should read it before producing UI. The goal: every screen looks like this app without anyone having to ask.
>
> **What this is.** A React Native (Expo) prototype exploring a re-imagined Mindvalley app experience. **Dark theme by default** — this is a focused product surface, not a marketing site. Token values below reflect what's actually in the code (`src/theme/*`), not aspirational.

---

## 0. The non-negotiables

These six rules outrank everything below. If a rule below conflicts, these win.

1. **Dark surface by default.** Background is `#0A0E17` ("ink"). All screens render light text on dark. There is no light theme; do not introduce one without a design lead's sign-off.
2. **Purple is the brand.** `#7B68EE` (`colors.primary`) owns primary CTAs, Eve moments, links, and active states. Do not invent new purples — use the three stops in §2.
3. **Accent palette is semantic, not decorative.** Teal = practice/meditation. Magenta = progress fill. Gold = streaks/achievements. Coral = warnings/love. Don't pick teal just because it looks nice.
4. **Pill buttons, rounded cards, square media.** Buttons / pills = `borderRadius: 9999` (`borderRadius.full`). Cards = 12–16. Inputs = 8. Hero/cover images = 0 or 16, never in between.
5. **Two gradients carry the brand.** `gradients.primary` (purple) for Eve and CTAs. `gradients.eveButton` (deeper purple) for Eve action buttons. No three-stop gradients except for the explicit `todayIcon` and `communityOverlay` cases already in `colors.ts`.
6. **No emoji in product chrome.** Emoji are reserved for **user-generated and emotional content**: mood pills in Reflections (🤩/😊/😐/😔/😣), community posts, celebration moments. Never in nav, headers, button labels, or section titles.

---

## 1. Voice & tone

Warm, confident, transformational. Write like a thoughtful coach, not an institution.

- **Do** lead with the human outcome ("Ready for Lesson 2?", "Pick up where you left off").
- **Do** be specific ("5-day streak", "Vishen Lakhiani", "Lesson 3 of 28").
- **Do** address the user by name when scenario state provides it (`scenarioState.userName`).
- **Don't** use hype words: *revolutionary*, *world-class*, *game-changing*, *unlock your potential*.
- **Don't** use AI clichés: *delve*, *journey*, *empower*, *seamless*, *elevate*.
- **Headlines** are sentence case unless they're a wordmark. No Title Case Everywhere.
- **Microcopy** is short and active. "Start" not "Get started now". "Continue Learning" not "Resume your learning journey".
- **Eve's voice** is the warmest in the app — first person, conversational, never robotic. See `evePrompts` in `src/data/reflectionsData.ts` for the canonical examples.

---

## 2. Color

All tokens live in `src/theme/colors.ts` as the `colors` and `gradients` exports.

### Brand (purple)

| Token | Hex | Use |
|---|---|---|
| `colors.primary` | `#7B68EE` | Primary CTAs, link text, Eve avatar tint, active tab |
| `colors.primaryDark` | `#6C5CE7` | Hover/pressed state, gradient start |
| `colors.primaryLight` | `#9B8FFF` | Gradient end, active tab icon, accent highlights |

### Accent (semantic)

| Token | Hex | Use |
|---|---|---|
| `colors.teal` | `#00D4AA` | Meditation, practice, "Practice Your Meditation" CTAs |
| `colors.magenta` | `#E040FB` | Progress bar fill, vibrant accent |
| `colors.gold` | `#F5C842` | Streaks, journal/reflection icons, achievements |
| `colors.coral` | `#FF6B6B` | Love, hearts, gentle warnings |
| `colors.orange` | `#F5A623` | Sales/urgency, flame/streak icon stroke |

### Surface (cool, slightly blue)

| Token | Hex | Use |
|---|---|---|
| `colors.background` | `#0A0E17` | App background ("ink") |
| `colors.backgroundCard` | `#131924` | Cards on background |
| `colors.backgroundElevated` | `#1A2130` | Elevated panels, modals |
| `colors.backgroundCommunity` | `#1E1A2E` | Community screen tint (subtle warm shift) |
| `colors.surface` | `#1E2A3A` | Pill/chip backgrounds, secondary surfaces |
| `colors.tabBar` | `#0D1119` | Tab bar background (under blur) |

### Text

| Token | Hex | Use |
|---|---|---|
| `colors.textPrimary` | `#FFFFFF` | Headlines, body, default text |
| `colors.textSecondary` | `#A0AEC0` | Subheads, captions, supporting text |
| `colors.textMuted` | `#5A6577` | Disabled, placeholders, low-priority meta |
| `colors.textAction` | `#8B9DC3` | Inline link text, "See all" |

### Borders

| Token | Hex | Use |
|---|---|---|
| `colors.border` | `#1E2A3A` | Default 1px borders, dividers |
| `colors.borderLight` | `#2A3040` | Slightly stronger separators |

### Status

| Token | Hex | Use |
|---|---|---|
| `colors.success` | `#10B981` | Save confirmations, completed |
| `colors.warning` | `#F59E0B` | Caution states |
| `colors.error` | `#EF4444` | Destructive actions, validation errors |
| `colors.info` | `#3B82F6` | Neutral info chips |

### Canonical gradients

Defined in `colors.ts` as the `gradients` export. Used via `<LinearGradient colors={gradients.primary} … />` from `expo-linear-gradient`.

| Token | Stops | Use |
|---|---|---|
| `gradients.primary` | `#7B68EE → #9B8FFF` | Primary buttons, brand moments |
| `gradients.eveButton` | `#6C5CE7 → #9B8FFF` | Eve "Go deeper" / chat CTAs |
| `gradients.teal` | `#00D4AA → #4A90D9` | Meditation/practice CTAs |
| `gradients.todayIcon` | `#F5A623 → #E040FB → #6C5CE7` | The Today tab icon only (3-stop exception, do not reuse) |
| `gradients.communityOverlay` | clear → `rgba(30,26,46,0.85) → rgba(30,26,46,0.98)` | Image bottom-fade in Community cards |
| `gradients.imageOverlay` | clear → `rgba(10,14,23,0.7)` | Standard image bottom-fade |

**Do not invent new gradients.** If a use case feels like it needs one, compose with the existing two-stops or use a flat `colors.primary` background instead.

---

## 3. Typography

Defined in `src/theme/typography.ts` as a `StyleSheet`.

**Font family.** None set — components inherit the platform default (San Francisco on iOS, Roboto on Android). This is intentional for the prototype phase. If/when a custom font is introduced, set it as the default in `App.tsx` via a `<Text>` defaultProps override or `react-native-paper` theme, never inline per component.

### Weights

- **400 Regular** — body, captions
- **500 Medium** — UI labels, buttons, tab labels
- **700 Bold** — headlines, section titles
- **900 Heavy** — overline-style caps (`cardTitleCaps`, `overlayTitle`)

### Scale

| Token | Size | Weight | Use |
|---|---|---|---|
| `typography.h1` | 28 | 700 | Page hero ("Welcome to Mindvalley, Naresh!") |
| `typography.h2` | 22 | 700 | Section hero, modal titles |
| `typography.h3` | 20 | 700 | Subhero, secondary card titles |
| `typography.h4` | 18 | 700 | Tertiary headings |
| `typography.sectionTitle` | 20 | 700 | Section titles on Today / Programs |
| `typography.overlayTitle` | 26 | 900 caps | Hero overlays on cover images |
| `typography.cardTitleCaps` | 14 | 900 caps | Eyebrow labels (e.g. "PICK UP WHERE YOU LEFT OFF") |
| `typography.body` | 14 | 400 | Default body |
| `typography.bodySmall` | 12 | 400 | Meta rows |
| `typography.label` | 14 | 500 | Buttons, UI labels |
| `typography.labelCaps` | 12 | 500 caps | Small uppercase labels |
| `typography.caption` | 11 | 400 | Helper text, smallest meta |
| `typography.tabLabel` | 10 | 500 | Bottom tab labels |

### Rules

- **Sentence case** for headlines and buttons. Title Case Everywhere is not used anywhere in this app.
- **Uppercase only on the caps tokens** (`cardTitleCaps`, `overlayTitle`, `labelCaps`). Don't apply `textTransform: 'uppercase'` ad-hoc.
- **Tracking is mostly default.** Caps tokens use `letterSpacing: 0.5` (cardTitleCaps, overlayTitle) or `1` (labelCaps). Don't add tracking to body or headings.
- **Line height defaults** (RN auto). If you need tighter line height (e.g. wrapped titles in a tight card), set it inline.

---

## 4. Spacing

Defined in `src/theme/spacing.ts`. 4px base grid.

| Token | Value | Token | Value |
|---|---|---|---|
| `spacing.xs` | 4 | `spacing['2xl']` | 24 |
| `spacing.sm` | 8 | `spacing['3xl']` | 32 |
| `spacing.md` | 12 | `spacing['4xl']` | 40 |
| `spacing.lg` | 16 | `spacing['5xl']` | 48 |
| `spacing.xl` | 20 | `spacing['6xl']` | 64 |

### Page conventions

- **Screen horizontal padding**: 20 (matches `AdaptiveGreeting`, `LearnSection`). Don't use 16 or 24 without reason.
- **Card internal padding**: 16 default, 10 for compact cards (program info), 24 for hero cards.
- **Vertical rhythm between sections**: a `View style={styles.divider}` with `height: 1, backgroundColor: colors.border` plus 20–24px vertical margin. See the Today screen pattern.
- **Bottom safe-area padding**: always include space for the floating tab bar (≥ 96 in scrollable bottom padding).

### Density

This is **product UI** — dense by design. Don't apply marketing-spec gutters (80px+ between sections) to feature surfaces. Keep cards tight; let photography breathe.

---

## 5. Radius

Defined in `src/theme/spacing.ts` as the `borderRadius` export.

| Use | Radius | Token |
|---|---|---|
| Buttons, pills, chips, avatars | **9999** (full pill) | `borderRadius.full` |
| Large cards, hero cards | **16–24** | `borderRadius.xl` / `borderRadius['3xl']` |
| Standard cards, tiles | **12** | `borderRadius.lg` |
| Inputs, secondary surfaces | **8** | `borderRadius.md` |
| Tiny tokens, badges | **4** | `borderRadius.sm` |
| Full-bleed media, hero images | **0** | `borderRadius.none` |

**Don't round buttons at 8.** Pills are the brand's strongest shape signal — use them. **Don't round cards at 4.** That's badge territory.

---

## 6. Shadow

**This is an active gap.** The app has no shared shadow tokens — components declare shadows inline (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, `elevation`). Tab bar pills, in particular, layer their own shadow.

**Convention to follow until tokens land:**

| Elevation | Spec | Use |
|---|---|---|
| `light` | `shadowColor: '#000', shadowOffset: {0, 4}, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6` | Resting cards, list items |
| `medium` | `shadowColor: '#000', shadowOffset: {0, 8}, shadowOpacity: 0.35, shadowRadius: 16, elevation: 10` | Hover / pressed cards, sticky bars |
| `strong` | `shadowColor: '#000', shadowOffset: {0, 12}, shadowOpacity: 0.45, shadowRadius: 24, elevation: 14` | Floating tab bar, modals, bottom sheets |
| `brand` | `shadowColor: colors.primary, shadowOffset: {0, 6}, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8` | Primary CTAs, Eve buttons (purple cast) |

**Always include `elevation`** for Android parity. **Shadows are always black** on this dark surface — except `brand`, which carries a purple cast for Eve / primary moments.

---

## 7. Motion

This app uses RN's `Animated` API via `useNativeDriver: true` wherever possible.

### Durations

```
fast   120ms   button press feedback
base   240ms   screen transitions, fade-on-focus (see withFadeOnFocus HOC)
slow   300ms   modal slide-in, card lift
```

### Patterns

- **Screen fade on focus** — every tab screen is wrapped by `withFadeOnFocus` (`src/navigation/withFadeOnFocus.tsx`), fading opacity 0 → 1 over 240ms on each focus. Do not unwrap.
- **Modal entry** — React Navigation's `slide_from_right` for stack screens; `animationType="slide"` + `presentationStyle="pageSheet"` for the Eve chat modal.
- **Press feedback** — `activeOpacity={0.7}` on `TouchableOpacity` for buttons, `0.85` for cards. Don't use `0.5` (looks pressed-out on dark).

---

## 8. Components

Patterns codified in `src/components/`. Naming is PascalCase, props are typed inline, styles live in the same file.

### Button (primary CTA)

Wrapped in `<TouchableOpacity activeOpacity={0.85}>` with a `<LinearGradient colors={gradients.primary}>` background. Pill radius. Icon-then-label.

```tsx
<TouchableOpacity activeOpacity={0.85}>
  <LinearGradient colors={gradients.primary} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.ctaPill}>
    <Ionicons name="play" size={16} color="#fff" />
    <Text style={styles.ctaText}>Continue Learning</Text>
  </LinearGradient>
</TouchableOpacity>
```

- Pill: `borderRadius.full`, padding `12 horizontal / 8 vertical` (sm), `24 / 12` (md), `28 / 14` (lg).
- Primary = `gradients.primary`. Secondary = solid `colors.surface` with `colors.textPrimary` text. Ghost = transparent with `colors.primary` text.

### Card

```tsx
<View style={{ backgroundColor: colors.backgroundCard, borderRadius: 16, padding: 16, ... shadows[`light`] }}>
  {/* content */}
</View>
```

- Default: `colors.backgroundCard`, `borderRadius.xl` (16), padding 16, `shadow.light`.
- Interactive: wrap in `TouchableOpacity activeOpacity={0.85}`.
- Hero card: `borderRadius.xl` (16), height ~200, image fills, `gradients.imageOverlay` bottom-fade, text overlay at bottom.
- **Never nest a bordered card inside a bordered card.**

### Eve toast / pill (the canonical brand surface)

Dark purple gradient card with sparkle avatar + greeting + chevron — the Today-screen Eve toast at `AdaptiveGreeting.tsx:203`. This is the canonical "Eve speaks" surface.

```tsx
<LinearGradient
  colors={['#1A1235', '#241845', '#2E1F58']}
  start={{x:0,y:0}} end={{x:1,y:1}}
  style={{ borderRadius: 16, padding: 16, ... }}
>
  <LinearGradient colors={gradients.primary} style={{ ...avatar circle... }}>
    <Ionicons name="sparkles" size={14} color="#fff" />
  </LinearGradient>
  <Text>{greeting}</Text>
  <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.7)" />
</LinearGradient>
```

The 3-stop dark purple background (`#1A1235 → #241845 → #2E1F58`) is the **only place a 3-stop is allowed** outside the explicit `gradients.todayIcon` exception. It signals "Eve is speaking."

### Mood pill (Reflections)

5 mood options from `moodOptions` in `src/data/reflectionsData.ts`. Emoji + label. Default = `colors.surface` background. Selected = `gradients.eveButton` fill, white label. **This is the only place emoji appears in non-user-generated content.**

### Bottom tab bar (floating glass pill)

Single floating pill (`TabNavigator.tsx`), `borderRadius: 36`, 64 tall. Uses `BlurView` from `expo-blur` (tint `dark`, intensity 90 on iOS / 100 on Android) layered with a purple-tinted darken (`rgba(28,22,56,0.28)`) and a top-edge specular highlight. **Do not rebuild the tab bar as a flat rectangle.** The "liquid glass" treatment is part of the brand.

### Avatar

Circular, 40 default. Falls back to initials on `colors.surface`. `Image source={user.avatar}` for the user, `Ionicons name="sparkles" color={colors.primary}` inside a small circle for Eve.

### Progress bar

```tsx
<View style={{ height: 3, backgroundColor: colors.progressTrack, borderRadius: 2 }}>
  <View style={{ height: 3, width: `${pct}%`, backgroundColor: colors.progressFill, borderRadius: 2 }} />
</View>
```

3px tall (4px for the larger "Continue Learning" CTA card). Fill is **magenta** (`colors.progressFill`), not purple — progress is its own semantic.

---

## 9. Iconography

- **Ionicons** (from `@expo/vector-icons`) — outline by default, solid for active/selected states.
- Size scale: 12 / 14 / 16 / 18 / 20 / 24. Don't pick in-between sizes.
- Icons inherit `color` from the prop, not `currentColor` — RN doesn't cascade. Pass color explicitly: `<Ionicons name="..." color={colors.primary} />`.
- **Don't mix outline and solid icon styles in the same view** (e.g. don't show `book` and `leaf-outline` in the same row).
- Special icon treatments:
  - **Eve = `sparkles`**, always.
  - **Tab icons** swap between `*-outline` (inactive) and `*` (focused). See the `TAB_META` map.
  - **Streak = `flame`** with `colors.orange` stroke.

---

## 10. Imagery

- **Real photography** for program covers and meditation covers. No stock vector art, no isometric illustrations, no AI imagery, no 3D blobs.
- **Local `require()` for all cover images** under `assets/covers/` and `assets/meditation-covers/`. Mapped via `src/data/coverAssets.ts`. **Do not reintroduce remote URLs** — they fail on native and were already migrated away from.
- **Baseline JPEG only.** Progressive JPEGs can fail to render on iOS native. When adding a new cover, run it through `sips` (built into macOS) to normalize: `sips -s format jpeg --setProperty formatOptions baseline in.jpg --out out.jpg`.
- **Aspect ratios.** Program covers: 16:9. Meditation covers: 1:1 or 16:9 depending on context. Hero images: 16:9 cropped.
- **Overlays.** Full-bleed cover images get `gradients.imageOverlay` (clear → `rgba(10,14,23,0.7)`) at the bottom so overlaid text is legible.
- **Radius.** Cover tiles inside cards = `borderRadius.lg` (12) or `xl` (16). Full-bleed hero images = 0.

---

## 11. Demo / scenario context

This is a prototype with a `DemoContext` that swaps scenarios (new-user, returning-active, returning-inactive, free-user, etc.). Most screens read from `useDemo()` to render scenario-specific content.

- **Don't hard-code user names or program titles** in components. Read from `scenarioState`.
- **Don't add new screens or features without a scenario story.** Decide which scenarios it shows in (often 3–6: returning-active) and stub the data path.
- **Triple-tapping any greeting** toggles the demo panel (see `toggleDemoPanel`). Keep this gesture working.

---

## 12. State containers

Three contexts live in `src/context/`:

| Context | Purpose | Mounted in `App.tsx` |
|---|---|---|
| `UserContext` | User identity, avatar | outer |
| `DemoContext` | Active scenario + scenario panel | middle |
| `ReflectionsContext` (planned) | In-session reflection state — see `docs/superpowers/specs/2026-05-22-reflections-habit-loop-design.md` | inner |

When adding state that's shared across screens, prefer a new context over prop drilling. Keep contexts focused — one responsibility each.

---

## 13. Do / Don't (the cheat sheet)

| ✅ Do | ❌ Don't |
|---|---|
| Read tokens from `src/theme/*` | Hard-code hex values inline |
| Dark surface by default (`colors.background`) | Introduce a light mode without sign-off |
| `colors.primary` for primary actions | Invent new purples |
| Use `gradients.primary` / `gradients.eveButton` | Author one-off 3-stop gradients |
| Pill buttons (`borderRadius.full`) | 8px rounded buttons |
| 12–16px rounded cards | 4px rounded cards |
| Full-bleed media at `borderRadius: 0` | Rounded hero images at 8 |
| Always set `elevation` alongside `shadow*` | Forget Android shadow parity |
| Sentence case headlines | Title Case Everywhere |
| Real photography for covers | Stock vector illustration, AI imagery, 3D blobs |
| `gradients.imageOverlay` for cover text legibility | Manual `rgba(0,0,0,…)` overlays |
| Emoji only in mood pills & user-generated content | Emoji in tab labels, section titles, buttons |
| Read scenario state from `useDemo()` | Hard-code names, program titles, lesson counts |
| Local `require()` for covers via `coverAssets.ts` | Remote URLs (Unsplash, CDN) for app imagery |
| `useNativeDriver: true` on all animations | Animate layout props (height, top, …) — they aren't native-driven |

---

## 14. Differences from the Mindvalley web brand system

This app is a **product surface**, not the marketing site, and intentionally deviates from the public Mindvalley web design system in three places:

1. **Dark by default.** The web system is light-mode with dark surfaces reserved for "immersive contexts." This app is the inverse — dark is the default canvas, and content lives on dark cards.
2. **Different purple.** The brand purple here is `#7B68EE` (slate-leaning), not `#7A12D4` (the marketing brand). This is a prototype tone — when this design merges into the official app, the purple should re-align to the brand value.
3. **No Google Sans yet.** The web system mandates Google Sans; this prototype uses the platform default font. Add it via Expo's font loader (`expo-font` + `useFonts` hook) before launch.

These are known gaps, tracked for the prototype phase. Don't "fix" them piecemeal — they need a coordinated migration when the design graduates.

---

## 15. When in doubt

- Reach for the **simplest** component pattern first. Card + LinearGradient + Ionicons covers ~80% of cases.
- If a value isn't in this file, **use the closest token** — don't pick a "near enough" arbitrary number.
- If a token doesn't exist for what you need, add it to `src/theme/*` before using it. Don't inline.
- Dense product UI ≠ marketing. Don't apply 80px section gutters to the Today screen.
- Read `docs/superpowers/specs/` before building anything that touches shared state (reflections, scenarios, user).
