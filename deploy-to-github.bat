@echo off
echo === Pizzeria UI GitHub Pages Deployment ===
echo.
echo This script will build and deploy the Pizzeria UI application to GitHub Pages.
echo.
echo Ensure that you have:
echo 1. Set up your GitHub repository correctly
echo 2. Updated the remote URL in git to point to your GitHub repository
echo.
echo Press CTRL+C to cancel or any key to continue...
pause > nul

echo.
echo === Building application for production ===
call npm run build:prod

echo.
echo === Deploying to GitHub Pages ===
call npm run deploy

echo.
echo === Deployment completed ===
echo Your application should now be available at: 
echo https://YOUR-USERNAME.github.io/pizzeria-ui/
echo (Replace YOUR-USERNAME with your actual GitHub username)
echo.
pause
