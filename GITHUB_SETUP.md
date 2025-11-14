# 🚀 GitHub Repository Setup Guide

## ✅ Git Repository Initialized!

Your project is now ready to be pushed to GitHub. Follow these steps:

## 📋 Step-by-Step Instructions:

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `CropGuardAI-Project`
   - **Description**: `AI-powered crop disease detection mobile app built with React Native and Expo`
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to your project
cd C:\Users\NANDINI\Downloads\farm-scan-insight-main

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/CropGuardAI-Project.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### Step 3: Verify Upload

1. Go to your GitHub repository page
2. You should see all your project files
3. The README.md will be displayed on the main page

## 🔐 Authentication

If you're asked for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` permissions
  - Use this token as your password

## 👥 Sharing with Teammates

### Option 1: Add Collaborators
1. Go to your repository on GitHub
2. Click **Settings** → **Collaborators**
3. Click **"Add people"**
4. Enter their GitHub usernames or emails
5. They'll receive an invitation

### Option 2: Make Repository Public
1. Go to **Settings** → **General**
2. Scroll to **"Danger Zone"**
3. Click **"Change visibility"** → **"Make public"**
4. Anyone with the link can view it

### Option 3: Share Repository Link
- Public repo: Share the repository URL
- Private repo: Collaborators need to be added first

## 📝 Repository Contents

Your repository includes:
- ✅ All source code
- ✅ Configuration files (package.json, app.json, etc.)
- ✅ README.md with project documentation
- ✅ .gitignore (excludes node_modules, .expo, etc.)
- ✅ All project assets

## 🎯 Next Steps for Teammates

After cloning, teammates should:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/CropGuardAI-Project.git
cd CropGuardAI-Project

# Install dependencies
npm install --legacy-peer-deps

# Start the app
npm start
```

## ✨ Your Repository is Ready!

All files are committed and ready to push. Just follow Step 2 above to connect to GitHub!

