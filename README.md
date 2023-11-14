DEMO: https://www.youtube.com/watch?v=oCO-VQlsDFg

Description:
-This repository contains the frontend for a TODO List Web Application.
The API is built with Angular 16 that provides CRUD operations for managing TODOs,
as well as features for filtering and sorting TODO items, with team features such as role-based access control,
and real-time collaboration

Features:
-A team can have many todo groups, which is for containing a set of items
-In the dashboard of todoItems, user can filter and sort by status, due date, priority, tags etc
-Users are required to have a account in order to use the service
-There are two roles: Admin and Member. At the beginning of registration, users need to select the team they belong,
only admins are allowed to create todo groups for teams, and allowed to see the todo groups belong to other team.

Configuration:
-Configurations are put in "environment.ts" and "environment.development.ts"

Built with:
-Angular 16 
-Angular materials 16.2.4
-Bootstrap 5.2.3
-Node 18.12.1

Run application:
-In development mode, "ng serve" (Angular CLI is required)

Run test:
- Command "ng test" will run unit test using libraries such as Jasmine and Karma.
