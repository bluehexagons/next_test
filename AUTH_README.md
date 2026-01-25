# Authentication & Database Setup

This Next.js application now includes a complete authentication system with SQLite database.

## Stack

- **Database**: SQLite with Drizzle ORM
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Password Hashing**: bcrypt
- **Validation**: Zod

## Features

✅ User registration with email/password  
✅ Secure login system  
✅ Protected routes with middleware  
✅ Session management  
✅ Type-safe database queries  
✅ Automatic TypeScript type inference  

## Getting Started

### 1. Install Dependencies

Already installed! Run `npm install` if needed.

### 2. Environment Variables

The `.env.local` file has been created with development defaults.

**For production**, generate a secure secret:
```bash
openssl rand -base64 32
```

Then update `AUTH_SECRET` in your `.env.local` or production environment.

### 3. Database Setup

The database has been initialized with:
```bash
npm run db:generate  # Generate migrations
npm run db:migrate   # Apply migrations
```

Database file: `sqlite.db` (git-ignored)

### 4. Start Development Server

```bash
npm run dev
```

## Usage

### Register a New User

1. Visit [http://localhost:3000/auth/register](http://localhost:3000/auth/register)
2. Enter email and password (min 6 characters)
3. Click "Create account"

### Login

1. Visit [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. Enter your credentials
3. You'll be redirected to the dashboard

### Protected Routes

Any route starting with `/dashboard` requires authentication. The middleware automatically redirects unauthenticated users to the login page.

## File Structure

```
/drizzle
  /migrations        # Auto-generated SQL migrations
  schema.ts          # Database schema definitions
  db.ts             # Database connection
/app
  /actions
    auth.ts         # Server actions for register/login
  /auth
    /login          # Login page
    /register       # Register page
  /dashboard        # Protected dashboard (example)
  /api/auth/[...nextauth]  # NextAuth API route
auth.ts             # NextAuth configuration
middleware.ts       # Route protection middleware
drizzle.config.ts   # Drizzle ORM configuration
```

## Database Commands

```bash
npm run db:generate   # Generate migration from schema changes
npm run db:migrate    # Apply migrations to database
npm run db:studio     # Open Drizzle Studio (database GUI)
```

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add OAuth providers (Google, GitHub, etc.)
- [ ] Create user profile management
- [ ] Add role-based access control
- [ ] Implement 2FA

## Security Notes

- Passwords are hashed with bcrypt (10 rounds)
- Sessions are JWT-based
- CSRF protection included in NextAuth
- Input validation with Zod
- SQL injection protection via Drizzle ORM
- Environment variables for secrets

## Troubleshooting

**Can't access protected routes?**  
- Make sure you're logged in
- Check that `.env.local` exists with `AUTH_SECRET`

**Database errors?**  
- Run `npm run db:migrate` to ensure database is initialized
- Check that `sqlite.db` file was created

**Login not working?**  
- Verify the user exists (register first)
- Check password is at least 6 characters
- Look at server console for error messages
