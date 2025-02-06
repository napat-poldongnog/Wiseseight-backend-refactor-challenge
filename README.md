## 📌 Overview:

Welcome to the **Wisesight Architecture Design Challenge**!

This challenge is designed to **assess your ability to design architecture**.

What we are really interested in is:  
✅ **Your thought process**—how you analyze and approach the problem.  
✅ **Your decision-making**—which tools, patterns, or styles you choose.  
✅ **Your trade-off analysis**—why you picked this approach over others.

This challenge will give us insight into **how you structure, refactor, and adapt** an API with real-world constraints.

## 🔥 What You'll Be Doing:

You will be working with a simplified e-commerce API that needs architectural improvement.

Your task is to ✨**refactor**✨ the API:

- Make the API more scalable, testable, and modular.
- Improve the code readability and maintainability.

## 📌 How These Routes Work in a Commercial Platform

This API represents a basic e-commerce platform, where users can:  
✅ Register an account  
✅ Browse products  
✅ Place orders  
✅ View their past orders

Each route plays a specific role in simulating a real-world e-commerce flow.

## 📌 API Endpoints

### 🛠 User Routes

Users **register** and can later view their **past orders**.

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | /users/register   | Register a new user |
| GET    | /users/:id/orders | Get user orders     |

📌 Example Flow:  
1️⃣ User registers → `POST /users/register`  
2️⃣ User places an order → `POST /orders`  
3️⃣ User checks their order history → `POST /users/:id/orders`

### 🛒 Product

Products represent the **items available for sale**.

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| GET    | /products | Get all products |

📌 Example Flow:  
1️⃣ User browses products → `GET /products`

### 📦 Order

Orders **handle the purchasing process**.

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | /orders     | Place an order    |
| POST   | /orders/:id | Get order details |

📌 Example Flow:  
1️⃣ User selects a product  
2️⃣ User places an order → `POST /orders` (to simplify this, we allow users to order with one product at a time)
3️⃣ User receives an order summary → `POST /orders/:id`

💡 Feel free to use AI, automation, or any tools that help you.
We care about the final architecture and your decision-making, not how you get there.

## 🚀 Submission Guidelines

1️⃣ Fork the repository [See fork instructions](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)  
2️⃣ Refactor the API
3️⃣ Commit and push your changes  
4️⃣ Open a Pull Request (PR) to the main branch [See how to create a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## 📌 Next Steps

In the next interview session, we will discuss your decisions and review your code together.

Be prepared to:

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
