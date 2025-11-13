# 🛫 Multi-Tenant Ticket Booking API

This is a **Node.js + MongoDB + Docker** API that supports **multi-tenant, payload-driven, dynamic ticket booking**.
Each tenant/site has its own tickets and pricing, and the API responds dynamically based on the tenant and the request payload. All operations are done via **POST requests**.

---

## **Features**

* Multi-tenant architecture: Single backend serves multiple clients.
* JWT authentication per tenant.
* Payload-driven booking: ticket type, quantity, and tenant determine the response.
* Ticket availability and dynamic pricing.
* Dockerized API with MongoDB container.
* Fully POST-based endpoints (no GET methods required).

---

## **Tech Stack**

* Node.js + Express
* MongoDB
* JWT for authentication
* Docker & Docker Compose

---

## **Project Structure**

```
multi-tenant-booking/
├─ src/
│  ├─ index.js            # Main server
│  ├─ routes/
│  │  ├─ auth.js          # Login endpoint
│  │  └─ booking.js       # Booking endpoint
│  ├─ middleware/
│  │  └─ auth.js          # JWT validation middleware
│  └─ models/
│     ├─ Tenant.js        # Tenant schema
│     ├─ Ticket.js        # Ticket schema
│     └─ Booking.js       # Booking schema
├─ .env
├─ Dockerfile
├─ docker-compose.yml
└─ package.json
```

---

## **Environment Variables (.env)**

```env
PORT=3000
JWT_SECRET=supersecret
MONGO_URI=mongodb://mongo:27017/booking
```

---

## **Docker Setup**

1. **Build and run containers**

```bash
docker-compose up --build
```

2. Services:

| Service | Description      | Ports       |
| ------- | ---------------- | ----------- |
| api     | Node.js backend  | 3000:3000   |
| mongo   | MongoDB database | 27017:27017 |

3. **Persistent data** stored in Docker volume `mongo_data`.

---

## **MongoDB Initialization (Optional)**

To populate tenants and tickets for testing:

```bash
docker exec -it mongo mongo
```

```javascript
use booking

// Tenants
db.tenants.insertMany([
  { name: "FlyHigh Airlines", key: "tenantA" },
  { name: "BusGo", key: "tenantB" }
])

// Tickets
db.tickets.insertMany([
  { tenantKey: "tenantA", type: "economy", price: 100, available: 50 },
  { tenantKey: "tenantA", type: "business", price: 250, available: 20 },
  { tenantKey: "tenantB", type: "standard", price: 20, available: 100 },
  { tenantKey: "tenantB", type: "luxury", price: 50, available: 30 }
])
```

---

## **API Endpoints**

### 1️⃣ Login

**POST** `/api/auth/login`

**Body:**

```json
{
  "username": "alice",
  "tenant": "tenantA"
}
```

**Response:**

```json
{
  "status": "success",
  "token": "<JWT_TOKEN>"
}
```

* Returns a JWT token to authorize future requests.

---

### 2️⃣ Reserve Tickets

**POST** `/api/booking/reserve`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Body:**

```json
{
  "type": "economy",
  "quantity": 2
}
```

**Response:**

```json
{
  "tenant": "tenantA",
  "ticketType": "economy",
  "quantity": 2,
  "totalPrice": 200,
  "remainingTickets": 48,
  "bookingTime": "2025-11-13T23:50:00Z"
}
```

**Notes:**

* Only ticket types available for the tenant can be booked.
* Quantity must not exceed available tickets.

---

## **Testing Scenarios**

1. **Tenant A books 2 economy tickets** → totalPrice=200, remainingTickets=48
2. **Tenant B books 3 luxury tickets** → totalPrice=150, remainingTickets=27
3. **Tenant A tries to book 25 business tickets (more than available)** → Error: Not enough tickets available

---

## **Key Concepts**

* **Multi-Tenant:** Single backend serves multiple tenants.
* **Payload-Driven:** All responses are determined by POST body and tenant.
* **JWT Authentication:** Each request identifies tenant and user.
* **Dynamic Responses:** Pricing, availability, and validation are calculated per request.

---

## **License**

MIT License
