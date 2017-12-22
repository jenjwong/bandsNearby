# Bands Nearby

At a glance decide if you want go to a show and buy tickets with a click. Bands Nearby is a frictionless interface to explore music. The application uses vanilla JS and JSDOM to scrape concert listings from local venues often too small or underground to be included in mainstream listings. Built with es6, Node.js, Bluebird, Flexbox, JSDOM, Jest, Webpack and React.

Bands Nearby Beta is available on web and mobile: http://beta.bandsnearby.com/

Bands Nearby:
![alt text](https://github.com/jenjwong/bands-nearby/blob/beta/src/css/images/venuePic.png "Bands Nearby")


## Getting Started

Clone the repository and run npm install to get a copy of the project up and running on your local machine for development and testing purposes. Testing and development builds are automated by running npm run start and npm run test. See deployment for notes on how to deploy the project on a live system. Get a development environment running by installing npm dependencies and running cronjob.js to seed your data. 

### Prerequisites

Node.js

NPM

### Generating the Beta Dataset

Bands Nearby generates a custom dataset of concerts using Node.js web scrapers. Web scrapers return an array of objects which are then extended using third party APIs. Bands Nearby uses the YouTube API to get videos and LastFM API to get artist summaries, and similar artists.

Create a file called APIKeys.js in server/workers and add keys from [YouTube](https://developers.google.com/youtube/v3/getting-started) and [LastFM](https://secure.last.fm/login?next=/api/account/create). APIKeys.js is listed in git.ignore and will not be tracked by git.

```
create APIKeys.js file in server/workers:

exports.YOUTUBE = 'AIzTEkZEmtfLs7X_4MBvT8rH9E';
exports.LASTFM = '2f2f02f1195f2b3514f9e43';
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
 ```

In cronjob.js import your scraper and add the new venue object to the venues array.
```
  const venues = [{ name: 'venueName', http: 'http://example.com', scraper: yourScraper }]
 ```
 
See bayBridged.sf for an example scraper. The fastest scrapers used a breadth first traversal of the DOM that matched data based on class and id selectors, but querying the DOM with specific selectors and using RegExp proved better for robustness and code readability. 

Bands Nearby uses [Bluebird](http://bluebirdjs.com/docs/getting-started.html) promises to handle asynchronous actions. The Bluebird library was a better choice over native es6 promises because of helpful methods like asynch map and reduce and the ability to import and promisify entire libraries.

## Tests

**Exciting update! Bands Nearby will be using [Sauce Labs](https://saucelabs.com/) for testing as part of their generous program to support open source projects! Thanks Sauce Labs!** <br><br> ![Sauce Labs Logo](https://saucelabs.com/content/images/logo@2x.png)

## Deployment
Once a copy of Bands Nearby is running on your server, automate data generation by [setting up a cron job](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-on-a-vps) to run cronjob.js. 


## License

This application is licensed under the MIT License - see the [LICENSE.md](https://github.com/jenjwong/bands-nearby/blob/development/LICENSE.md) file for details

