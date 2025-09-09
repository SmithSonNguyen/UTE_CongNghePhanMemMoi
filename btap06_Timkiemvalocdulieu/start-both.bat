@echo off
echo Starting Backend and Frontend...
echo.

REM Start Backend in new window
start "Backend Server" cmd /k "cd ExpressJS01 && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak > nul

REM Start Frontend in new window  
start "Frontend Server" cmd /k "cd ReactJS01 && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8888
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause > nul
