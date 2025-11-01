# GitHub Setup Instructions

## Before Pushing to GitHub

### 1. Check your .gitignore
Make sure `.gitignore` is in the root directory and includes:
- `node_modules/`
- `.env` files
- `*.sqlite` database files
- Build outputs

### 2. Create .env.example files

**Backend** (`backend/.env.example`):
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Frontend** (`frontend/.env.example`):
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: RichMind Journal - Financial mindset development platform"
```

### 4. Create GitHub Repository

1. Go to GitHub.com
2. Click "New repository"
3. Name it: `richmind-journal` (or your preferred name)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### 5. Connect and Push

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/richmind-journal.git

# Rename main branch if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

### 6. Add Repository Description (on GitHub)

Copy this as your repository description:
```
Personal development website inspired by Rich Dad Poor Dad. Build a strong financial mindset with daily journaling, habit tracking, and vision board. Features dark mode and multi-language support (EN/FR/AR/ES).
```

### 7. Add Topics/Tags (on GitHub)

Add these topics:
- `react`
- `express`
- `financial-education`
- `personal-development`
- `dark-mode`
- `multi-language`
- `journaling`
- `habit-tracking`

## Important Notes

✅ **DO NOT commit:**
- `.env` files (these contain secrets)
- `database.sqlite` files
- `node_modules/` folders

✅ **DO commit:**
- All source code
- `.env.example` files
- `README.md`
- `.gitignore`
- `package.json` files

## License

The project uses ISC license. You can change this if you prefer MIT, Apache, etc.

## Repository Structure

Your repository should look like:
```
richmind-journal/
├── .gitignore ✅
├── README.md ✅
├── GITHUB_SETUP.md ✅ (this file, optional to keep)
├── backend/
│   ├── .env.example ✅ (create this)
│   ├── package.json ✅
│   ├── server.js ✅
│   └── ... (all other files)
└── frontend/
    ├── .env.example ✅ (create this)
    ├── package.json ✅
    └── ... (all other files)
```

