## 📌 Overview:

Welcome to the **Wisesight Architecture Design Challenge**!

This challenge is designed to **assess your ability to design scalable architecture**.

What we are really interested in is:  
✅ **Your thought process**—how you analyze and approach the problem.  
✅ **Your decision-making**—which tools, patterns, or styles you choose.  
✅ **Your trade-off analysis**—why you picked this approach over others.

This challenge will give us insight into **how you structure, refactor, and adapt** an API with real-world constraints.

## 🔥 What You'll Be Doing:

You will be working with a simplified e-commerce API that needs architectural improvement. While this is a simplified
version, imagine this system scaling to:

- 5000+ API routes
- Multiple development teams (3+ teams) working independently:
  - User Registration Team (Authentication, User Management)
  - Product Team (Catalog, Inventory, Pricing)
  - Order Team (Cart, Checkout, Order Management)
- High traffic load (millions of requests per day)
- Frequent deployments from different teams

Your task is to ✨**refactor**✨ the API considering these scale factors:

- Make the API more scalable, testable, and modular
- Design the architecture to support independent team development
- Implement clear boundaries between different domains
- Ensure the system can be easily extended with new features
- Improve the code readability and maintainability
- Consider how to handle cross-cutting concerns across teams

## 📌 System Context

This API represents an enterprise e-commerce platform that will be:

- Managed by multiple independent teams
- Deployed independently (microservices/modular monolith)
- Handling high-volume traffic
- Requiring different scaling needs per domain

Each team should be able to:

- Deploy their changes independently
- Scale their services based on their specific needs
- Maintain their own database schemas
- Implement domain-specific business logic
- Handle cross-cutting concerns effectively

## 📌 API Endpoints

### 🛠 User Routes (Managed by User Registration Team)

Users **register** and can later view their **past orders**.

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | /users/register   | Register a new user |
| GET    | /users/:id/orders | Get user orders     |

📌 Example Flow:  
1️⃣ User registers → `POST /users/register`  
2️⃣ User places an order → `POST /orders`  
3️⃣ User checks their order history → `POST /users/:id/orders`

### 🛒 Product Routes (Managed by Product Team)

Products represent the **items available for sale**.

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| GET    | /products | Get all products |

📌 Example Flow:  
1️⃣ User browses products → `GET /products`

### 📦 Order Routes (Managed by Order Team)

Orders **handle the purchasing process**.

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | /orders     | Place an order    |
| POST   | /orders/:id | Get order details |

📌 Example Flow:  
1️⃣ User selects a product  
2️⃣ User places an order → `POST /orders` (to simplify this, we allow users to order with one product at a time)  
3️⃣ User receives an order summary → `POST /orders/:id`

💡 Feel free to use AI, automation, or any tools that help you. We care about the final architecture and your
decision-making, not how you get there.

## 🚀 Submission Guidelines

1️⃣ Fork the repository
[See fork instructions](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)  
2️⃣
Refactor the API  
3️⃣ Commit and push your changes  
4️⃣ Open a Pull Request (PR) to the main branch
[See how to create a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## 📌 Next Steps

In the next interview session, we will discuss your decisions and review your code together.

Be prepared to discuss:

🔹 Explain your reasoning behind architectural choices.  
🔹 Answer follow-up questions about trade-offs and scalability.  
🔹 Discuss how you would adapt the architecture for different scenarios.

## 🚀 Project Setup Instructions

### 1️⃣ Install Dependencies

```sh
npm install
```

### 2️⃣ Start the Server

```sh
npm dev
```
