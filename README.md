# Travel Tracker

## Description
Travel Tracker is a dynamic web application that allows users to mangage their trips around the world. With an easy-to-use and aesthetically pleasing user interface, travelers can view their upcoming trips, pending trips, estimated travel costs and even book a new trips. 

This project is designed to showcase Front-End web development skills including API interaction, DOM and data manipulation, and responsive design. Note: The backend API was provided as part of the Turing School's curriculum. The data used in this application is made up for educational purposes.

## Features
- User Authentication: Login process to access a personalized travel dashboard.
- Trip Planning: Users can select a destination, the trip start date, the number of travelers, and the duration of their trips.
- Cost Estimation: Provides an estimated cost for each trip including flights, lodging and a 10% agent fee, calculated dynamically based on user input.
- Trip Management: Users can view their upcoming, pending, and past trips in organized sections.
- Designed with mobile in mind: The application is responsive, ensuring a seamless experience across various devices and screen sizes. 

## Demo
https://github.com/lalonggone/travel-tracker/assets/137913045/b34544de-f7f2-45eb-a1c8-5dd4824317f2

## Installation and Setup
1. Clone this repository to your local machine:
```git@github.com:lalonggone/travel-tracker.git```

2. Navigate to the project directory:
```cd travel-tracker```

3. Install the necessary dependencies:
```npm install```

4. Start the application:
```npm start```

5. Open the app at http://localhost:8080 in your browser.

## Backend Server Setup
You will also need to clone **and** run the backend server. To do this, I reccomend opening a new tab in your terminal:

- Mac: Command + T

- Linux: Ctrl + Shift + T

- Windows: Ctrl + Shift + T

You can also open a new tab by right-clicking on the tab bar and selecting "New Tab", but if you want to be cool, you'll use shorcuts.


### Now follow these steps to get the backend server running:

1. Clone the backend repository (I would clone it in the same parent directory as the Travel Tracker app):
```git clone git@github.com:turingschool-examples/travel-tracker-api.git```

2. Navigate to the backend directory:
```cd travel-tracker-backend```

3. Install project dependencies:
```npm install```

4. Start the server:
```npm start```

Navigate to the address provided within the terminal, e.g., http://localhost:3001.

## Usage
Once both the frontend and backend servers are running, the Travel Tracker login page should be running in your browser. You can log in with the following credentials:
- Username: `traveler10` (the number at the end can be any number between 1-50 to get a different user)
- Password: `travel`

After logging in, the dashboard will display your trips categorized as upcoming or pending. Pending trips just mean that they are waiting fo rthe travel agent's approval. Book new trips, estimate travel costs, and keep track of your trips through this clean dashboard interface!

Questions? Comments? Feedback? Thanks for looking! 

lauralonggone@gmail.com

## Technologies Used
- HTML
- CSS/SCSS
- Vanilla JavaScript
- TDD with Mocha and Chai
- Webpack
