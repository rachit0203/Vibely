# Streamify - Video Calling and Chat Application

Streamify is a full-stack video calling and chat application built with modern web technologies. It allows users to make video calls and chat in real-time with a clean and intuitive user interface.

## 🌟 Features

- 🔥 Real-time video calling
- 💬 Group and private chat
- 👥 User authentication and authorization
- 🎨 Modern and responsive UI
- 🚀 Built with React, Node.js, and MongoDB
- 📱 Mobile-friendly design

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Stream Video SDK
- Stream Chat SDK
- React Query
- Zustand
- Tailwind CSS with DaisyUI
- React Router

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.io (for real-time features)
- Cookie Parser
- CORS

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB instance
- Stream account (for video and chat SDKs)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Streamify.git
   cd Streamify
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STREAM_API_KEY=your_stream_api_key
   STREAM_SECRET=your_stream_secret
   ```

   Create a `.env` file in the `frontend` directory with:
   ```env
   VITE_API_BASE_URL=http://localhost:5001
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
# Build the frontend for production
cd frontend
npm run build

# The production build will be in the `frontend/dist` directory
```

## 🌐 Deployment

The application can be deployed to platforms like:
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stream for their amazing video and chat SDKs
- The open-source community for various libraries and tools

## 📬 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/your-username/Streamify](https://github.com/your-username/Streamify)
