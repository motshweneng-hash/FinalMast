# Changelog – Chef's Menu Manager (Christoffel's Restaurant)

| | Phase 2 | Phase 3 (this submission) |
|---|---|---|
| **Version** | 1.x | **2.0.0** |
| **Type** | Website (React, run in the browser on `localhost:3000`) | **Mobile application** (React Native with Expo, runs on a phone / emulator) |
| **Language** | JavaScript | **TypeScript** (strict typing) |
| **Date of this release** | – | 6 November 2026 |

> Phase 2 details below are taken from the Phase 2 demonstration video of the website. Phase 3 is a new mobile build of the same Chef's Menu Manager idea, not a patch of the website.

---

## 1. Summary for the lecturer (the short version)

1. The project moved from a **website** to a **mobile application**.
2. All five Phase 3 requirements were added: **manage items** (edit / update / delete), **search and filter**, **menu statistics**, **application enhancement**, **user experience**.
3. The menu is now divided into clear **Food, Drinks and Dessert sections** with 14 dishes that each have a matching photo, description, price, preparation time and tags.
4. Photos are **embedded inside the app**, so they always load (Phase 2 images were web links and some failed to load).
5. Browser pop-ups were replaced by **in-app messages and confirmation dialogs**.
6. The whole app is delivered in **one file (`App.tsx`)** with the code split into clearly labelled sections.

---

## 2. Platform and technology changes

| Area | Phase 2 (website) | Phase 3 (mobile app) |
|---|---|---|
| Platform | Web page in a desktop browser | Android / iOS app via Expo Go (also runs on the web) |
| Framework | React for the web | React Native + Expo |
| Language | JavaScript | TypeScript with strict type checking |
| Messages | Browser `alert` / `confirm` boxes ("localhost:3000 says…") | Custom in-app **toast messages** and **confirmation dialogs** that look the same on every device |
| Navigation | Single scrolling web page with a pop-up form | **Bottom tab bar** (Menu / Add Dish / Statistics), full-screen Add / Edit form with a Back button, Android back button support |
| Images | External web links (Unsplash) – some showed a broken image icon | **Photos embedded in the app** (no internet needed) with a friendly placeholder if a photo is missing |
| Currency | Dollars (`$`) | South African Rand (`R`), changeable in one constant |
| Layout | Desktop page | Touch-friendly mobile layout with safe-area spacing, keyboard handling and scrolling lists |
| Project files | Website project | **One file: `App.tsx`** (data, utilities, state, components, screens, navigation and photos) |

---

## 3. New features (Phase 3 requirements)

### 3.1 Manage Menu Items
- **Edit:** tapping **✏️ Edit** on any dish opens the form already filled with that dish's details.
- **Update:** **💾 Save Changes** updates the dish; the change appears immediately on the Menu and Statistics screens.
- **Delete:** tapping **🗑️ Delete** shows a confirmation ("Delete this dish?"); confirming removes the dish immediately.
- **One shared form** is used for both adding and editing (no duplicated code).
- A green message confirms every add, update and delete.

### 3.2 Search and Filter
- **Search by name** while typing (not case-sensitive); the **✕** button clears the text.
- **Filter by course** with chips: All, Starter, Main Course, Dessert, Drinks.
- Search and course filter **work together**.
- **Clear filters** link resets everything and shows all dishes again.
- Live counter: "Showing X of Y dishes".
- A friendly **"No dishes found"** screen with a Clear filters button when nothing matches.
- The menu keeps its search / filter when you switch to Statistics and back.

### 3.3 Display Menu Statistics (new Statistics screen)
- **Total number of menu items**.
- **Average price of all items**.
- **Number of items in each course**, shown with colour bars.
- Extra insights: **average price per course**, **most affordable** dish and **most expensive** dish.
- Numbers update instantly after adding, editing or deleting.

### 3.4 Enhance the Application
- **Reusable components:** Button, InputField, SearchBar, ConfirmDialog, EmptyState, StatCard, ScreenHeader, TabBar, AuthLayout, MenuCard, DishImage, CourseChip, CourseBadge, TagBadge, TagPicker, SectionHeader, PhotoPicker.
- **Reusable functions:** `validateDish`, `validateEmail`, `validatePassword`, `validateFullName`, `parsePrice`, `calculateMenuStats`, `formatPrice`, `makeId`, `getFirstName`.
- **Shared state** with React Context: `AuthContext`, `MenuContext` (add / update / delete through a reducer) and `ToastContext`.
- **Meaningful names** (e.g. `handleConfirmDelete`, `visibleItems`, `filtersActive`, `calculateMenuStats`).
- **Better code organisation:** the file is split into numbered, labelled sections; styles sit next to the component that uses them.
- **One theme** (colours, radius, shadows) so the look can be changed in one place.
- **TypeScript types** for dishes, sections, tabs, form values, validation results and context values.

### 3.5 User Experience
- Clear navigation between all features (bottom tabs, Back button, Login ⇄ Sign Up ⇄ Forgot Password).
- **Success and error messages** on every action (green / red toast).
- **Inline error messages** under each invalid field; the error disappears as soon as the user fixes the field.
- **Confirmation dialogs** for Delete and Logout.
- **Live photo preview** while adding or editing a dish.
- **Show / Hide** button on the password field and a one-tap **demo account** on the login screen.
- Consistent colourful look (purple, pink, and a colour per course) on every screen.

---

## 4. Menu and content changes

### 4.1 Courses
| Phase 2 | Phase 3 |
|---|---|
| Starters, Main Course, Drinks, **Sides**, Dessert | **Starter, Main Course, Dessert, Drinks** |

- **Sides was removed** so the course list matches the Phase 3 brief (Starter, Main Course, Dessert). **Drinks** was kept as an extra course because drink photos were supplied; it can be removed in one place if exactly three courses are required.

