# 🚀 Nati's Portfolio - Full Stack Developer

A modern, responsive portfolio website built with Next.js 15 and Express.js, featuring an admin dashboard for content management.

## ✨ Features

### Frontend
- **Modern Design**: Clean, professional UI with dark/light theme support
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Elements**: Smooth animations and transitions
- **Portfolio Showcase**: Dynamic project gallery with detailed views
- **Contact Form**: Direct messaging system with email notifications
- **Certificate Display**: Professional certifications and achievements

### Backend & Admin
- **Admin Dashboard**: Complete content management system
- **Authentication**: Secure admin login system
- **File Upload**: Image and document management
- **Database Integration**: MongoDB for data persistence
- **RESTful API**: Clean API endpoints for all operations
- **Real-time Updates**: Live content updates without page refresh

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **D3.js** - Advanced data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-nati.git
   cd resume-nati
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp backend/.env.example backend/.env
   ```
   
   Edit `backend/.env` with your configuration:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

5. **Start Development Servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Dashboard: http://localhost:3000/admin/login

## 📁 Project Structure

```
resume-nati/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── backend/               # Express.js backend
│   ├── models/           # MongoDB models
│   ├── uploads/          # File uploads
│   ├── server.js         # Main server file
│   └── .env.example      # Environment template
├── components/           # React components
│   ├── sections/        # Page sections
│   ├── ui/              # UI components
│   └── navigation.tsx   # Navigation component
├── public/              # Static assets
└── README.md           # Project documentation
```

## 🔧 Configuration

### MongoDB Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file

### Email Configuration
1. Enable 2-factor authentication on Gmail
2. Generate an app password
3. Add credentials to `.env` file

## 🚀 Quick Deployment

**Ready to go live in 30 minutes!** 

### Option 1: One-Click Deploy (Recommended)
1. **Push to GitHub**: `git push origin main`
2. **Deploy Backend**: [Deploy to Render](https://render.com) - See `QUICK-DEPLOY.md`
3. **Deploy Frontend**: [Deploy to Vercel](https://vercel.com) - Connect GitHub repo
4. **Setup Database**: [MongoDB Atlas](https://mongodb.com/atlas) - Free tier
5. **Go Live**: Your portfolio is ready! 🎉

### Option 2: Detailed Guide
Follow the complete step-by-step guide in `DEPLOYMENT-STEPS.md` for detailed instructions.

### 🔗 After Deployment
- **Portfolio**: `https://your-project.vercel.app`
- **Admin Panel**: `https://your-project.vercel.app/admin/login`
- **API**: `https://your-backend.onrender.com`

## 🚀 Deployment

### Option 1: Deploy to Render (Recommended)

#### Backend Deployment
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `resume-nati-backend`
     - **Environment**: `Node`
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Instance Type**: Free

4. **Set Environment Variables** (in Render dashboard):
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=your_mongodb_atlas_connection_string
   MONGODB_URI=your_mongodb_atlas_connection_string
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

#### Frontend Deployment
1. **Deploy to Vercel** (Recommended for Next.js)
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
     ```

2. **Alternative: Deploy to Render**
   - Click "New +" → "Static Site"
   - Connect repository
   - Configure:
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `.next`

### Option 2: Deploy to Railway/Heroku

#### Railway Deployment
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Deploy backend and frontend separately
4. Set environment variables in Railway dashboard

### MongoDB Atlas Setup
1. **Create Account**: Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create Cluster**: Choose free tier
3. **Create Database User**: Add username/password
4. **Whitelist IP**: Add `0.0.0.0/0` for all IPs (or specific IPs)
5. **Get Connection String**: Copy the connection URI
6. **Update Environment**: Add to your deployment platform

### Gmail App Password Setup
1. **Enable 2FA**: On your Google account
2. **Generate App Password**: 
   - Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
3. **Use App Password**: Use this 16-character password in EMAIL_PASS

## 🔧 Production Configuration

## 📊 Admin Features

- **Dashboard Overview**: Analytics and quick stats
- **Project Management**: Add, edit, delete portfolio projects
- **Message Management**: View and respond to contact messages
- **Certificate Management**: Upload and manage certifications
- **Settings**: Update profile information and preferences

## 🔒 Security Features

- Environment variable protection
- Secure admin authentication
- File upload validation
- CORS configuration
- Input sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nati** - Full Stack Developer
- Portfolio: [Your Live Site URL]
- Email: nahiionly@gmail.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database solution
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**