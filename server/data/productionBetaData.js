// programatically filters shows for today's concerts
// npm run build script does not work with es6 arrow functions in this file

const data = require('./bandsNearbyData.json');
// const data = require('./bandsNearbyDataMock');


const today = new Date();
const dayNow = today.getDate();
const monthNow = today.getMonth() + 1;

const relevantData = function(data) {
  return data.filter(function(item) {
    const dateArray = item.date.split('-');
    if (dateArray[1] == monthNow && dateArray[2] > dayNow && dateArray[2] <= (dayNow + 7) && item.youTube !== [] && item.similarArtists !== []) {
      if (item.cost === 0) {
        item.cost = 'No Cover';
      }
      return true;
    }
  });
};

module.exports = relevantData(data);
// module.exports = data;
