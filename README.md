# Bands Nearby
Bands Nearby is a frictionless interface that allows users to decide at a glance if they want go to a show and buy tickets with a click. The application uses web scrapers made with vanilla JS and JSDOM to create a custom data-set of concert-listings from local venues often too small or underground to be included in mainstream listings. 

Bands Nearby Beta is available on web and mobile-web: http://beta.bandsnearby.com/

Bands Nearby Desktop:
![alt text](https://github.com/jenjwong/bands-nearby/blob/development/css/images/desktop.png "Bands Nearby Desktop")

Bands Nearby Mobile:
![alt text](https://github.com/jenjwong/bands-nearby/blob/beta/src/css/images/venuePic.png "Bands Nearby Mobile")


### Technologies

* es6
* React
* React-Router
* Redux
* Redux-Thunks
* Normalizr
* Enzyme
* Jest
* Webpack
* Node.js
* JSDom
* Bluebird Promises
* Google Caja Sanitizer
* Flexbox

This application is built in React, but is easily ported over to Preact. **[Preact](https://preactjs.com/) is a fast 3kB alternative to React with the same ES6 API. Configuring Webpack to alias Preact for React cuts bundle-file size by 75% and makes initial load-time six to nine times faster.**  


## Getting Started

Clone the repository and run npm install to get a copy of the project up and running on your local machine. Testing and development builds are automated by running npm run start and npm run test. See deployment for notes on how to deploy the project on a live system. Get a development environment running by installing npm dependencies and running cronjob.js to seed your data. 


### Generating the Beta Dataset

Bands Nearby generates a custom dataset of concerts using Node.js web scrapers. Web scrapers return an array of objects which are then extended using third party APIs. Bands Nearby uses the YouTube API to get videos and LastFM API to get artist summaries, and similar artists.

Create a file called APIKeys.js in server/workers and add keys from [YouTube](https://developers.google.com/youtube/v3/getting-started) and [LastFM](https://secure.last.fm/login?next=/api/account/create). APIKeys.js is listed in git.ignore and will not be tracked by git.

```
create APIKeys.js file in server/workers:

exports.YOUTUBE = 'your-key-here-as-a-string';
exports.LASTFM = 'your-key-here-as-a-string';
```

To generate a current dataset for concerts in San Francisco from the root directory run:

```
node server/workers/cronjob.js
```

The Beta version of Bands Nearby automates a series of steps using the Node.js File System module and stores data in a json file. Running node server/workers/cronjob.js will create a bandsNearbyData.json file if one doesn't exist, take the old bandsNearbyData.json file and archive it and then replace it with a file containing newly generated data.


### Customizing the Dataset

Contributors can customise Bands Nearby to display data from any venue  in the world as long as it has a website that can be scraped.

The node scraping task is designed so additional venues can be added easily. To add new venues, write a web scraper that returns an array of objects with the following properties:

```
Initial object generated by web scraper:

const show = {};
show.venue = venue; // string
show.title = title; // array of strings
show.headliner = headliner; // string
show.date = date;  // string
show.startTime = startTime;  // string
show.cost = cost;  // number
show.artistSummary = artistSummary; // string
show.photo = photo; // string
show.link = link;  // string
Show.id = number // number
 ```

In cronjob.js import your scraper and add the new venue object to the venues array.
```
  const venues = [{ name: 'venueName', http: 'http://example.com', scraper: yourScraper }]
 ```
 
See bayBridged.sf for an example scraper. The fastest scrapers used a breadth-first-traversal of the DOM that matched data based on class and id selectors, but querying the DOM with specific selectors and using RegExp proved better for robustness and code-readability. 

Bands Nearby uses [Bluebird](http://bluebirdjs.com/docs/getting-started.html) promises to handle asynchronous actions. The Bluebird library was a better choice over native es6 promises because of helpful methods like async map and reduce and the ability to import and promisify entire libraries.

## Tests

Bands Nearby uses [Jest](https://facebook.github.io/jest/) with [Enzyme](https://github.com/airbnb/enzyme). Enzyme allows shallow rendering of components, making it easy to isolate tests. Shallow rendering in Enzyme renders components one level deep so a component can be tested in isolation of its children components.

To execute the test suite run:
```
npm run test
```

Static components are tested using Jest Snapshots. Snapshot tests render HTML markup and compare the current version to the previous version. The first time you add a Snapshot test create a baseline for comparison by running:

```
npm run test-update
```

Jest caches your Babel environment. If you update your Babel environment to clear the cache run:

```
jest no-cache
```

For self-documenting code, when adding tests, save your files in the directory alongside the file it is testing with the naming convention ComponenName.test.js.

To generate an Istanbul code coverage report run:
```
npm run coverage
```

## Redux Store
Bands Nearby manages state with Redux. Fetched data is flattened with Normalizr. The store is designed like a relational database to minimize duplication of data. Concerts are stored in a centralized dictionary and are accessed through arrays that track look-up ids.

Bands Nearby uses higher-order reducers to batch dispatching minimizing unnecessary renders.

## Deployment
Once a copy of Bands Nearby is running on your server, automate data generation by [setting up a cron job](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-on-a-vps) to run cronjob.js.


## License

This application is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

