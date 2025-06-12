@echo off
echo Building the app...
call npm run build
echo Creating zip file...
powershell Compress-Archive -Path build\* -DestinationPath exam-portal.zip -Force
echo Done! Share exam-portal.zip with students
pause 