# Steamify (Vibely) - Video Calling and Chat Application

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
   - Backend API will be available at `http://localhost:5001`

## ⚙️ Environment Variables

Set the following environment variables (Render Dashboard or local `.env` files). Only include quotes if the value contains spaces.

### Backend (`backend/.env`)

```
PORT=5001
NODE_ENV=development

# Database
MONGOURI=your_mongodb_uri
# or
MONGODB_URI=your_mongodb_uri

# Auth
JWT_SECRET_KEY=your_jwt_secret

# Stream (Chat/Video)
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# CORS
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:5001/api
```

Notes:
- The backend now defaults to `PORT=5001` if not provided.
- The database connector accepts `MONGOURI` or `MONGODB_URI`.
- CORS is dynamic and uses `CLIENT_URL`; cookies are configured to work behind proxies.

## 🚢 Deploying to Render

You can deploy as a single service (backend serves the built frontend) or as two services (separate static frontend and Node backend).

### Option A: Single Web Service (simplest)

- Root Build Command:
  ```bash
  npm run build
  ```
- Start Command:
  ```bash
  npm run start
  ```
- Set env vars on Render Web Service:
  - `NODE_ENV=production`
  - `MONGOURI` or `MONGODB_URI`
  - `JWT_SECRET_KEY`
  - `STREAM_API_KEY`, `STREAM_API_SECRET`
  - `CLIENT_URL` = your Render service URL (Render provides `RENDER_EXTERNAL_URL` which you can use)

The backend serves `frontend/dist` automatically in production.

### Option B: Two Services (Static Frontend + Web Backend)

Backend (Web Service):
- Build Command: `npm ci --prefix backend`
- Start Command: `npm run start --prefix backend`
- Env vars: same as above; `CLIENT_URL` should be the frontend’s URL.

Frontend (Static Site):
- Build Command: `npm ci --prefix frontend && npm run build --prefix frontend`
- Publish Directory: `frontend/dist`
- Env vars:
  - `VITE_API_URL=https://your-backend.onrender.com/api`

Optional: Add a `render.yaml` Blueprint at the repo root to codify this setup.

## 📝 Project Structure

```
Steamify/
├── backend/            # Backend server code
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # Database models
│   │   └── lib/         # DB/third-party clients
│   └── package.json
├── frontend/           # Frontend React application
│   ├── public/         # Static files
│   └── src/            # React source code
│       ├── components/  # Reusable components
│       ├── hooks/       # Custom React hooks
│       ├── pages/       # Page components
│       └── lib/         # API/axios utilities
├── package.json        # Root scripts for multi-app management
└── README.md           # This file
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
