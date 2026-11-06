# Chef's Menu Manager – Christoffel's Restaurant (Part 3 POE)

A **TypeScript** React Native (Expo) app that lets the chef add, edit, delete, search, filter and analyse the menu.

## 1. Run it in VS Code

You need Node.js (LTS), VS Code and the **Expo Go** app on your phone (or an Android emulator).

```bash
npx create-expo-app@latest ChefMenuManager --template blank-typescript
cd ChefMenuManager
```
Copy into that project: **`App.tsx`** (replace the existing one), the **`src`** folder, and the images (`assets/food` folder + `assets/restaurant.jpg`, placed inside the existing `assets` folder). Keep the template's own `package.json`, `app.json`, `index.ts` and `tsconfig.json`. Then:
```bash
npx expo start
```
Scan the QR code with Expo Go, or press **a** for an Android emulator. No extra packages are needed. If you see a strange error, run `npx expo start -c`. To type-check: `npx tsc --noEmit`.

*Using your old Part 2 project instead?* Delete its `App.js`, copy the same files in, and run `npx expo install typescript @types/react`.

**Demo login:** `chef@christoffels.com` / `Chef@123` (or tap **Sign Up**). Tap the purple demo box on the login screen to auto-fill.

## 2. Files (only 9)

| File | What is inside |
|---|---|
| `App.tsx` | Navigation: links every screen together, Android back button, logout |
| `src/data.ts` | Types, courses, Food / Drinks / Dessert sections, tags, photos, the 14 starting dishes |
| `src/utils.ts` | Theme colours, shadows, safe areas, price formatting, validation, statistics maths |
| `src/context.tsx` | Shared state: logins (Auth), the menu (add / update / delete), success & error messages (Toast) |
| `src/components.tsx` | Reusable UI: Button, InputField, SearchBar, ConfirmDialog, EmptyState, StatCard, ScreenHeader, TabBar, AuthLayout |
| `src/MenuComponents.tsx` | Menu UI: MenuCard, DishImage, CourseChip, CourseBadge, TagBadge, TagPicker, SectionHeader, PhotoPicker |
| `src/AuthScreens.tsx` | Login, Sign Up, Forgot Password screens |
| `src/MenuScreens.tsx` | Menu screen (search, filter, sections), Add / Edit dish form, Statistics screen |

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
| **Enhance the Application (25)** | Reusable components and functions, shared state, one form for add + edit, validation (name, duplicates, price, prep time, image link, email, password), TypeScript types, consistent theme. |
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

- Currency: `CURRENCY_SYMBOL` in `src/utils.ts` (currently `R`).
- Courses / sections: `src/data.ts` (the brief lists Starter, Main Course and Dessert; **Drinks** was added because you sent drink photos – remove it there and its dishes if your lecturer wants exactly three).
- Colours: `colors` in `src/utils.ts`.
- Data lives in memory, so it resets when the app is fully closed.
