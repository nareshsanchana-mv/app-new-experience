---
title: "Mindvalley App: New Experience"
slug: "mindvalley-app-new-experience"
scope: product
status: discovery
parent: null
children: []
created: 2026-05-22
updated: 2026-05-22
resolution: 4/8
imported-from: "codebase + design.md (reverse-engineered)"
---

# Mindvalley App: New Experience

> **What this document is.** A reverse-engineered product PRD for the prototype at `app-new-experience` (React Native / Expo, `main`). It supports an **internal strategic-alignment pitch to Mindvalley leadership** — the ask is *"is this the direction the app should go?"*, not *"fund this build."* See **Success Criteria** for what the pitch needs to land, and **Open Questions** for the pre-mortem on objections.
>
> **Why 4/8.** Four sections are fully resolved; four are deliberately deferred because they don't block the vision pitch and would be premature to lock without leadership input. Each deferred section is annotated with what it's waiting on. If this moves from vision pitch to build pitch, those gaps come back.

## Problem

The existing Mindvalley app treats every user identically at the entry point and surfaces a generic content library. New users with strong attribution (e.g. someone who signed up after a Silva Ultramind ad) land on the same screen as a returning member five lessons into their program, and a free browser sees the same scaffolding as a paid member with an owned collection. The result: high cognitive load on landing, weak personalization, and no clear "what should I do next" signal — which depresses Day-1 engagement and program-start rates.

A second problem this prototype attempts to address: **reflection and journaling habits aren't part of the current product**. Members consume content but don't capture what's shifting in them. Without that loop, the app has no signal for emotional progress and no surface for Eve (the AI guide) to reference week-over-week.

[UNRESOLVED — deferred] Specific metrics quantifying the current-state pain (Day-1 drop-off %, first-program-start latency, return rates by user type) would sharpen the pitch opener but aren't required for direction alignment. Plug in if internal numbers exist before the pitch; otherwise the qualitative framing above carries the section.

## Vision

A Mindvalley app where **the Today screen is the canonical landing surface**, and what you see there is **scenario-aware**: a new user who came from an ad sees the program they signed up for as the hero; a returning-active member sees their next lesson; a returning-inactive member gets a gentle re-entry with optional recap; a free user sees a curated browse with upsell-aware CTAs.

**Eve, the AI guide, is the through-line.** Every screen has a path to chat with Eve, every user state has a contextual Eve greeting, and reflection — mood-logging and journaling — happens *with Eve*, not in a separate journal silo. The data captured (moods, saved chats, completed lessons, meditation plays) becomes the substrate for Eve to personalize forward.

The visual identity is **dark, focused, premium** — closer to a meditation/wellness surface than a marketing site — to set the "this is for you, right now" tone the moment the app opens. See `design.md` at the repo root for the full token spec.

## Users

Five primary scenarios are modeled in the prototype today (`src/context/DemoContext.tsx`). Each is a distinct user state, not a different persona — the same person passes through multiple states over time.

| Scenario | State | Context on landing | What they need |
|---|---|---|---|
| **New user — Silva ad attribution** | First visit, has paid attribution to a specific program (Silva Ultramind) | Just clicked through an ad and signed up; expects to see what they paid for | Confirm they're in the right place; obvious "start the program" CTA; minimal browse distraction |
| **New user — no attribution** | First visit, no signal about what brought them | Curious browser, found Mindvalley organically; doesn't know what to start with | An Eve-led "what brought you here?" prompt; quick-reply chips that route to programs; soft sell |
| **Returning — active** | Has a program in flight, returning within 24h | Yesterday they did Lesson 1; came back to do Lesson 2 | Pick-up-where-you-left-off card; secondary practice/meditation card; gentle Eve check-in; mood-pill habit affordance |
| **Returning — inactive (≥5d gap)** | Has a program but hasn't returned in days | Feels guilty/forgetful; on the verge of churn | Non-judgmental Eve message; offer recap of last lesson; option to switch focus if the program isn't sticking |
| **Free user — browse all** | Free plan, no owned collection | Window-shopping the catalog; price-sensitive | Browseable curriculum across all 5 collections; price-tagged collection cards; clear "$299/yr or $899 for all 5" framing |

**Anti-users / out of scope:** Mindvalley facilitators, course authors, internal admins. This prototype is for the consumer member experience only.

[UNRESOLVED — deferred] Demographic/psychographic context for each scenario (age band, region, app proficiency, primary device). The code models *behavioral* state, not *who* the person is. Layered on with user-research input post-greenlight; not load-bearing for the vision pitch.

