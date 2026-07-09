# RUDRAKASH | DESIGN SYSTEM v1.0.0
### Lead Design Directorate: Apple + Samsung + Google + Nothing + Microsoft Unified Studio
**Brand Owner: Shivansh Gupta**
**Core Philosophy:** *A spatial, fluid operating system for premium retail. Retail as an environment, commerce as a tactile service.*

---

## EXECUTIVE SUMMARY & PHILOSOPHY
Traditional e-commerce treat products as grid items inside a static catalog. **Rudrakash** treats commerce as a spatial operating system. The interface behaves like an ambient canvas where product cards hold physical volume, menus float in a Z-depth spatial coordinates, and light dynamically bends through real-time glass layers. 

Our core philosophy merges:
1. **Apple iOS 27 Liquid Glass & visionOS:** Absolute spatial volume, high-refraction glass backdrops, dynamic gas-diffusion specular highlights, and natural depth sorting.
2. **Samsung One UI 8.5:** Ergonomic focus, bottom-weighted primary interactions, oversized contextual page titles, and elastic oversized scrolling curves.
3. **Google Material You:** Dynamic tonal range, personal palette generation based on the ambient image, and expressive responsive micro-interactions.
4. **Microsoft Fluent Design:** Material light sources (Reveal highlights), depth-based acrylic materials, and complex shadow-casting structures.
5. **Nothing OS:** Raw technical monospaced accents, brutalist micro-indicators, and sparse structural lines that act as stabilizing anchors amidst rich glass layers.

---

## THE 30 DESIGN SYSTEM MODULES

### 1. Color Palette
Our color system uses an dynamic, hyper-precise high-contrast slate-and-metal scheme, backed by organic fluid accents reflecting our diverse product lines (Clothes, Daily Essentials, Gifts, Home, Lifestyle).

```
┌────────────────────────────────────────────────────────────────────────┐
│                              SYSTEM COLOR MAP                          │
└────────────────────────────────────────────────────────────────────────┘
```

#### A. Core Neutral Gradients (Light Mode)
*   **Canvas Base:** `#F8FAFC` (Slate 50) – Ambient soft-cool neutral.
*   **Active Substrate:** `#FFFFFF` (Solid White) – High contrast panel surface.
*   **Acrylic Base:** `rgba(255, 255, 255, 0.45)` – Liquid glass material.
*   **Steel Stroke:** `rgba(15, 23, 42, 0.05)` (Slate 900 at 5%) – Fine-line boundaries.

#### B. Core Neutral Gradients (Dark Mode)
*   **Spatial Canvas:** `#020617` (Slate 950) – Pitch-black dark space.
*   **Active Substrate:** `#0B132B` (Deep Space Slate) – Opaque elevated panels.
*   **Acrylic Base:** `rgba(11, 19, 43, 0.45)` – Subtly tinted dark glass.
*   **Metal Stroke:** `rgba(255, 255, 255, 0.06)` – Polarized edge refraction.

#### C. Brand Intent Accents (Material You Adaptive Tokens)
*   **Rudrakash Royal Amber (Primary):** `#D97706` (Amber 600) | Dark: `#F59E0B` (Amber 500)
    *   *Intended for:* High-value calls to action, premium touchpoints.
*   **Liquid Sapphire (Secondary):** `#2563EB` (Blue 600) | Dark: `#60A5FA` (Blue 400)
    *   *Intended for:* Spatial navigation indicators, active state outlines.
*   **Forest Alabaster (Earthy Accent):** `#16A34A` (Green 600) | Dark: `#4ADE80` (Green 450)
    *   *Intended for:* Organic/Lifestyle categories, checkout success, sustainability badges.
*   **Crimson Glass (Destructive Accent):** `#DC2626` (Red 600) | Dark: `#F87171` (Red 400)
    *   *Intended for:* Error messages, cancel triggers, negative stock states.

---

