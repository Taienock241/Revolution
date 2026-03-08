# Website Photos Ecommerce

A full ecommerce website built with React, TypeScript, Vite, and Firebase. This site allows users to browse and purchase website design templates and photos.

## Features

- User authentication (login/register)
- Product catalog with photos of website designs
- Shopping cart functionality
- Checkout process
- Firebase Firestore database
- Responsive design

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Get your Firebase config from Project Settings > General > Your apps > Web app

### 2. Update Firebase Config

Edit `src/firebase.ts` and replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Seed Sample Data

1. Start the development server: `npm run dev`
2. Open the app in your browser
3. Click the "Seed Sample Data (Dev Only)" button on the home page to add sample products

### 5. Run the Application

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/context/` - React contexts for state management
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `src/firebase.ts` - Firebase configuration

## Technologies Used

- React 19
- TypeScript
- Vite
- Firebase (Auth, Firestore)
- React Router DOM

## Future Enhancements

- Payment integration (Stripe, PayPal)
- Product image upload to Firebase Storage
- User profiles and order history
- Admin panel for managing products
- Search and filtering
- Reviews and ratings