## Core Capabilities

Five capability areas, each backed by existing prototype surfaces.

1. **Today — adaptive landing.** Single scrollable screen whose content composition changes per scenario. `AdaptiveGreeting` renders the right Eve treatment (hero card for new-attribution, magic prompt for new-no-attribution, Eve toast for returning-active, etc.). Below the greeting: Learn section (Manifesting curriculum or browse), Practice section (top meditations), Explore Other Collections (upsell).

2. **Eve AI — conversational guide.** Modal chat (`EveChat`) accessible from every tab and inline triggers across the app. Eve has contextual openers per scenario (`scenarioState.eveGreeting`), accepts text + voice (mocked), and responds with scenario-aware suggestions including program recommendation badges. **Eve is also the gateway to reflection** — the planned mood-pill + save-as-reflection flow (spec at `docs/superpowers/specs/2026-05-22-reflections-habit-loop-design.md`) routes through Eve.

3. **Programs — owned & browse.** Two views: members see their owned collection (Manifesting, 33 programs, phased into Awaken / Practice / Embody) with progress; everyone can browse all 5 collections (Manifesting, Exponential Entrepreneur, Longevity, Love & Family, Speaking & Authorship — 95+ programs total). QuestDetail screen for individual program deep-dives.

4. **Practice — meditations & sounds.** `MeditationsScreen` with a 3x2 practice grid (Meditation / Sound Healing / Soundscape / Breathwork / Hypnotherapy / Visualization), horizontal-scroll categories, and dedicated players (`MeditationPlayer`, `SoundPlayer`) for content delivery. Top-10 surface lives on Today as well.

5. **Reflections — daily habit loop.** Mood pills (5 options: amazing / good / okay / low / rough) + journal text + saved Eve conversations + activity log per day. Reflections screen shows history with filter pills (All / Mine / From Eve) and full-text search. Planned tie-ins to Today (mood pill in Eve toast) and Profile (7-day mood strip card).

Supporting surfaces: Community (live events, mastery networks), Search, Notifications, Profile/Settings, Progress (achievements + stats).

## Boundaries

What this prototype **does not do**, and intentional non-goals:

