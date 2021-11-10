# Table of Content
- [Table of Content](#table-of-content)
- [FEND Capstone: Travel Planner](#fend-capstone-travel-planner)
  - [Project Description](#project-description)
  - [How to run this project](#how-to-run-this-project)
  - [Technologies](#technologies)
  - [Author information](#author-information)
  - [Credits](#credits)

# FEND Capstone: Travel Planner
## Project Description
This project requires to build out a travel app that, at a minimum, obtains a desired trip location with a starting date from the user, and displays weather and an image of the location using information obtained from external APIs.
## How to run this project
For this project you'll need some terminal commands to actually test it:
* before running any command on the terminal, run `npm install` to get all dependencies (be sure that you are in the project directory and not in any sub-folder)
* after that you can run the project in two modes:
  * development: `npm run dev` to run a webpack dev server and test this project in development environment (port 3001 is used; feel free to modify as you like)
  * production: `npm run build` to build all necessary files into the distribution folder (`/dist`)
  * with `npm start` you can start the server (it listens on port 8081)
* besides, you can execute the test cases to check if all functions in `../src/client/js/` (<- client) and `../src/server/getTripdata.js` (<-server) are working as expected: you can run `npm run test` on the terminal

Additionally, you will need to create an `.env` file that includes the following environment variabels:
* `GEONAMES_USER`: this is the user name you get when you register at geonames API
* `GEONAMES_BASE_URL`: this url is used to request the geonames API (I am using: `http://api.geonames.org/searchJSON`)
* `WEATHERBIT_API_KEY`: this is the API key used to request the weatherbit API
* `WEATHERBIT_BASE_URL`: this url is used to request the weatherbit forcast API (I am using: `https://api.weatherbit.io/v2.0/`)
* `PIXABAY_API_KEY`: this is the API key used to request the pixabay API
* `PIXABAY_BASE_URL`: this url is used to request the pixabay API (I am using: `https://pixabay.com/api/`)


The structure of your `.env` file should look like this:
```env
API_KEY=xxxxxxxxxx
```

## Technologies
Multiple technologies are used in this project:
* Setting up Webpack
* Sass styles
* Webpack Loaders and Plugins
* Creating layouts and page design
* Service workers
* Using APIs and creating requests to external URLs (Geonames API, Weatherbit API and Pixabay API)
## Author information
My name is Theresa Adam and this is my Travel Planner. Hope you enjoy it. 

## Credits
* The basic project was copied from the [my own project for the Weather App](https://github.com/resi-commits/udacity-project3) and then customized/ extended
* For the ReferenceError Exception[ this knowledge post](https://knowledge.udacity.com/questions/174638) was used to resolve it
* The background image is from Google, [this is the link](https://www.google.com/search?q=travel+abstract&tbm=isch&source=iu&ictx=1&fir=V2t4p6Cl_SpzQM%252CEPM7M942Z0iTvM%252C_%253B4IQg11abcS_m5M%252CF0kanxxouWep2M%252C_%253BL0ogfjO-pP-ZdM%252CSDkpCOupBMKPWM%252C_%253BpvvR8I3AHS7m5M%252CuianeGa75GeegM%252C_%253B2n0D6LRl0j--zM%252CuMPZ9z2ack4v4M%252C_%253B-EkwZ7oG8ZqCsM%252CSmx7ecyoFiDqnM%252C_%253BLvcjzvGsom9f-M%252CZOzOwMVLoETOIM%252C_%253BlgqIMrqJOFCd4M%252C9iQaSPjQcn5nwM%252C_%253B7FatSXFEAXEwKM%252CZPUz0j6qeocSCM%252C_%253BnkREZFOdHVOV7M%252CnzsjXq6vj0OciM%252C_%253Bemf-BwRILTOsGM%252C-AOVEdzFSKD4dM%252C_%253Bws-MjK60vUFctM%252CYhCMjhiAkhllBM%252C_%253Bj1uQWqr1Hx-r6M%252CVarH7owOaql14M%252C_%253BvlmVLCOnluufOM%252Cs-0ObQk6rwcavM%252C_%253B2w_rSjY3uS2-XM%252Cak7Wk6qs94jg-M%252C_&vet=1&usg=AI4_-kSGw9bnAe05wYMwILvDtL9JjvH8tQ&sa=X&ved=2ahUKEwjenvGkoo70AhWC_rsIHfX-AZMQ9QF6BAgjEAE#imgrc=4IQg11abcS_m5M).