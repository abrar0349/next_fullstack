# 🎥 Video Uploading Full Stack Project

This is a **Full Stack Video Uploading Application** built with **Next.js** and modern web technologies. The project allows users to securely authenticate, upload videos, and manage their content through a clean and responsive interface.

## 🚀 Technologies Used

### **Next.js**
Used as the main React framework for building both the frontend and backend. It provides server-side rendering, API routes, and excellent performance.

### **ImageKit**
Used for storing, optimizing, and delivering videos and media files efficiently through a CDN. It also helps improve loading speed and media management.

### **MongoDB & Mongoose**
- **MongoDB** is used as the primary database for storing user and video information.
- **Mongoose** is used as an Object Data Modeling (ODM) library to define schemas and interact with the MongoDB database easily.

### **NextAuth.js (Auth.js)**
Used to implement secure user authentication and authorization. It manages user login sessions, protects private routes, and allows only authenticated users to upload or manage videos.

### **bcryptjs**
Used to hash user passwords before storing them in the database, ensuring passwords remain secure and cannot be read in plain text.

## ✨ Features

- 🔐 Secure user authentication and authorization
- 👤 User registration and login
- 🎥 Video uploading with ImageKit
- 📂 Store video metadata in MongoDB
- 🛡️ Password encryption using bcryptjs
- ⚡ Fast performance with Next.js

## 📌 Purpose

The main goal of this project is to demonstrate how to build a secure and scalable full-stack video uploading platform using modern web development technologies. It combines authentication, database management, media storage, and a responsive frontend into a single application.