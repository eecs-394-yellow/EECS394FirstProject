@echo off

::
:: Start the JsTestDriver server in a new window if it is not already running
::

if exist curl.tmp (
  del curl.tmp
)
curl --silent -o curl.tmp http://localhost:%1
if not exist curl.tmp (
  echo Starting JsTestDriver server...
  set newServerInstance=1
  start "JsTestDriver" /min java -jar JsTestDriver.jar --port %1
) else (
  echo JsTestDriver server already running
  set newServerInstance=0
)

::
:: Launch the given Android emulator if it is not already running
::

%~f2\platform-tools\adb.exe devices | find "emulator" > nul
if errorlevel 1 (
  REM If we have a new emulator instance but an existing server instance, we
  REM must restart the server in order to flush any existing captured browsers.
  if %newServerInstance% EQU 0 (
    echo Restarting JsTestDriver server...
    set newServerInstance=1
    taskkill /fi "WINDOWTITLE eq JsTestDriver" > nul
    start "JsTestDriver" /min java -jar JsTestDriver.jar --port %1
  )
  echo Starting emulator...
  set newEmulatorInstance=1
  start /min %~f2\tools\emulator.exe -avd %3
) else (
  echo Emulator already running
  REM If the emulator's browser is NOT already captured, we treat this as a new
  REM emulator instance.
  call:isAndroidBrowserCaptured alreadyCaptured %1
  if %alreadyCaptured% EQU 1 (
    echo Android browser already captured
    set newEmulatorInstance=0
  ) else (
    echo Android browser not yet captured
    set newEmulatorInstance=1
  )
  REM If we have a new server instance but an existing emulator instance, we
  REM open a blank page in the emulator's browser. This will cause a
  REM hard-refresh when we open http://10.0.2.2:.../capture later on, which in
  REM turn will cause the new server instance to re-capture the browser.
  if %newServerInstance% EQU 1 (
    %~f2\platform-tools\adb.exe shell am start -a android.intent.action.VIEW -d about:blank > nul
  )
  REM Press the "Home" button to return to the home screen
  REM This prevents the browser's menu from appearing when we try to unlock
  REM the screen by pressing the Menu button.
  %~f2\platform-tools\adb.exe shell input keyevent 3
)

:: Unlock the Android emulator's screen
:: Unfortunately, there is no way to detect whether the screen is locked from
:: the command line. Regardless, we can unlock the screen by sending the
:: keyevent corresponding to the Menu button.
:: NOTE: We must wait for the emulator to start before sending the keyevent.
%~f2\platform-tools\adb.exe wait-for-device shell input keyevent 82

::
:: Load the JsTestDriver test page in the emulator
:: NOTE: The emulator uses http://10.0.2.2 to refer to the host machine
::

%~f2\platform-tools\adb.exe shell am start -a android.intent.action.VIEW -d http://10.0.2.2:%1/capture > nul

:: Wait until the Android browser is captured (if necessary)
:: We check the server's status page every second until it reports that there
:: is at least 1 captured Android browser.
if %newEmulatorInstance% EQU 0 (
  goto LoopEnd
)
echo Capturing browser...
:LoopStart
call:isAndroidBrowserCaptured captured %1
if %captured% EQU 1 (
  echo Browser captured!
  goto LoopEnd
)
ping -n 2 127.0.0.1 > nul
goto LoopStart
:LoopEnd

:: If the browser is newly-captured, we must wait for the JavaScript on the
:: JsTestDriver page to initialize before beginning the tests.
set result=0
if %newServerInstance% EQU 1 set result=1
if %newEmulatorInstance% EQU 1 set result=1
if %result% EQU 1 (
  echo Waiting %4 seconds for the browser to finish loading...
  set /a seconds=%4+1
  ping -n %seconds% 127.0.0.1 > nul
)

goto:eof

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::
:: Helper function to determine if JsTestDriver has captured an Android browser
::

:isAndroidBrowserCaptured
if exist curl.tmp (
  del curl.tmp
)
curl --silent -o curl.tmp http://localhost:%2
find "Android" < curl.tmp > nul
if errorlevel 1 (
  set %1=0
) else (
  set %1=1
)
del curl.tmp
goto:eof
