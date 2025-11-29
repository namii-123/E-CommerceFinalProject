# GreenieCart E-Commerce Application - Use Case Documentation

## System Overview

GreenieCart is an e-commerce platform where users can register, browse products, manage their own products, add items to cart, and place orders.

---

## Actors

| Actor               | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| **Guest**           | Unregistered user who can only access login and registration pages       |
| **Registered User** | Authenticated user who can browse, buy, sell products, and manage orders |
| **System**          | Firebase backend (Authentication, Firestore, Storage)                    |

---

## Use Case Diagram (Text Representation)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GreenieCart System                                │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      Authentication Module                            │  │
│  │   ○ UC-01: Register Account                                          │  │
│  │   ○ UC-02: Login                                                     │  │
│  │   ○ UC-03: Logout                                                    │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      Product Management Module                        │  │
│  │   ○ UC-04: View All Products                                         │  │
│  │   ○ UC-05: Search Products                                           │  │
│  │   ○ UC-06: Add New Product                                           │  │
│  │   ○ UC-07: Edit Own Product                                          │  │
│  │   ○ UC-08: Delete Own Product                                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      Shopping Cart Module                             │  │
│  │   ○ UC-09: Add Product to Cart                                       │  │
│  │   ○ UC-10: View Cart                                                 │  │
│  │   ○ UC-11: Update Cart Quantity                                      │  │
│  │   ○ UC-12: Remove Item from Cart                                     │  │
│  │   ○ UC-13: Checkout / Place Order                                    │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      Order Management Module                          │  │
│  │   ○ UC-14: View My Orders                                            │  │
│  │   ○ UC-15: View Order Details                                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      Profile Management Module                        │  │
│  │   ○ UC-16: View Profile                                              │  │
│  │   ○ UC-17: Edit Profile                                              │  │
│  │   ○ UC-18: View My Products                                          │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

        👤 Guest                              👤 Registered User
        ─────────                             ───────────────────
        │                                     │
        ├── UC-01: Register ──────────────────┤
        └── UC-02: Login ─────────────────────┼── UC-03: Logout
                                              ├── UC-04: View All Products
                                              ├── UC-05: Search Products
                                              ├── UC-06: Add New Product
                                              ├── UC-07: Edit Own Product
                                              ├── UC-08: Delete Own Product
                                              ├── UC-09: Add to Cart
                                              ├── UC-10: View Cart
                                              ├── UC-11: Update Cart Quantity
                                              ├── UC-12: Remove from Cart
                                              ├── UC-13: Checkout
                                              ├── UC-14: View My Orders
                                              ├── UC-15: View Order Details
                                              ├── UC-16: View Profile
                                              ├── UC-17: Edit Profile
                                              └── UC-18: View My Products