### 2. Typography
Typography forms the structural grid of Rudrakash. By pairing geometric display fonts with robust terminal-style monospaced data tags, we balance high luxury with technical futuristic precision.

#### A. Typeface Selection
1.  **Display Sans (Headings, Branding):** `Space Grotesk` – Tech-forward, high character, wide tracking.
2.  **Body Sans (Interface, Content):** `Inter` – Swiss/Modern, neutral legibility, perfect alignment.
3.  **Monospace Data (Price, Stock, Telemetry):** `JetBrains Mono` – Tactile, industrial, dense, perfectly readable at small sizes.

#### B. Typographic Scale & Hierarchy
*   **Display 1 (Super Hero Title):** `size: 3rem (48px) | weight: 800 | tracking: -0.05em | line-height: 1.1`
*   **Heading 1 (Page Title):** `size: 2.25rem (36px) | weight: 700 | tracking: -0.03em | line-height: 1.2`
*   **Heading 2 (Card Title):** `size: 1.25rem (20px) | weight: 600 | tracking: -0.02em | line-height: 1.3`
*   **Body Main:** `size: 0.9375rem (15px) | weight: 400 | tracking: -0.01em | line-height: 1.6`
*   **Caption Mono:** `size: 0.75rem (12px) | weight: 500 | tracking: 0.05em (uppercase) | font: JetBrains Mono`

---

### 3. Spacing System
Inspired by Google Material and Microsoft Fluent, we utilize a strict **8-point geometric scale** with non-linear padding variations to create visual pacing and avoid visual fatigue.

*   `4px (0.25rem)` – Micro alignment (e.g., label-to-input gap, status dot margin).
*   `8px (0.5rem)` – Tight grouping (e.g., button inner elements, price-to-title layout).
*   `16px (1rem)` – Component padding (e.g., input field inner margins, default card padding).
*   `24px (1.5rem)` – Contextual layout (e.g., card-to-card gap, form-field spacing).
*   `48px (3rem)` – Section container padding (e.g., container outer bounds, grid gaps).
*   `96px (6rem)` – Hero & Display margins.

---

### 4. Border Radius
Fluidity requires curved edges that match the visual flow of organic liquids. We reject harsh square points except for technical monospaced indicator flags.

*   **Mini Tag (`rounded-sm`):** `6px (0.375rem)` – Price flags, stock badges.
*   **Button/Input (`rounded-lg`):** `12px (0.75rem)` – Tactical interaction modules.
*   **Standard Card (`rounded-2xl`):** `20px (1.25rem)` – Default product and navigation cells.
*   **Hero Banners / Spatial Shells (`rounded-3xl`):** `32px (2rem)` – Large viewport wraps.
*   **Dynamic Island / Pill Track (`rounded-full`):** `9999px` – Continuous fluid boundaries.

---

### 5. Glass Effect (Liquid Glassmorphism)
Our primary material surface is **Liquid Glass**, which utilizes sub-pixel borders, back-refraction, and precise ambient color bleeding.

#### Code Definition (Tailwind Utility Class):
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(24px) saturate(220%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.3),
    0 8px 32px -4px rgba(15, 23, 42, 0.04);
}
.dark .liquid-glass {
  background: rgba(11, 19, 43, 0.45);
  backdrop-filter: blur(24px) saturate(220%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.05),
    0 8px 32px -4px rgba(0, 0, 0, 0.5);
}
```

---

### 6. Elevation Levels
Spatial environments require depth sorting. Items are placed on four virtual spatial planes above the canvas.

```
       [Z-INDEX / ELEVATION LEVEL HIERARCHY]

       Layer 4: Dynamic Overlay / Island (z-50)  ───► [ +32dp ]
       Layer 3: Hovered State Card (z-30)        ───► [ +12dp ]
       Layer 2: Standard Base Panel (z-10)       ───► [  +4dp ]
       Layer 1: Canvas / Background (z-0)        ───► [   0dp ]
