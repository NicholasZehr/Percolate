# Welcome to Percolate!

Percolate is a web application for Coffee Connoisseurs passionate about finding their next favorite roast. At the core of percolate is the user review, which is added after a user searches out a coffee from our database. From here they can see both information about this roast, as well as any user reviews from the percolate community. Users can like and comment on these reviews, as well as add in their thoughts about that particular bag. Any new user review is pushed up to a follower’s feed, which is the central hub of the app.

See our video HERE for an example of this data flow.

## Other Features
### Business Owners

Understanding that many coffee shops are owned by coffee aficionados themselves, we have an option for users to create and ‘own’ businesses within their personal profiles as well.

### Search | Mapping
Our firestore database communicates directly with algolia which keeps our search functionality up to date with the latest changes. We use algolias full text search and geolocation search APIs to return search results in our search hit box and on our google map. The google map and google geolocation apis ensure our business has the correct geolocation on the map and our map is centered on our user’s location. All of our search functionality is contained within InstantSearch.js react components.

### Authentication
Authentication is handled using the Google Cloud Firebase Authentication tools. This allows for authentication of users with their email addresses and passwords. There are also built in methods to get active users, as well as perform account updates directly within the app.

## Feedback
Questions / Comments / Something break? Let us know HERE!

## About Us

Percolate was created by:

 Greg Schotte:
Github
LinkedIn

 Nicholas Zehr:
Github
LinkedIn

 Matt Stern:
Github
LinkedIn

Jing Lin:
Github
LinkedIn

The site was written in Node.js, with front end components rendered in React.js and state handled via Redux.js. The backend lives in Google’s Cloud Firestore which gave access to


## Available Scripts

In the project directory, you can run:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

