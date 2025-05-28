# Pizzeria UI GitHub Pages Deployment Instructions

Follow these steps to deploy your Pizzeria UI application to GitHub Pages:

## 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" button in the top-right corner and select "New repository"
3. Name your repository "pizza"
4. Make it Public (required for free GitHub Pages)
5. Click "Create repository"

## 2. Update Your Local Git Remote

Replace the placeholder remote URL with your actual GitHub repository URL:

```powershell
cd C:\Users\RAD\Desktop\Projects\ai-proj-2\ui
git remote set-url origin https://github.com/thundelag/pizza.git
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## 3. Push Your Code to GitHub

```powershell
git push -u origin main
```

## 4. Deploy to GitHub Pages

There are two ways to deploy:

### Option 1: Use the Deployment Script

Run the deployment script we created:

```powershell
.\deploy-to-github.bat
```

### Option 2: Manual Deployment

```powershell
npm run build:prod
npm run deploy
```

## 5. Access Your Deployed Application

Your application will be available at:
```
https://YOUR-USERNAME.github.io/pizzeria-ui/
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## 6. Future Updates

When you make changes to your code:

1. Commit your changes locally
2. Push to GitHub: `git push origin main`
3. Run the deployment script again

## Deployment with GitHub Actions (Automatic)

The GitHub Actions workflow we set up will automatically deploy your application whenever you push to the main branch. Just push your changes to GitHub and the workflow will handle the deployment.