```

*   **L1 (Base Canvas):** Flat, absorbs background light.
*   **L2 (Interactive Panel):** Elevated 4px vertically. Subtle shadow.
*   **L3 (Active Focus/Expanded):** Elevated 12px vertically. Dynamic ambient occlusion shadow.
*   **L4 (Floating Island/Modals):** Elevated 32px vertically. Generous blur-shadow dispersion.

---

### 7. Blur System
To create spatial depth, background content must blur selectively based on overlays. We avoid low-quality performance-heavy blurs.

*   **Subtle Acrylic Blur (`blur-sm`):** `8px` – For nested mini-dropdowns, tooltips.
*   **Standard Interface Blur (`blur-md`):** `16px` – For product-card hover states, primary header rails.
*   **Spatial Overlay Blur (`blur-lg`):** `24px` – For fullscreen fly-outs, dynamic drawer panels.
*   **Ambient Glow Blur (`blur-xl`):** `64px` – Behind container items to create warm fluid under-glows.

---

### 8. Shadow System
Shadows represent real-world physical light blocks. We use multi-layered shadows to mimic ambient diffuse lighting.

#### A. Spatial Light Shadow (Light Mode)
```css
box-shadow: 
  0 2px 4px rgba(15, 23, 42, 0.02),
  0 8px 16px -4px rgba(15, 23, 42, 0.04),
  0 20px 40px -8px rgba(15, 23, 42, 0.06);
```

#### B. Polarized Shadow (Dark Mode)
```css
box-shadow: 
  0 2px 4px rgba(0, 0, 0, 0.2),
  0 12px 24px -6px rgba(0, 0, 0, 0.4),
  0 24px 48px -12px rgba(0, 0, 0, 0.6);
```

---

### 9. Glow System
Glows are generated when spatial elements are charged with user intent or interactive active focus states. These simulate active light-emitting surfaces.

*   **Amber Glow (Accent Charged):** `box-shadow: 0 0 20px 0 rgba(217, 119, 6, 0.25);`
*   **Blue Ray (System Intent):** `box-shadow: 0 0 24px 0 rgba(37, 99, 235, 0.3);`
*   **Clean Glass Back-Glow:** `box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.15);`

---

### 10. Motion System
Motion is not decorative; it is the friction coefficient of our virtual operating system. We utilize mass-spring-damper physics instead of linear transitions.

#### Core Physics Curve:
*   **Spring Inertia:** `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (Overshoot rebound).
*   **Liquid Smooth:** `cubic-bezier(0.16, 1, 0.3, 1)` (Perfect deceleration).
*   **System Exit:** `cubic-bezier(0.3, 0, 0.8, 0.15)` (Fast escape).

---

### 11. Animation Timing
*   **Instant Feedbacks:** `100ms` (Micro-state changes, checkbox tick).
*   **Fluid Hover Shifts:** `250ms` (Scale increases, background morphs).
*   **Spatial Transitions:** `450ms` (Drawer slide-out, page routing, dynamic island expansion).
*   **Languid Atmospheric Cycles:** `8000ms` (Ambient background gas gradients shifting).

---

### 12. Hover States
Hovering represents physical proximity. Element scales up subtly, edge refraction sharpens, and shadow intensifies.

```css
.interactive-hover-state {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
}
.interactive-hover-state:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 12px 32px -8px rgba(15, 23, 42, 0.08),
    0 0 16px rgba(217, 119, 6, 0.1);
}
```

---

### 13. Focus States
Focusing represents active terminal targeting. We avoid generic dotted rings. We draw a double-ring glow: an outer system sapphire ring and an inner clear air spacer.

```css
.system-focus-ring:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 2px var(--canvas-color),
    0 0 0 4px #2563EB,
    0 0 12px rgba(37, 99, 235, 0.4);
}
```

---

