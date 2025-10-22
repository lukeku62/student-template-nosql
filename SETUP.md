# Student Repository Setup Guide

Follow these steps to set up your personal repository for the MongoDB course.

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ pnpm installed
- ✅ Git installed
- ✅ GitHub account created
- ✅ Code editor (VS Code recommended)

## Step 1: Create Your Repository

### Option A: Use GitHub Template (Recommended)

1. Go to the course student-template repository
2. Click "Use this template" button
3. Choose "Create a new repository"
4. Name it: `mongodb-course-[your-name]`
5. Make it **Private** (your personal work)
6. Click "Create repository"

### Option B: Fork and Clone

```bash
# Fork the template repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR-USERNAME/mongodb-course-YOUR-NAME.git
cd mongodb-course-YOUR-NAME
```

## Step 2: Install Dependencies

```bash
# Install Node.js dependencies
npm install
```

This will install:
- MongoDB Node.js driver
- TypeScript
- ESLint and Prettier
- Other development tools

## Step 3: Setup MongoDB Atlas

### Create Atlas Account

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign up for free account
3. Verify your email

### Create a Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select cloud provider and region (choose closest to you)
4. Cluster name: `mongodb-course` (or your preference)
5. Click "Create"
6. Wait 3-5 minutes for cluster to deploy

### Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `student` (or your choice)
5. Password: Generate a secure password (save it!)
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### Whitelist Your IP

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. For learning: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ For production, use specific IPs
4. Click "Confirm"

### Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 5.5 or later
5. Copy the connection string

It looks like:
```
mongodb+srv://student:<password>@cluster.mongodb.net/
```

## Step 4: Configure Environment

### Create .env File

```bash
# Copy the example file
cp .env.example .env
```

### Edit .env File

Open `.env` in your editor and update:

```env
# Replace with your actual connection string
MONGODB_URI=mongodb+srv://student:YOUR_PASSWORD@cluster.mongodb.net/

# Database name for the course
DB_NAME=ecommerce

# Environment
NODE_ENV=development
```

**Important**: Replace `YOUR_PASSWORD` with your actual password!

## Step 5: Test Connection

```bash
npm run test-connection
```

You should see:
```
✅ Successfully connected to MongoDB!
📊 Database: ecommerce
📁 Collections found: 0
💡 No collections yet. They will be created when you insert data.
✨ Connection test successful!
```

If you see errors, check:
- Connection string is correct
- Password is correct (no special characters issues)
- IP address is whitelisted
- Cluster is running

## Step 6: Install MongoDB Compass (Recommended)

### Download and Install

1. Go to [MongoDB Compass Download](https://www.mongodb.com/try/download/compass)
2. Download for your OS
3. Install the application

### Connect to Your Cluster

1. Open MongoDB Compass
2. Paste your connection string
3. Replace `<password>` with your actual password
4. Click "Connect"

You should see your cluster with the `ecommerce` database.

## Step 7: Setup Issue Templates

Your repository should have GitHub issue templates:

1. Go to your repository on GitHub
2. Click "Issues" tab
3. Click "New Issue"
4. You should see templates:
   - Exercise Planning
   - Bug Report
   - Question

If not, copy templates from course repository.

## Step 8: Optional - VS Code Extensions

Install these VS Code extensions for better experience:

1. **MongoDB for VS Code** - Query MongoDB directly from VS Code
2. **ESLint** - Code linting
3. **Prettier** - Code formatting
4. **GitLens** - Git integration

```bash
# Install from VS Code Extensions marketplace
# Or use CLI:
code --install-extension mongodb.mongodb-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
```

## Verify Your Setup

### Checklist

- [ ] Repository created and cloned
- [ ] Dependencies installed (`npm install` successful)
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] `.env` file configured with connection string
- [ ] Connection test successful
- [ ] MongoDB Compass installed and connected
- [ ] Issue templates available

### Test Everything

```bash
# 1. Test connection
npm run test-connection

# 2. Check linting
npm run lint

# 3. Check formatting
npm run format

# 4. Verify TypeScript setup
npx tsc --noEmit
```

All should complete without errors.

## Troubleshooting

### Connection Fails

**Error**: `MongoServerSelectionError`
- **Solution**: Check IP whitelist in Atlas
- **Solution**: Verify connection string format
- **Solution**: Check cluster is running

**Error**: `Authentication failed`
- **Solution**: Verify username and password
- **Solution**: Check password for special characters (URL encode them)
- **Solution**: Ensure user has correct privileges

### npm install Fails

**Error**: `EACCES` permission error
- **Solution**: Don't use `sudo`, fix npm permissions
- **Solution**: Use nvm (Node Version Manager)

**Error**: Package compatibility issues
- **Solution**: Ensure Node.js version is 18+
- **Solution**: Delete `node_modules` and `package-lock.json`, run `npm install` again

### MongoDB Compass Connection Issues

**Issue**: Can't connect
- **Solution**: Same connection string as `.env` file
- **Solution**: Don't forget to replace `<password>`
- **Solution**: Check Atlas cluster is running

## Next Steps

Once setup is complete:

1. Read the course README
2. Review Lesson 01 documentation in course repo
3. Create your first issue for Exercise 01
4. Start learning!

## Getting Help

If you're stuck:

1. Check this troubleshooting section
2. Review Atlas documentation
3. Create a GitHub issue with question template
4. Ask instructor
5. Check with classmates (don't share solutions though!)

## Security Notes

### Do NOT Commit

Never commit these files:
- `.env` (contains credentials)
- `node_modules/` (too large)
- Personal notes in `notes/private/` if you created that

These are already in `.gitignore`.

### Protect Your Credentials

- Never share your MongoDB password
- Never commit connection strings
- Use environment variables
- Make repository private for personal work

## Repository Maintenance

### Regular Commits

Commit often with meaningful messages:

```bash
git add exercises/lesson-01/01-insert-documents.js
git commit -m "Complete lesson 01 exercise 01 - insert documents"
git push
```

### Keep It Organized

- Use the provided directory structure
- Create issues before implementing
- Document your learnings
- Keep notes updated

---

**You're all set! 🎉**

Time to start learning MongoDB. Good luck with the course!

If you have any issues with setup, create a GitHub issue or ask your instructor.

