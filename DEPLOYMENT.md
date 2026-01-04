# 🚀 Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All sensitive data removed from code
- [ ] Environment variables properly configured
- [ ] .gitignore includes .env, node_modules, .next
- [ ] README.md updated with deployment instructions
- [ ] All dependencies listed in package.json

### ✅ Database Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with proper permissions
- [ ] IP whitelist configured (0.0.0.0/0 for production)
- [ ] Connection string obtained and tested

### ✅ Email Configuration
- [ ] Gmail 2FA enabled
- [ ] App password generated
- [ ] Email credentials tested

## Deployment Steps

### 1. GitHub Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "🚀 Ready for production deployment"
git push origin main
```

### 2. Backend Deployment (Render)

#### Create Web Service
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure service:
   - **Name**: `resume-nati-backend`
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`

#### Environment Variables
Set these in Render dashboard:
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### 3. Frontend Deployment (Vercel)

#### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Environment Variables
Set in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com
```

## Post-Deployment Verification

### ✅ Backend Health Check
- [ ] Backend service is running
- [ ] API endpoints respond correctly
- [ ] Database connection established
- [ ] File uploads working
- [ ] Email sending functional

### ✅ Frontend Verification
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] API calls working
- [ ] Admin dashboard functional
- [ ] Contact form submitting

### ✅ Integration Testing
- [ ] Frontend connects to backend
- [ ] Admin login works
- [ ] File uploads successful
- [ ] Email notifications sent
- [ ] Database operations working

## Troubleshooting

### Common Issues

#### Backend Not Starting
- Check environment variables are set
- Verify MongoDB connection string
- Check build logs in Render dashboard

#### Frontend API Errors
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS configuration in backend
- Ensure backend is deployed and running

#### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has proper permissions

#### Email Not Working
- Verify Gmail app password is correct
- Check 2FA is enabled on Google account
- Test email credentials locally first

## Performance Optimization

### Backend Optimizations
- [ ] Enable gzip compression
- [ ] Set up proper caching headers
- [ ] Optimize database queries
- [ ] Add request rate limiting

### Frontend Optimizations
- [ ] Enable Next.js image optimization
- [ ] Implement proper caching strategies
- [ ] Optimize bundle size
- [ ] Add performance monitoring

## Security Checklist

### ✅ Production Security
- [ ] All environment variables secured
- [ ] No sensitive data in code
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] File upload restrictions in place
- [ ] Admin authentication secured

## Monitoring & Maintenance

### ✅ Post-Launch
- [ ] Set up error monitoring
- [ ] Configure uptime monitoring
- [ ] Plan regular backups
- [ ] Document update procedures
- [ ] Set up analytics tracking

---

## Quick Commands Reference

### Local Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend
npm run dev
```

### Production Build Test
```bash
# Test backend production
cd backend && npm start

# Test frontend build
npm run build && npm start
```

### Git Commands
```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main
```

---

🎉 **Congratulations!** Your portfolio is now live and professional!