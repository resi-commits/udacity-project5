// babel-polyfill because of ReferenceError: https://knowledge.udacity.com/questions/174638
import "babel-polyfill";
const getTripdata = require('../server/getTripdata');

describe("Test the /trip POST endpoint", () => {
    test("It should respond the destination with country, the weather forecast (16 days) and a picture of the city", async () => {
      const userInput = {
        destination: 'Berlin',
        tripstart: new Date('2021-11-30'),
        countdown: 13
      }
      const res = await getTripdata(userInput)
      
      expect(res).toHaveProperty('destination');
      expect(res.destination).toEqual('Berlin, Germany');

      expect(res).toHaveProperty('weather');
      expect(typeof res.weather[0].weather.icon).toEqual('string');

      expect(res).toHaveProperty('picture');
      expect(typeof res.picture.webformatURL).toEqual('string');
    });
});