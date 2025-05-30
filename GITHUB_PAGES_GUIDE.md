# GitHub Pages Deployment Guide for Pizzeria UI

This guide provides step-by-step instructions for deploying the Pizzeria UI application to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. The Pizzeria UI project code

## Steps to Deploy

### 1. Create a GitHub Repository

1. Log in to your GitHub account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Name your repository "pizzeria-ui"
4. Set it to Public (GitHub Pages requires this for free accounts)
5. Click "Create repository"

### 2. Update the Remote URL

Replace the placeholder URL with your actual GitHub repository URL:

```bash
git remote set-url origin https://github.com/YOUR-USERNAME/pizzeria-ui.git
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### 3. Push Your Code to GitHub

Push the main branch to GitHub:

```bash
git push -u origin main
```

### 4. Deploy to GitHub Pages

Run the deploy script:

```bash
npm run deploy
```

This script uses the `angular-cli-ghpages` package to deploy your application to GitHub Pages.

### 5. Configure GitHub Pages

After deployment:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "gh-pages branch"
5. Click "Save"

### 6. Access Your Deployed Application

Your application will be available at:
```
https://YOUR-USERNAME.github.io/pizzeria-ui/
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Troubleshooting

### 404 Errors

If you encounter 404 errors when navigating to routes other than the home page:

1. Make sure your `index.html` file includes the following in the `<head>` section:
   ```html
   <base href="/pizzeria-ui/">
   ```

2. Configure the router to use `HashLocationStrategy`:
   ```typescript
   // In app.routes.ts
   import { provideRouter, withHashLocation } from '@angular/router';
   
   // Update providers
   providers: [
     provideRouter(routes, withHashLocation())
   ]
   ```

### Images Not Loading

If images fail to load, make sure they have relative paths or update them to point to the correct GitHub Pages URL.

## Automatic Deployment with GitHub Actions

To set up continuous deployment, create a GitHub Actions workflow:

1. Create a file at `.github/workflows/deploy.yml` with the following content:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3
           
         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 20
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build:prod
           
         - name: Deploy to GitHub Pages
           uses: JamesIves/github-pages-deploy-action@v4
           with:
             folder: dist/pizzeria-ui/browser
   ```

2. Push this file to your repository to enable automatic deployments on each push to the main branch.

## Updating Your Deployment

To update your deployed application:

1. Make your changes to the code
2. Commit the changes to your local repository
3. Push the changes to GitHub
4. Run `npm run deploy` or let GitHub Actions handle the deployment

Remember to update the version number in `package.json` when releasing significant changes.