### 4.2 Menu sections (new)
The menu screen is divided into three coloured sections, each with a heading, description and dish counter. Sections with no matching dishes are hidden while searching or filtering.

| Section | Contains |
|---|---|
| 🍽️ **Food** | Starters and Main Courses |
| 🍹 **Drinks** | Drinks |
| 🍰 **Dessert** | Desserts |

### 4.3 Dishes
Phase 2 had a small starting menu (for example Burger and chips, Liquifruit Juice, Tiramisu, Garlic Bread, Truffle Fries, Chocolate Lava Cake). Phase 3 has **14 dishes**, each with an accurate name matching its photo:

| Section | Dishes |
|---|---|
| Food (6) | Salmon Sushi Platter, Rainbow Sushi Rolls, Classic Cheddar Burger, Cheeseburger & Chips, Supreme Pizza, Soba Noodle Stir-Fry |
| Drinks (5) | Passion Fruit Mint Cooler, Mixed Berry Mocktail Trio, Blue Lagoon Mocktail, Strawberry Basil Sparkler, Golden Pumpkin Juice |
| Dessert (3) | Raspberry Cream Trifle, Peanut Butter Chocolate Bar, Strawberry Shortcake Cups |

### 4.4 Extra dish details (new)
- **Description** on every dish (the Phase 2 form only asked for name, course, price and image link).
- **Preparation time** (⏱️, optional, 1–180 minutes).
- **Special tags** (optional): ⭐ Chef's Pick, 🌱 Vegetarian, 🌶️ Spicy, 🧃 Alcohol-Free, 🥜 Contains Nuts.
- **Photo picker:** the chef chooses from the 14 built-in photos, or pastes an image link (the link overrides the chosen photo).

---

## 5. Add / Edit form changes

| Field | Phase 2 | Phase 3 |
|---|---|---|
| Dish name | Free text | Required, 3–40 characters, **no duplicate names** |
| Course | Drop-down list | Tappable **course chips** (required) |
| Price | Number box | Required, number greater than 0, up to 2 decimals, maximum 10 000; comma accepted (e.g. `59,90`) |
| Description | – | **New:** required, 10–140 characters with a live counter |
| Preparation time | – | **New:** optional whole minutes |
| Tags | – | **New:** optional special tags |
| Photo | Image URL only | **Photo picker** + optional image link (must start with `http://` or `https://`) |
| Buttons | Submit Changes / Cancel | **Add Dish / Save Changes**, Cancel and a Back button |

Other validation added in Phase 3:
- **Login:** valid email format; password required; clear "no account" / "incorrect password" messages.
- **Sign Up (new rules):** full name, valid email, password of at least 6 characters, matching confirmation, no duplicate email.
- **Forgot Password:** valid email that belongs to an account.

---

## 6. Screens and navigation

| Screen | Phase 2 | Phase 3 |
|---|---|---|
| Login | Yes (restaurant photo, email, password, Sign Up and Forgot Password links) | **Kept and improved:** same restaurant photo and links, plus inline errors, Show / Hide password and a demo account |
| Sign Up | Link on the login page | **Full Sign Up screen** with validation |
| Forgot Password | Link on the login page | **Full Forgot Password screen** |
| Welcome banner | "Welcome to Christoffel's Restaurant – What is new on the menu today?" | **Kept** (food photo background), plus a personal greeting and Logout button |
| Chef Menu Management band | "Chef Menu Management" with **+ Add New Dish** | **Kept** (same pink band and button) |
| Menu list | Cards with image, name, description, price, course badge, Edit and Delete | **Kept and extended:** food / drinks / dessert sections, preparation time, tags, price badge on the photo |
| Add / Edit | Pop-up form | Full-screen form with live preview |
| Statistics | – | **New screen** |
| Bottom navigation | – | **New** tab bar: Menu, Add Dish, Statistics |
| Logout | – | **New** (with confirmation) |

---

## 7. Kept from Phase 2

- Login, Sign Up and Forgot Password flow.
- The restaurant photo on the login screen (reused from the Phase 2 login page).
- The welcome message and the "Chef Menu Management" / "+ Add New Dish" idea.
- Course filter chips and menu cards with Edit and Delete buttons.
- The purple / pink colour scheme of the website.

## 8. Removed or replaced

| Removed / replaced | Reason |
|---|---|
| Browser alerts and confirm boxes | Do not exist in a mobile app; replaced by toast messages and confirmation dialogs |
| External image links as the only image source | Some failed to load; photos are now embedded |
| "Sides" course | Not part of the Phase 3 brief |
| Dollar prices | Replaced by Rand (one constant to change) |
| Desktop-only page layout | Replaced by a mobile layout |

---

## 9. Known limitations (honest notes)

- **Data is stored in memory only** – it resets when the app is fully closed (no database in this phase).
- **Login, Sign Up and Forgot Password are simulated** inside the app; no real server or email is used.
- Embedded photos are **compressed** to keep the single file a manageable size.
- The **Drinks** course goes slightly beyond the brief's three courses (see 4.1).

---

## 10. Where to find each change in `App.tsx`

| Change | Section of `App.tsx` |
|---|---|
| Courses, Food / Drinks / Dessert sections, tags, types | 1. Data |
| Theme, validation, statistics, formatting | 2. Utilities |
| The 14 dishes | 3. Starting menu |
| Add / update / delete logic, login logic, toast messages | 4. State |
| Reusable UI components | 5. Reusable components |
| Login, Sign Up, Forgot Password, Menu, Add / Edit form, Statistics | 6. Screens |
| Navigation and screen links | 7. App |
| Embedded photos | 8. Photos |
