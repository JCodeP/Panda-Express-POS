# Panda Express Web Application - 5C
## High Level
### Introduction
The Panda Express Web Application aims to provide everything a Panda Express restaurant needs to operate: a manager interface to manage the inventory, menu, and employees; a cashier interface to take customer orders; a customer ordering kiosk to submit their own orders; and a menu board to display the menu's offerings.
### System Description
The frontend web application is built with React.js, and the Express.js backend connects to the Google OAuth API, the Open Weather API, the Google Translate API, and a Postgresql database. 
## Low Level
### Manager Interface
### Cashier Interface
- Connects to the OpenWeather API to apply dynamic menu pricing based on College Station weather conditions
- Reads entree, drink, appetizer, and combo option data from the PostgreSQL database to display menu options
- Posts orders, payment types, and amounts to database
### Customer Interface
### Static Display Interface
