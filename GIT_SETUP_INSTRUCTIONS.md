# Git Setup Instructions

## Issue
Git was initialized in your home directory instead of the project directory, causing it to track files from your entire user folder.

## Solution

### Option 1: Manual Fix (Recommended)

1. **Open a new terminal/command prompt in the project directory:**
   - Navigate to: `c:\Users\osher\OneDrive\Desktop\ניהול עסק\פרויקטים חדשים\landingpage`

2. **Remove the incorrect git repository from home directory:**
   ```powershell
   Remove-Item -Path "$env:USERPROFILE\.git" -Recurse -Force
   ```

3. **Initialize git in the project directory:**
   ```powershell
   git init
   ```

4. **Add all project files:**
   ```powershell
   git add .
   ```

5. **Create initial commit:**
   ```powershell
   git commit -m "Initial commit: Landing page with articles section and WhatsApp unblock guide"
   ```

6. **Add remote repository (if you have one):**
   ```powershell
   git remote add origin <your-repository-url>
   ```

7. **Push to remote:**
   ```powershell
   git push -u origin master
   ```
   (or `main` if your default branch is main)

### Option 2: Using Git Bash or CMD

If PowerShell continues to have encoding issues, use Git Bash or CMD instead:

1. Open Git Bash or CMD
2. Navigate to the project directory
3. Follow steps 3-7 from Option 1

### Files to Commit

The following files should be committed:
- All files in `src/` directory
- `package.json` and `package-lock.json`
- `vite.config.js`
- `index.html`
- `eslint.config.js`
- `.gitignore`
- `README.md`
- `MAILERLITE_INTEGRATION.md`
- `SMOOVE_INTEGRATION.md`
- All files in `public/` directory

**Note:** `node_modules/` and `dist/` are already in `.gitignore` and will be excluded automatically.
