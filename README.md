# Master Gym Backend API

## Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update `.env` file with your MongoDB URI
3. Install dependencies:
```bash
npm install
```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/master_gym
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get single member
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Trainers
- `GET /api/trainers` - Get all trainers
- `GET /api/trainers/:id` - Get single trainer
- `POST /api/trainers` - Create trainer
- `PUT /api/trainers/:id` - Update trainer
- `DELETE /api/trainers/:id` - Delete trainer

### Memberships
- `GET /api/memberships` - Get all memberships
- `POST /api/memberships` - Create membership
- `PUT /api/memberships/:id` - Update membership
- `DELETE /api/memberships/:id` - Delete membership

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Admin (Protected - Admin Only)
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/members` - Get all members
- `GET /api/admin/trainers` - Get all trainers

## Default Admin Credentials

After seeding:
- Email: `admin@mastergym.com`
- Password: `admin123`

## Database Models

- **User**: Authentication & authorization
- **Member**: Gym members with membership plans
- **Trainer**: Fitness trainers and their specialties
- **Membership**: Membership plans (Basic, Premium, Elite)
- **Service**: Gym services offered

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing
