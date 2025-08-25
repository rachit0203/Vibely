# Steamify - Video Calling and Chat Application

Steamify is a full-stack video calling and chat application built with modern web technologies. It allows users to make video calls and chat in real-time with a clean and intuitive user interface.

## 🌟 Features

- 🔥 Real-time video calling with Stream Video SDK
- 💬 Group and private chat with Stream Chat SDK
- � User authentication using JWT
- 🎨 Modern and responsive UI with Tailwind CSS
- 🚀 Built with React 19, Vite, and Node.js
- 📱 Mobile-friendly design
- ⚡ Optimized performance with React Query
- 🔄 State management with Zustand

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
- Axios

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- WebRTC (via Stream SDK)
- Cookie Parser
- CORS
- Environment-based configuration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB instance
- Stream account with API keys for Video and Chat SDKs

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rachit0203/Steamify.git
   cd Steamify
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

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both `backend` and `frontend` directories
   - Update the environment variables with your Stream API keys and other configurations

4. **Start the application**
   ```bash
   # Start backend server (from project root)
   cd backend
   npm run dev
   
   # In a new terminal, start frontend development server
   cd frontend
   npm run dev
   ```

5. **Open in browser**
   - Frontend will be available at `http://localhost:5173`
   - Backend API will be available at `http://localhost:4000`

## 📝 Project Structure

```
Steamify/
├── backend/           # Backend server code
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/ # Custom middleware
│   │   └── models/    # Database models
│   └── package.json
├── frontend/         # Frontend React application
│   ├── public/       # Static files
│   └── src/          # React source code
│       ├── components/ # Reusable components
│       ├── hooks/     # Custom React hooks
│       ├── pages/     # Page components
│       └── utils/     # Utility functions
├── .env.example      # Example environment variables
└── README.md         # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stream for their amazing Video and Chat SDKs
- All contributors who have helped with this project