### 14. Active States (Pressed / Tactile Friction)
Pressed states feel mechanical. They recoil instantly downwards on Z-depth, reducing volume size slightly and muting the drop shadow.

```css
.interactive-active-press {
  transition: transform 0.1s ease;
}
.interactive-active-press:active {
  transform: translateY(1px) scale(0.97);
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.02);
}
```

---

### 15. Icon System
Icons are drawn using precise **1.5px lines** from `lucide-react`. We never fill icons completely except to indicate an active binary toggle (e.g., filled heart for Wishlist active). They are surrounded by an invisible 44px spatial touch target.

---

### 16. Button Variants
Buttons represent the main mechanical triggers of our system. They come in three spatial grades:

#### A. Grade 1: Hyper-Refractive Core (Primary CTA)
*   *Design:* High-saturation primary accent gradient, subtle white top highlight stroke, under-glow, rounded-lg.
*   *Interactive:* Shifts scale, emits a radial ripple highlight on hover.

#### B. Grade 2: Liquid Glass (Secondary Action)
*   *Design:* Opaque acrylic substrate, steel/metal stroke, glass blur background.
*   *Interactive:* Back-blur intensifies, border opacity increases.

#### C. Grade 3: Spatial Wireframe (Utility Action)
*   *Design:* Ultra-fine border stroke, completely transparent center, monospaced text.
*   *Interactive:* Text glows slightly, background shifts to a very faint 5% slate opacity.

---

### 17. Input Styles
Input fields are spatial search slots. They dynamically expand when targeted, changing their left bezel from slate to amber glow.

*   **Bezel Base:** Solid 1px Slate border inside white glass.
*   **Active Target State:** Left border grows to 3px thickness, tinted in brand amber, and pulls active suggestion list from an acrylic drop panel.
*   **Placeholder text:** Low contrast, monospace `JetBrains Mono` formatting tags (`[Type here...]`).

---

### 18. Card Styles (Spatial Cells)
Cards are the foundational masonry block of Rudrakash. They are constructed with a clear hierarchy of structural layers:

