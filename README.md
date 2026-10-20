# Restaurant Menu & Table Order System

A MERN stack web app where customers order from a digital menu at their table, and staff move each order from the kitchen to billing.

**Student:** Anushka Singh
**Roll Number:** 16
**Problem Statement:** PS6 - Restaurant Menu & Table Order System

## Links

- **GitHub Repository:** https://github.com/anushkasingh-commits/restaurant-order-system
- **Live Frontend:** [add link after deployment]
- **Live Backend:** [add link after deployment]
- **Demo Video:** [add YouTube link after upload]

## Tech Stack

- **Frontend:** React.js (Vite), React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** JWT tokens and bcrypt password hashing

## Features

**Customer**
- Register and log in
- Browse the menu by category
- Search items by name
- Filter veg-only items
- Add items to a cart with quantities
- Place an order for a table
- View "My Orders" and the itemized bill for each order
- Cancel an order while it is still "placed"

**Admin / Staff**
- Log in with the admin role
- Add, edit, and delete menu items, including the available toggle
- Add, edit, and delete tables
- View all orders and filter them by status
- Move orders through the workflow: Placed, Preparing, Served, Paid

**Dashboard (Admin)**
- Today's number of orders
- Today's revenue from paid orders
- Top 5 selling items
- Category-wise sales

## Project Structure

```
restaurant-order-system/
├── backend/
│   ├── config/        database connection
│   ├── controllers/   the logic for each feature
│   ├── middleware/    token check, role check, error handling
│   ├── models/        database schemas (User, MenuItem, Table, Order)
│   ├── routes/        URL paths for each feature
│   ├── scripts/       seed script with sample data
│   └── server.js      starts the app
└── frontend/
    ├── public/
    └── src/           React pages and components
```

## Setup Steps

### 1. Clone the repository

```
git clone https://github.com/anushkasingh-commits/restaurant-order-system.git
cd restaurant-order-system
```

### 2. Run the backend

```
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and fill in your values (see the table below). Then add sample data and start the server:

```
node scripts/seed.js
npm run dev
```

The server runs at `http://localhost:5001`.

### 3. Run the frontend

Open a new terminal:

```
cd frontend
npm install
```

Create a file named `.env` inside `frontend/` containing:

```
VITE_API_URL=http://localhost:5001/api
```

Then start the app:

```
npm run dev
```

Open the address shown in the terminal, usually `http://localhost:5173`.

## Environment Variables

**Backend (`backend/.env`)**

| Variable | Purpose |
|---|---|
| `MONGO_URI` | Connection string for MongoDB Atlas |
| `PORT` | Port the server runs on, for example `5001` |
| `JWT_SECRET` | Secret key used to sign login tokens |

**Frontend (`frontend/.env`)**

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Address of the backend API |

The real `.env` files are never uploaded to GitHub. The `.env.example` file shows which keys are needed.

## Test Logins

The seed script creates these accounts:

| Role | Email | Password |
|---|---|---|
| Admin | admin@example.com | admin123 |
| Customer | customer@example.com | customer123 |

## API Endpoints

| Method | URL | Who can use it | Purpose |
|---|---|---|---|
| GET | /api/health | Anyone | Check that the server is running |
| POST | /api/auth/register | Anyone | Create a customer account |
| POST | /api/auth/login | Anyone | Log in and receive a token |
| GET | /api/menu | Anyone | List available items (supports `category`, `foodType`, `search`) |
| GET | /api/menu/all | Admin | List all items, including unavailable ones |
| GET | /api/menu/:id | Anyone | Get one menu item |
| POST | /api/menu | Admin | Add a menu item |
| PUT | /api/menu/:id | Admin | Edit a menu item |
| DELETE | /api/menu/:id | Admin | Delete a menu item |
| GET | /api/tables | Logged-in users | List tables |
| GET | /api/tables/:id | Logged-in users | Get one table |
| POST | /api/tables | Admin | Add a table |
| PUT | /api/tables/:id | Admin | Edit a table |
| DELETE | /api/tables/:id | Admin | Delete a table |
| POST | /api/orders | Customer | Place an order |
| GET | /api/orders/mine | Customer | List my orders |
| GET | /api/orders | Admin | List all orders (supports `status`) |
| GET | /api/orders/:id | Owner or admin | Get one order with its bill |
| PATCH | /api/orders/:id/cancel | Customer | Cancel an order while it is "placed" |
| PATCH | /api/orders/:id/status | Admin | Move an order to its next status |
| GET | /api/dashboard | Admin | Today's summary numbers |

Protected routes need this header:

```
Authorization: Bearer <token>
```

## Screenshots

[Add at least two screenshots here, for example the customer menu and the admin dashboard.]

## Learning Outcomes

- Building a REST API with Express and organizing it into routes, controllers, and middleware
- Modeling data with Mongoose schemas and validation
- Securing passwords with bcrypt and protecting routes with JWT and role checks
- Connecting a React frontend to a backend through an API layer
- Deploying a backend to Render and a frontend to Vercel