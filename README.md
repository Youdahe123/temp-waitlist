# Waitlist Application

This is a waitlist application with Vercel serverless functions and MongoDB database.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier is available)
4. Create a database user with password
5. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
6. Click "Connect" → "Connect your application"
7. Copy the connection string
8. Replace `<password>` with your database user password
9. Replace `<database>` with `waitlist`

### 3. Configure Environment Variables

1. Create a `.env.local` file for local development:
```bash
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/waitlist?retryWrites=true&w=majority"
```

2. Add the same environment variable to your Vercel project:
   - Go to Vercel dashboard → Your Project → Settings → Environment Variables
   - Add `MONGODB_URI` with your MongoDB connection string

### 4. Deploy to Vercel

```bash
vercel
```

Or push to your GitHub repository and connect it to Vercel for automatic deployments.

### 5. Local Development (Optional)

To test locally:

```bash
# Install Vercel CLI globally if you haven't
npm install -g vercel

# Run local development server
vercel dev
```

Note: You'll need to link your local project to Vercel:
```bash
vercel link
```

## API Endpoints

### POST /api/submit-waitlist

Submits a new entry to the waitlist.

**Request Body:**
```json
{
  "email": "user@example.com",
  "fullname": "John Doe",
  "position": "Student"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "fullname": "John Doe",
    "position": "Student",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (Duplicate Email):**
```json
{
  "error": "Email already exists"
}
```

## Database Structure

**Database:** `waitlist`

**Collection:** `submissions`

**Document Schema:**
```javascript
{
  "_id": ObjectId,           // MongoDB auto-generated ID
  "email": String,           // User's email address
  "fullname": String,        // User's full name
  "position": String,        // User's position (Student/Teacher/Parent)
  "created_at": Date         // Timestamp when entry was created
}
```

The collection automatically prevents duplicate emails.

## Environment Variables

Required environment variable:

- `MONGODB_URI` - MongoDB connection string from MongoDB Atlas

Example format:
```
mongodb+srv://username:password@cluster.mongodb.net/waitlist?retryWrites=true&w=majority
```