```
┌────────────────────────────────────────────────────────┐
│  CARD CONTAINER (rounded-2xl, liquid-glass, shadow-sm) │
│  ┌──────────────────────────────────────────────────┐  │
│  │  ASSET ZONE (16:9, rounded-xl, zoom-on-hover)    │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  METADATA LINE (monospace tags, category badge)   │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  TACTILE CONTROLS (quick action, glass trigger)  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

### 19. Product Card Design
Our product cards act as autonomous shopping mini-apps.
*   **Image frame:** Standard 1:1 square crop with a high-friction hover state. Hovering on the card triggers an active asset switch (crossfades to alternative image view instantly).
*   **Tactile interaction:** Hovering reveals a floating spatial action layer (Add to Cart button with immediate mechanical feedback, Wishlist heart toggle with spring vibration).
*   **Telemetry Panel:** Prices are displayed in bold `JetBrains Mono` paired with small uppercase stock counts (`ONLY [3] LEFT`).

---

### 20. Checkout Components
The checkout sequence should feel like a guided flight instrument check.
*   **Progress Hub:** Designed as a dynamic thread tracking timeline. Active nodes pulse with liquid-sapphire halos.
*   **Tactile Address Cards:** High contrast panels with interactive radial borders. Users can select shipping addresses like clicking active slots on an OS.
*   **Receipt Panel:** Monospaced breakdowns utilizing dotted divider lines (`-------------------------`) to provide an absolute mechanical, clean breakdown.

---

### 21. Navigation Style (Glass-Arch Rail)
Our main navigation floats as a persistent spatial bar (`z-40`) at the top of the viewport. It does not touch the edges; instead, it is framed inside a rounded-full capsule.

*   **Substrate:** `liquid-glass` (highly transparent).
*   **Aesthetic Detail:** Features a hairline metal outline, and acts as a filter lens, blurring all product contents as they slide underneath during scrolling.
*   **Interactive Tabs:** Navigating changes tabs with a magnetic slide highlight (a sliding oval back-plate that glides smoothly behind active link texts).

---

### 22. Footer Design (The Substrate Bed)
Unlike classic footers containing massive chaotic text lists, our footer acts as a clean industrial plate at the bottom of the canvas.
*   **Structure:** Sparse slate-900 typography, dual columns of direct navigation links, and a solid clean credit block.
*   **Brutalism details:** Dedicated monospaced telemetry showing the active GMT time, server node status, and a personal signature: `CURATED BY SHIVANSH GUPTA`.

---

### 23. Floating Elements (Tactile Spatial Layers)
*   **Floating Cart Bezel:** A highly responsive spatial widget in the bottom-right viewport. It is a dual-layered circle that shows the current price total, expanding on click into a slide-out drawer.
*   **Spatial Utility Rail:** Minimal icons resting on the side edge of the desktop viewport for instant access to high-priority features (Chatbot, Currency switcher, Language portal).

---

### 24. Dynamic Island Style Notifications
System notifications slide downward from the top-center, originating from an invisible localized focal point. It behaves like a fluid bubble:

1.  **Resting State:** Invisible, tiny collapsed point.
2.  **Trigger State:** Pops out with a spring overshoot, transforming into an horizontal capsule.
3.  **Content Display:** Renders a clean icon, a crisp bold title, and secondary action button in one row.
4.  **Exit State:** Pulls itself back into the single point, completely dissolving.

---

### 25. Loading Animations (Liquid Orbits)
We banish traditional blocky spinner indicators. We utilize:
*   **Liquid Halo:** A clean continuous ring that pulses its border-radius between circular and slightly fluid, rotating at a constant rate.
*   **Progressive Laser Stripe:** A 1.5px amber laser line that glides across the bottom boundary of the floating glass header rail during server fetches.

---

### 26. Skeleton Loading
Our skeletons do not use jarring gray flashing blocks. They are designed using dark-to-light slate linear gradients that pulse with a soft shimmer wave (`animate-pulse` with custom easing). Skeletons maintain the exact border-radius of the card they represent.

---

### 27. Empty States
Empty states are crafted as minimal artistic statements rather than sad blank pages.
*   **Visual core:** A light-weight vector frame with high negative space.
*   **Call to action:** Placed inside a single, centered Liquid Glass CTA container to instantly guide the user back into active browsing.

---

### 28. Success States
Success indicators emit warm, positive, natural motion.
*   **Chromatic Surge:** Triggering a success state flashes a very soft, transient green organic ambient circle in the background that fades in 600ms.
*   **Checkmark Action:** Uses a spring-drawn line animation that traces the paths of the success tick.

---

### 29. Error States
Errors are designed as structured, technical system warnings rather than alarming alerts.
*   **Format:** Framed in a tight Crimson Glass card with clear diagnostic codes (e.g., `ERR_AUTH_EXPIRED` or `ERR_OUT_OF_STOCK`), accompanied by a clear, human-centered fix action.

---

### 30. Accessibility Rules (Unified Compliance)
*   **Contrast Ratio:** Every element maintains a minimum contrast ratio of `4.5:1` for body text and `3:1` for displays.
*   **Dynamic Font Size:** Scale values use relative `rem` units to adapt to browser font scales correctly.
*   **Keyboard Navigation:** All spatial triggers support complete focus targeting with clear visual focus rings.
*   **Reduction Preference:** Respects system accessibility switches by disabling non-essential background atmospheric gradient shifting when `prefers-reduced-motion` is active.

---

## IMPLEMENTATION INSTRUCTIONS
To bring this system to life, copy the custom tailwind v4 utility bindings directly into the main application styles. Use semantic, descriptive variable keys to maintain structural integrity. All spatial elements should map back to these exact definitions.
