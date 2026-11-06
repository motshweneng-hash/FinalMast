# Chef's Menu Manager – Christoffel's Restaurant (Phase 3 POE – Mobile Application)

A **TypeScript** React Native (Expo) mobile app that lets the chef add, edit, delete, search, filter and analyse the restaurant menu.
It is the mobile version of the Phase 2 website. **See `CHANGELOG.md` for every change between the two phases.**

The whole application – data, utilities, state, components, screens, navigation **and all photos** – is in **one file: `App.tsx`**.

## 1. Run it in VS Code

You need Node.js (LTS), VS Code and the **Expo Go** app on your phone (or an Android emulator).

```bash
npx create-expo-app@latest ChefMenuManager --template blank-typescript
cd ChefMenuManager
```
Replace the template's **`App.tsx`** with the `App.tsx` from this submission. Nothing else needs to be copied or installed (no extra packages, no image files). Then:
```bash
npx expo start
```
Scan the QR code with Expo Go, or press **a** for an Android emulator. If you see a strange error, run `npx expo start -c`.
Optional type check: `npx tsc --noEmit`.

**Demo login:** `chef@christoffels.com` / `Chef@123` (or tap **Sign Up**). Tap the purple demo box on the login screen to auto-fill.

## 2. How `App.tsx` is organised

| Section in the file | What is inside |
|---|---|
| 1. Data | Courses, the Food / Drinks / Dessert sections, special tags, TypeScript types |
| 2. Utilities | Theme colours, shadows, safe areas, price formatting, validation, statistics maths |
| 3. Starting menu | The 14 dishes |
| 4. State | Auth (login / sign up / forgot password), Menu (add / update / delete), Toast messages |
| 5. Reusable components | Button, InputField, SearchBar, ConfirmDialog, EmptyState, StatCard, ScreenHeader, TabBar, AuthLayout, MenuCard, DishImage, CourseChip, CourseBadge, TagBadge, TagPicker, SectionHeader, PhotoPicker |
| 6. Screens | Login, Sign Up, Forgot Password, Menu, Add / Edit dish form, Statistics |
| 7. App | Links every screen together, Android back button, logout |
| 8. Photos | The 15 photos, embedded as base64 (kept at the very bottom so the code stays easy to read) |

Screen flow: `Login ⇄ Sign Up`, `Login ⇄ Forgot Password`, `Login → Menu ⇄ Statistics` (bottom tabs), `Menu / Add tab → Add or Edit form → Menu`, `Logout → Login`.

## 3. Menu sections

| Section | Courses | Dishes |
|---|---|---|
| 🍽️ Food | Starter, Main Course | Salmon Sushi Platter, Rainbow Sushi Rolls, Classic Cheddar Burger, Cheeseburger & Chips, Supreme Pizza, Soba Noodle Stir-Fry |
| 🍹 Drinks | Drinks | Passion Fruit Mint Cooler, Mixed Berry Mocktail Trio, Blue Lagoon Mocktail, Strawberry Basil Sparkler, Golden Pumpkin Juice |
| 🍰 Dessert | Dessert | Raspberry Cream Trifle, Peanut Butter Chocolate Bar, Strawberry Shortcake Cups |

Every dish also shows a preparation time ⏱️ and optional tags (⭐ Chef's Pick, 🌱 Vegetarian, 🌶️ Spicy, 🧃 Alcohol-Free, 🥜 Contains Nuts).

## 4. Rubric checklist (what to show for each mark)

| Rubric item | Where / how to show it |
|---|---|
| **Manage Menu Items (25)** | **✏️ Edit** on a card → change details → **Save Changes**; **🗑️ Delete** → confirm. Changes show instantly on the Menu and Statistics screens (one shared state). |
| **Search and Filter (20)** | Search bar (by name, as you type) + course chips (Starter / Main Course / Dessert / Drinks) + **Clear filters** + "Showing X of Y dishes" + "No dishes found" screen. |
| **Display Menu Statistics (20)** | **Statistics** tab: total items, average price, items per course (colour bars), plus average per course and cheapest / most expensive dish. |
| **Enhance the Application (25)** | Reusable components and functions, shared state, one form for add + edit, full validation, TypeScript types, consistent theme (details in `CHANGELOG.md`). |
| **User Experience (10)** | Bottom tab bar, Back buttons, green / red messages, inline field errors, confirm pop-ups (delete, logout), colourful consistent design. |

## 5. POE demonstration list (tick each one in your video)

- [ ] **Adding menu items** – + Add New Dish → complete the form (try one invalid attempt first) → Add Dish
- [ ] **Editing menu items** – Edit → change the price → Save Changes
- [ ] **Deleting menu items** – Delete → Yes, delete
- [ ] **Searching for menu items** – type "burger" in the search bar
- [ ] **Filtering menu items** – tap a course chip, then Clear filters
- [ ] **Displaying menu statistics** – open the Statistics tab (numbers change after add / edit / delete)
- [ ] **The overall functionality of the completed application** – login, the Food / Drinks / Dessert sections, navigation, messages, logout

**Suggested order (about 3–4 minutes):** wrong password → demo login → scroll the sections → search → filter → clear → edit (try an empty name first) → add a dish (photo, prep time, tag) → delete → Statistics → logout.

## 6. Quick changes

- Currency: `CURRENCY_SYMBOL` in section 2 (currently `R`).
- Courses / sections: section 1 (the brief lists Starter, Main Course and Dessert; **Drinks** is an extra course – remove it there and its dishes in section 3 if exactly three are required).
- Colours: `colors` in section 2.
- Data lives in memory, so it resets when the app is fully closed.
