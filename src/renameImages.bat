setlocal ENABLEDELAYEDEXPANSION
FOR /R %%X IN (*.png) DO (
    IF NOT "%%~dpX"=="!LASTPATH!" (SET /A COUNT=0) ELSE (SET /A COUNT=!COUNT!+1)
    SET LASTPATH=%%~dpX
    REN "%%X" card!COUNT!.png
)
endlocal