```

---

## Detailed Use Cases

### UC-01: Register Account

| Field              | Description                                             |
| ------------------ | ------------------------------------------------------- |
| **Use Case ID**    | UC-01                                                   |
| **Use Case Name**  | Register Account                                        |
| **Actor**          | Guest                                                   |
| **Description**    | A guest user creates a new account to access the system |
| **Preconditions**  | User is not logged in                                   |
| **Postconditions** | New user account is created and stored in Firebase      |

**Main Flow:**

1. Guest navigates to the registration page
2. Guest enters First Name, Last Name, Email, Password, Confirm Password, Contact Number, and Address
3. Guest clicks "Register" button
4. System validates all input fields
5. System creates user in Firebase Authentication
6. System stores user details in Firestore `users` collection
7. System redirects user to login page with success message

**Alternative Flow:**

- 4a. Validation fails → System displays error message
- 5a. Email already exists → System displays "Email already in use" error

---

### UC-02: Login

| Field              | Description                                       |
| ------------------ | ------------------------------------------------- |
| **Use Case ID**    | UC-02                                             |
| **Use Case Name**  | Login                                             |
| **Actor**          | Guest                                             |
| **Description**    | A registered user logs into the system            |
| **Preconditions**  | User has a registered account                     |
| **Postconditions** | User is authenticated and redirected to Dashboard |

**Main Flow:**

1. Guest navigates to login page
2. Guest enters Email and Password
3. Guest clicks "Login" button
4. System authenticates credentials with Firebase Auth
5. System redirects user to Dashboard (Home)

**Alternative Flow:**

- 4a. Invalid credentials → System displays "Invalid email or password" error

---

### UC-03: Logout

| Field              | Description                 |
| ------------------ | --------------------------- |
| **Use Case ID**    | UC-03                       |
| **Use Case Name**  | Logout                      |
| **Actor**          | Registered User             |
| **Description**    | User logs out of the system |
| **Preconditions**  | User is logged in           |
| **Postconditions** | User session is terminated  |

**Main Flow:**

1. User clicks "Sign Out" in sidebar
2. System signs out user from Firebase Auth
3. System redirects user to Login page

---

### UC-04: View All Products

| Field              | Description                                          |
| ------------------ | ---------------------------------------------------- |
| **Use Case ID**    | UC-04                                                |
| **Use Case Name**  | View All Products                                    |
| **Actor**          | Registered User                                      |
| **Description**    | User views all available products in the marketplace |
| **Preconditions**  | User is logged in                                    |
| **Postconditions** | Products are displayed in grid layout                |

**Main Flow:**

1. User navigates to Dashboard/Home
2. System fetches all products from Firestore `products` collection
3. System displays products in a responsive grid with image, name, price, and stock
4. For own products, system shows Edit/Delete buttons instead of Cart/Buy buttons

---

### UC-05: Search Products

| Field              | Description                        |
| ------------------ | ---------------------------------- |
| **Use Case ID**    | UC-05                              |
| **Use Case Name**  | Search Products                    |
| **Actor**          | Registered User                    |
| **Description**    | User searches for products by name |
| **Preconditions**  | User is on Dashboard               |
| **Postconditions** | Filtered products are displayed    |

**Main Flow:**

1. User types search term in search bar
2. System filters products by name (case-insensitive)
3. System displays matching products

---

### UC-06: Add New Product

| Field              | Description                         |
| ------------------ | ----------------------------------- |
| **Use Case ID**    | UC-06                               |
| **Use Case Name**  | Add New Product                     |
| **Actor**          | Registered User                     |
| **Description**    | User adds a new product to sell     |
| **Preconditions**  | User is logged in                   |
| **Postconditions** | New product is created in Firestore |

**Main Flow:**

1. User clicks "Add Product" button
2. System displays Add Product form
3. User enters Product Name, Price, Stock quantity
4. User uploads product image (file)
5. User clicks "Add Product" button
6. System uploads image to Firebase Storage
7. System creates product document in Firestore with `createdBy` field
8. System redirects to Dashboard with success message

**Alternative Flow:**

- 4a. Invalid file type → System displays error
- 6a. Upload fails → System displays error message

---

### UC-07: Edit Own Product

| Field              | Description                       |
| ------------------ | --------------------------------- |
| **Use Case ID**    | UC-07                             |
| **Use Case Name**  | Edit Own Product                  |
| **Actor**          | Registered User                   |
| **Description**    | User edits a product they created |
| **Preconditions**  | User owns the product             |
| **Postconditions** | Product details are updated       |

**Main Flow:**

1. User clicks "Edit" button on their product
2. System navigates to Edit Product page with pre-filled data
3. User modifies product details (name, price, stock, image)
4. User clicks "Update Product"
5. System updates product in Firestore
6. System redirects to Dashboard

---

### UC-08: Delete Own Product

| Field              | Description                         |
| ------------------ | ----------------------------------- |
| **Use Case ID**    | UC-08                               |
| **Use Case Name**  | Delete Own Product                  |
| **Actor**          | Registered User                     |
| **Description**    | User deletes a product they created |
| **Preconditions**  | User owns the product               |
| **Postconditions** | Product is removed from Firestore   |

**Main Flow:**

1. User clicks "Delete" button on their product
2. System displays confirmation dialog
3. User confirms deletion
4. System deletes product from Firestore
5. System refreshes product list

---

### UC-09: Add Product to Cart

| Field              | Description                                          |
| ------------------ | ---------------------------------------------------- |
| **Use Case ID**    | UC-09                                                |
| **Use Case Name**  | Add Product to Cart                                  |
| **Actor**          | Registered User                                      |
| **Description**    | User adds a product to their shopping cart           |
| **Preconditions**  | Product has stock > 0, User does not own the product |
| **Postconditions** | Product is added to user's cart in Firestore         |

**Main Flow:**

1. User clicks cart icon on a product card
2. System checks if product already in cart
3. If not in cart, system adds product to `users/{userId}/cart` subcollection
4. If already in cart, system increments quantity
5. System updates cart count badge

---

### UC-10: View Cart

| Field              | Description                             |
| ------------------ | --------------------------------------- |
| **Use Case ID**    | UC-10                                   |
| **Use Case Name**  | View Cart                               |
| **Actor**          | Registered User                         |
| **Description**    | User views items in their shopping cart |
| **Preconditions**  | User is logged in                       |
| **Postconditions** | Cart items are displayed                |

**Main Flow:**

1. User clicks "Cart" button in navbar
2. System fetches cart items from Firestore
3. System displays cart items with image, name, price, quantity, subtotal
4. System shows total price

---

### UC-11: Update Cart Quantity

| Field              | Description                              |
| ------------------ | ---------------------------------------- |
| **Use Case ID**    | UC-11                                    |
| **Use Case Name**  | Update Cart Quantity                     |
| **Actor**          | Registered User                          |
| **Description**    | User changes quantity of an item in cart |
| **Preconditions**  | Item exists in cart                      |
| **Postconditions** | Cart quantity is updated                 |

**Main Flow:**

1. User clicks +/- buttons on cart item
2. System updates quantity in Firestore
3. System recalculates subtotal and total

---

### UC-12: Remove Item from Cart

| Field              | Description                    |
| ------------------ | ------------------------------ |
| **Use Case ID**    | UC-12                          |
| **Use Case Name**  | Remove Item from Cart          |
| **Actor**          | Registered User                |
| **Description**    | User removes an item from cart |
| **Preconditions**  | Item exists in cart            |
| **Postconditions** | Item is removed from cart      |

**Main Flow:**

1. User clicks "Remove" button on cart item
2. System deletes item from cart subcollection
3. System refreshes cart display

---

### UC-13: Checkout / Place Order

| Field              | Description                                         |
| ------------------ | --------------------------------------------------- |
| **Use Case ID**    | UC-13                                               |
| **Use Case Name**  | Checkout / Place Order                              |
| **Actor**          | Registered User                                     |
| **Description**    | User completes purchase of cart items               |
| **Preconditions**  | Cart has items, all items have sufficient stock     |
| **Postconditions** | Order is created, stock is reduced, cart is cleared |

**Main Flow:**

1. User clicks "Checkout" button
2. System verifies stock availability for all items
3. System creates order document in `orders` collection
4. System reduces stock for each product using `increment(-quantity)`
5. System clears user's cart
6. System displays success message
7. System redirects to My Orders page

**Alternative Flow:**

- 2a. Insufficient stock → System displays error, prevents checkout

---

### UC-14: View My Orders

| Field              | Description                    |
| ------------------ | ------------------------------ |
| **Use Case ID**    | UC-14                          |
| **Use Case Name**  | View My Orders                 |
| **Actor**          | Registered User                |
| **Description**    | User views their order history |
| **Preconditions**  | User is logged in              |
| **Postconditions** | Orders are displayed           |

**Main Flow:**

1. User navigates to Orders > My Order from sidebar
2. System fetches orders where `userId` matches current user
3. System displays orders sorted by date (newest first)

---

### UC-15: View Order Details

| Field              | Description                            |
| ------------------ | -------------------------------------- |
| **Use Case ID**    | UC-15                                  |
| **Use Case Name**  | View Order Details                     |
| **Actor**          | Registered User                        |
| **Description**    | User views details of a specific order |
| **Preconditions**  | Order exists                           |
| **Postconditions** | Order details are displayed            |

**Main Flow:**

1. User clicks on an order card
2. System displays order items, quantities, prices, and total
3. System shows order date and status

---

### UC-16: View Profile

| Field              | Description                          |
| ------------------ | ------------------------------------ |
| **Use Case ID**    | UC-16                                |
| **Use Case Name**  | View Profile                         |
| **Actor**          | Registered User                      |
| **Description**    | User views their profile information |
| **Preconditions**  | User is logged in                    |
| **Postconditions** | Profile data is displayed            |

**Main Flow:**

1. User clicks "Profile" in sidebar
2. System fetches user data from Firestore `users` collection
3. System displays: First Name, Last Name, Email, Contact, Address, User ID
4. System shows statistics: Total Products, Total Orders, Total Spent

---

### UC-17: Edit Profile

| Field              | Description                            |
| ------------------ | -------------------------------------- |
| **Use Case ID**    | UC-17                                  |
| **Use Case Name**  | Edit Profile                           |
| **Actor**          | Registered User                        |
| **Description**    | User updates their profile information |
| **Preconditions**  | User is logged in                      |
| **Postconditions** | Profile is updated in Firestore        |

**Main Flow:**

1. User clicks "Edit Profile" button
2. System displays editable form with current data
3. User modifies fields (First Name, Last Name, Contact, Address)
4. User clicks "Save Changes"
5. System updates user document in Firestore
6. System displays success message

---

### UC-18: View My Products

| Field              | Description                           |
| ------------------ | ------------------------------------- |
| **Use Case ID**    | UC-18                                 |
| **Use Case Name**  | View My Products                      |
| **Actor**          | Registered User                       |
| **Description**    | User views products they have created |
| **Preconditions**  | User is logged in                     |
| **Postconditions** | User's products are displayed         |

**Main Flow:**

1. User navigates to Profile page
2. System fetches products where `createdBy` matches current user ID
3. System displays user's products in grid layout
4. User can edit or delete their products from this view

---

## System Requirements Summary

### Functional Requirements

| ID    | Requirement                                                     |
| ----- | --------------------------------------------------------------- |
| FR-01 | System shall allow users to register with email and password    |
| FR-02 | System shall authenticate users using Firebase Auth             |
| FR-03 | System shall store user data in Firestore                       |
| FR-04 | System shall allow users to add products with image upload      |
| FR-05 | System shall store product images in Firebase Storage           |
| FR-06 | System shall allow users to edit/delete only their own products |
| FR-07 | System shall maintain a shopping cart per user                  |
| FR-08 | System shall verify stock before checkout                       |
| FR-09 | System shall reduce product stock after successful checkout     |
| FR-10 | System shall maintain order history                             |
| FR-11 | System shall allow users to update their profile                |
| FR-12 | System shall implement protected routes for authenticated users |

### Non-Functional Requirements

| ID     | Requirement                                              |
| ------ | -------------------------------------------------------- |
| NFR-01 | System shall be responsive (mobile, tablet, desktop)     |
| NFR-02 | System shall use secure Firebase authentication          |
| NFR-03 | System shall provide real-time data updates              |
| NFR-04 | System shall have a user-friendly interface              |
| NFR-05 | System shall handle errors gracefully with user feedback |

---

## Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Custom CSS with responsive design
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Routing:** React Router DOM v6
- **Icons:** react-icons

---

_Document created for GreenieCart E-Commerce Application_
_Last updated: November 29, 2025_
