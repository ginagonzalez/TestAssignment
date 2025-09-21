# Automation Task
This repository contains automated tests created as part of a test assignment.

## Description
This project uses Playwright as testing framework with JavaScript and Chromium, WebKit and Firefox as browsers.
It covers a few test ascenarios for the page https://www.saucedemo.com/ 

There are two tests files, separating the main flows for the tests. 
One to test login with two types of users and one to test product purchase after user is signed in.    

## Getting Started

### Dependencies
* Node.js: latest 20.x, 22.x or 24.x.
* Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
* macOS 14 (Ventura) or later.
* Debian 12 / 13, Ubuntu 22.04 / 24.04 (x86-64 or arm64).

### Installing
* Clone this repository or download as a zip file  
* Open terminal and go to the main folder 
* Install dependencies
```
npm i -D @playwright/test
```
* Install Playwright Browsers
```
npx playwright install
```

### Running the tests
* This command will run all the tests in the project
```
npx playwright test
```
* These commands will run only the tests on each file
```
npx playwright test tests/login.spec.js
```
```
npx playwright test tests/purchase.spec.js
```
* Run this command after test execution to see the results as a HTML report
```
npx playwright show-report
```
* Run this command if you want to open the web browsers to see the tests while running 
```
npx playwright test --headed
```
* Run this command if you want to run the tests using the UI 
```
npx playwright test --ui
```









