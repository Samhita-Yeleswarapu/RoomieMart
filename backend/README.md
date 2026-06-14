# RoomieMart — Backend

## Backend
### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Multer
- Socket.IO
- dotenv
- cookie-parser
- CORS

---

# Project Structure
```bash
backend
│
├── config
│   ├── cloudinary.js
│   ├── db.js
│
├── controllers
│   ├── aiController.js
│   ├── chatController.js
│   ├── demandController.js
│   ├── notificationController.js
│   ├── productController.js
│   ├── rentalController.js
│   ├── reportController.js
│   ├── reviewController.js
│   ├── userController.js
│   └── wishlistController.js
│
├── middleware
│   ├── isAdmin.js
│   ├── uploadMiddleware.js
│   └── verifyToken.js
│
├── models
│   ├── ChatMessageModel.js
│   ├── ChatModel.js
│   ├── DemandModel.js
│   ├── NotificationModel.js
│   ├── PriceSuggestionModel.js
│   ├── ProductModel.js
│   ├── RentalModel.js
│   ├── ReportModel.js
│   ├── ReviewModel.js
│   └── UserModel.js
│
├── routes
│   ├── aiRoutes.js
│   ├── chatRoutes.js
│   ├── demandRoutes.js
│   ├── notificationRoutes.js
│   ├── productRoutes.js
│   ├── rentalRoutes.js
│   ├── reportRoutes.js
│   ├── reviewRoutes.js
│   ├── userRoutes.js
│   └── wishlistRoutes.js
│
├── services
│   ├── aiDescriptionService.js
│   ├── aiPriceService.js
│   └── aiScamDetectionService.js
│
├── sockets
│   └── socketServer.js
│
├── uploads
├── package.json
├── server.js
└── README.md
```

---

# Installation Steps

## Step 1: Install Dependencies
```bash
npm install express mongoose mongodb cloudinary multer dotenv cookie-parser jsonwebtoken cors socket.io google-auth-library
```

---

## Step 2: Create `.env` File
```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Step 3: Setup Cloudinary
```bash
https://cloudinary.com/
```
- Login or create an account on Cloudinary
- Create a new project
- Copy:
  - Cloud Name
  - API Key
  - API Secret
- Paste them into your `.env` file

---

## Step 4: Start the Server
```bash
node server.js
```

---

# Deployment

## Use Render for Backend Deployment

### Steps To Deploy

#### Step 1: Push Project to GitHub
```bash
git add .
git commit -m "Initial Commit"
git push origin main
```

---

#### Step 2: Connect GitHub to Render
- Login to Render
- Click on **New Web Service**
- Connect GitHub
- Select your project repository

---

#### Step 3: Configure Render
- Root Directory: `backend`
- Instance Type: `Free`

Build Command:
```bash
npm install
```

Start Command:
```bash
node server.js
```

---

#### Step 4: Deploy
Click on **Deploy Web Service**
