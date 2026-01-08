# Renewable Energy Events Platform

A full-stack web application for discovering and managing renewable energy events. Users can browse events by industry and type, while admins can add and manage events and newsletter subscribers.

## Tech Stack

### Frontend
- React 19 with Vite
- React Router for navigation
- Plain CSS for styling
- JWT for authentication

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for auth
- bcrypt for password hashing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Danish-Official/Mercom-Test.git
   cd renewable-events-platform
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

## Environment Setup

### Backend (.env in server/)
```env
MONGO_URI=mongodb://localhost:27017/renewable-events
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

### Frontend (.env in client/)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## Database Setup

1. **Local MongoDB**
   - Install MongoDB Community Server
   - Start MongoDB service
   - Database will auto-create on first run

2. **MongoDB Atlas**
   - Create cluster on MongoDB Atlas
   - Update `MONGO_URI` in server/.env with connection string
   - Whitelist your IP in Atlas network access

## Running the Application

1. **Start Backend**
   ```bash
   cd server
   npm start
   ```
   Server runs on http://localhost:5000

2. **Start Frontend**
   ```bash
   cd client
   npm run dev
   ```
   App runs on http://localhost:5173

## User Roles

- **Normal User**: Browse events, subscribe to newsletter
- **Admin**: All user permissions + add/manage events, manage subscribers

To make a user admin, update their `role` field to `'admin'` in MongoDB.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (owner/admin)
- `DELETE /api/events/:id` - Delete event (owner/admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/subscribers` - Get subscribers (admin only)
- `DELETE /api/newsletter/subscribers/:id` - Remove subscriber (admin only)

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── ...
├── server/                 # Node.js backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── ...
└── SOW.md                  # Scope of Work
```

## Development Notes

- Frontend uses Vite for fast development
- Backend uses nodemon for auto-restart
- JWT tokens are stored in localStorage
- All API calls include Authorization header for protected routes
- Passwords are hashed with bcrypt
- Events include creator reference for ownership

## Deployment

### Backend
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure proper CORS origins

### Frontend
- Build with `npm run build`
- Serve static files from `dist/`
- Update `VITE_API_BASE_URL` to production backend URL

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

This project is licensed under the MIT License.