- **No content authoring.** Programs, meditations, and Eve responses are mock data. The app reads from static seed files (`src/data/*.ts`) and an in-memory context. No CMS, no real backend.
- **No auth.** Single hard-coded user (Naresh). Scenarios are switched via a hidden triple-tap demo panel, not by signing in.
- **No real AI.** Eve's responses come from `getMockReply()` — pattern-matched replies, not an LLM. The prototype validates the *interaction surface*, not the AI quality.
- **No payment flow.** Upsell modals show prices but don't transact. Tap-through is for demo purposes.
- **No light theme.** This is dark-by-default. Light mode is not a v1 deliverable. See `design.md` §0.
- **Not the live Mindvalley brand 1:1.** Different purple (`#7B68EE` vs `#7A12D4`), platform default font (Google Sans deferred). See `design.md` §14 — these are known migrations for when the prototype graduates to production.
- **No web parity.** This is a native mobile prototype. Web support exists only as a phone-frame simulator for review (see `App.tsx`'s `webStyles`), not a real responsive web app.

[UNRESOLVED — deferred] Boundary around **personalization mechanics** — implicit inference (from lesson completions, moods, time-of-day) vs. explicit asks (Eve onboarding chips, profile preferences). The prototype hints at both without drawing a clear line. This is an architecture-level decision that surfaces during build, not direction.

## Success Criteria

This prototype is being pitched to Mindvalley leadership for **strategic alignment** — the ask is *"is this the direction the app should go?"*, not *"fund this build."* That reframes success entirely: success is leadership saying "yes, that's the direction" with conviction, and that conviction is earned by **specific moments in the demo landing emotionally**, not by metrics.

### Primary — demo moments that must land

Three moments. If all three land, the direction-alignment is won. If two land and one falls flat, expect pushback on the falling-flat area.

1. **High-intent capture — New User (Silva Ad scenario).** The user lands on Today right after the sales flow. The entire landing screen is built around the program they paid for — no browse distraction, no competing upsell, one obvious "Start Lesson 1" CTA on a full-bleed program hero. Lands when: leadership intuits the contrast with today's app (which would dump them in a generic library) without us having to say it. The takeaway leadership should reach for: *"of course this is what someone should see after they pay."*

2. **Ownership clarity — New User (entitlement framing).** Once into the app, the paid user can see in seconds what their subscription includes — 33 programs in the Manifesting Collection, 1,000+ meditations & sounds — framed as **abundance, not as upsell bait**. The "Included" badge on the owned collection hero and the explicit program/meditation counts do the work. Lands when: leadership reads "Included" as a confidence signal, not a marketing tactic. The takeaway: *"a paid user should feel like they got a lot, immediately."*

3. **Habit loop — Returning Active scenario.** The end-to-end reflection flow runs without narration: returning user sees Eve toast → taps a mood pill → chat opens with Eve primed → user types and Eve replies → user taps *Save as Reflection* → close chat → Profile shows a 7-day mood strip with today's emoji on it + the saved conversation snippet. This is the moment that justifies the entire rebuild — it shows the app *remembering* the user, with Eve as the through-line, in a flow that's defensibly different from "another chatbot." Lands when: leadership stops asking about Eve as a chatbot and starts asking about *cadence* (daily? weekly? push notifications?).

### Secondary — pitch-level signals

These don't appear on screen; they're how you know the pitch worked.

- **Leadership can articulate the thesis back unprompted.** If after the pitch a decision-maker says some version of *"the app should be scenario-aware with Eve as the through-line, and reflections are how the app remembers you,"* you've succeeded.
- **They engage with specifics, not platitudes.** *"How would this work for facilitator-led tribes?"* or *"What's the cadence on the reflection nudges?"* are wins. *"Interesting, let's circle back"* is a fail.
- **The obvious objections are preempted, not deflected.** Three to expect: *"we already personalize today"* (counter: show side-by-side scenario landings), *"Eve feels gimmicky"* (counter: lead with moment 3, not chat), *"what about authors/admins?"* (counter: explicitly scoped out, see Boundaries).

### Anti-criteria — what success is NOT

- It is **not** usage metrics, retention curves, or A/B test results. Those don't exist; this is a prototype.
- It is **not** "leadership loves the visual design." Praise for the dark theme is nice but doesn't constitute alignment on direction — the prototype could be visually appealing and still be the wrong direction.
- It is **not** "all 8 sections of this PRD are filled out." This document supports the pitch; it's not the pitch itself.

## Open Questions

Framed as a **pre-mortem for the pitch room**: every question is either preempted (named in the pitch with the answer), deferred (acknowledged honestly, with how we'd find out), or left for leadership to ask (pulls them into the design).

### Preempt — name these in the pitch with the answer ready

**Q1. "This doesn't look bold enough — it looks like a UI refresh."**
*The biggest risk.* The boldness isn't visual. It's structural: this prototype redesigns the app around **user states** (5 named scenarios with distinct landing compositions) instead of treating all users the same, and positions **Eve as a habit substrate** (mood-pill entry → chat → save-as-reflection → Profile strip) rather than as a chatbot. That's the harder design problem and the one no competitor in the wellness category has solved. Lead with this thesis in the first 90 seconds of the pitch — don't open with screens.

**Q2. "Will any of this actually move the metrics?"**
Honest answer: *we can't prove material impact without testing.* But each demo moment maps to a specific metric and a directional hypothesis. The pitch should name them explicitly:

| Demo moment | Target metric | Hypothesis | How we'd test |
|---|---|---|---|
| New User — Silva Ad capture | Day-1 first-lesson-started rate | Significant lift — the new design has no path that doesn't lead to "Start Lesson 1" | A/B against current onboarding for ad-attributed signups, 4–6 weeks |
| Ownership clarity | New-paid 7-day retention; reduction in *"what do I get?"* support tickets | Lift in retention via reduced churn-from-confusion | Cohort comparison post-redesign |
| Habit loop (mood + reflections) | Weekly active rate; reflections-per-active-user; Eve engagement rate | Slow-burn — won't move week 1, compounds over 3–6 months as the streak/strip becomes load-bearing | Long-tail cohort, 12-week minimum |

The prototype is built so each scenario can be tested in isolation against current production, which makes the bet *cheap* even if leadership wants proof before committing.

**Q3. "Is this a fork that ships separately, or the new main app?"**
Currently it's a prototype with deliberate brand deviations (`design.md` §14: different purple, no Google Sans, dark-by-default). The pitch position: **this is meant to become the main app.** The deviations are prototype-phase artifacts that align back during a build phase, not philosophical splits. Acknowledge upfront — otherwise the brand team will block on alignment.

**Q4. "Free → paid conversion — how does it actually happen inside this?"**
Free user sees the catalog with explicit price tags (`$299/yr per collection`, `$899 for all 5`) and price-aware upsell modals on owned-content taps. Convert moments live inside the Today experience itself — there's no separate "billing" surface. The pitch should walk through this once, briefly, to head off *"feels too soft on monetization"* without dwelling.

### Defer — acknowledge honestly, here's how we'd find out

**Q5. Personalization data model.** Reflections, lesson completions, meditation plays, and saved Eve chats all generate signal — but there's no unified "what does Mindvalley know about you" schema yet. *Defer answer:* this is a build-phase question. We can sketch it in a follow-up doc once direction is greenlit.

**Q6. Eve's memory horizon.** Should Eve reference what you said *yesterday*, *last week*, or treat each chat as fresh? Real Eve probably can't be infinite-context. *Defer answer:* this is the right question to leave open — it depends on the LLM / cost model we land on. The product surface (saved reflections, mood strip) gives Eve durable state without needing infinite chat memory.

**Q7. Reflections as habit vs. journaling tool.** Are we optimizing for daily mood-logging (high frequency, low depth) or deep journaling (low frequency, high depth)? The current design hints at both. *Defer answer:* user research after greenlight. We have a directional bet (habit-first, journaling-deep is a secondary mode) but it's testable.

### Let them ask — these pull leadership into the design

These are good questions to *not* preempt. If leadership raises them, the conversation moves from *"is this the direction?"* to *"how would this actually work?"* — and that's a winning shift in a strategic-alignment pitch.

- **What happens to facilitator-led tribes and the community surface as Eve becomes more central?** (Hint: Community stays as-is in scope; Eve doesn't compete with human guidance.)
- **What's the migration story for current paid members — how do they land in this on day 1?** (Hint: scenarios already model this — *Returning Active* and *Returning Inactive* are exactly that population.)
- **What about content authors and admin tooling?** (Hint: explicitly out of scope — see Boundaries.)
- **What does this imply about app discoverability and ASO?** (Hint: not addressed; this is for the in-app experience.)

### Known unknowns

- **Tab-bar ergonomics at scale** — current floating glass pill fits 4+1. If a 6th tab is needed, the design has to change. Craft-level, won't surface in a vision pitch but worth noting.
- **Cadence / notification strategy** for the habit loop — when does the app *nudge* you to log a mood? Daily push? Weekly digest? Never (pure pull)? Significant product surface unspecified.
- **What's the "v0.5" — what's the smallest version of this that's still worth shipping?** Relevant if the vision pitch leads to a build pitch.

## Epics

Major bodies of work that compose the product. Each maps to an existing screen cluster.

1. **Today — Adaptive Landing** *(largely built)* — Scenario-aware single-screen landing. AdaptiveGreeting, LearnSection, PracticeSection, NewUserOwnedSection, NewUserExploreSection.
2. **Eve AI — Conversational Guide** *(built; needs depth)* — Modal chat, mock replies, voice mode placeholder, scenario openers. Planned: save-as-reflection action.
3. **Programs — Curriculum & Browse** *(largely built)* — Owned Manifesting collection with phases, browse all 5 collections, QuestDetail per program, ContinueProgramCard surfaces.
4. **Practice — Meditation & Sound Library** *(largely built)* — 6-category practice grid, players, library navigation, top-10 surfacing on Today.
5. **Reflections — Daily Habit Loop** *(in progress)* — Mood + journal + Eve-saved-chats. Reflections screen with filters built; Today mood pills + Profile card + EveChat save action specced (see `docs/superpowers/specs/2026-05-22-reflections-habit-loop-design.md`).
6. **Community** *(built, lightly)* — Events, mastery networks, member-of-the-week.
7. **Profile & Progress** *(built)* — Streak, lesson count, achievements; gateway to Settings, Notifications, Reflections.
8. **Demo Scaffolding** *(built; prototype-only)* — DemoContext, scenario switcher panel (triple-tap), mock data layer. Will be ripped out / replaced when this merges with the real backend.

[UNRESOLVED — deferred] v1 ship ordering and priority. Because the current ask is strategic alignment, not "fund this build," ordering is premature — it depends on which scope leadership greenlights and what resourcing is available. If the vision pitch lands, the immediate follow-up deliverable is a phased build plan starting from the demo moments (Today + Eve + Reflections loop) as the v1 backbone.
