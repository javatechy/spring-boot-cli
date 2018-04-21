# CodeGen Client

This project is client of the CODEGEN system. It is recommeded to run the backend first.

Backend for this project is:

https://github.com/javatechy/codegen

Features:
-----------------------------
**For User**:
* Generate Codegen client

**For Admin**:
* Transactions by a user

Validations:
-----------------------------
* Only mandatory field validations are add for all input fields.

Running the applicaion
-----------------------------
Follow these steps to run this project:
* Clone the project `git clone https://github.com/javatechy/fab-ui.git`
* Install angular-cli using `npm install -g @angular/cli` 
* `cd fab-ui && npm install`
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* for Production Build : `ng build --prod`. Build is created in `dist/` folder.

Project Structure
-----------------------------
There are 3 components:
 * `CodeComponent` - for for code generato


Session Management
-----------------------------
Session variables are managed in localstorage.

Constants
-----------------------------
 * All Constants are defined in `src/app/utils/app.utils.ts`
 * Backend URL is mentioned in `environment.ts` in `src/environments` folder


