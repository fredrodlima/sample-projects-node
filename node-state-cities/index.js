import { promises as fs } from 'fs';

const processData = async () => {
  try {
    const cities = await readCitiesJson();
    const states = await readStatesJson();
    for (let i = 0; i < states.length; i++) {
      const citiesForState = cities
        .filter((s) => s.State === states[i].ID)
        .map((stateCity) => {
          const { Name } = stateCity;
          return {
            name: Name,
          };
        });
      await fs.writeFile(
        `./json/${states[i].Acronym}.json`,
        JSON.stringify(citiesForState)
      );
    }
    const result = await getCountCitiesOfState(states);
    console.log('Number of cities each state');
    console.log(result.sort((a, b) => a.numCities - b.numCities));
    const biggerStates = await getBiggerStates(result, 5);
    console.log('Bigger states');
    console.log(biggerStates);
    const shorterStates = await getShorterStates(result, 5);
    console.log('Shorter states');
    console.log(shorterStates);
    const biggestCityEachState = await getBiggestCityNameEachState(states);
    console.log('Biggest city names each state');
    console.log(biggestCityEachState);
    const shortestCityEachState = await getShortestCityNameEachState(states);
    console.log('Shortest city names each state');
    console.log(shortestCityEachState);
    const biggestCityAllStates = await getBiggestCityAllStates(
      biggestCityEachState
    );
    console.log('Biggest city name all states');
    console.log(biggestCityAllStates);
    const shortestCityAllStates = await getShortestCityAllStates(
      shortestCityEachState
    );
    console.log('Shortes city name all states');
    console.log(shortestCityAllStates);
  } catch (err) {
    console.log(err);
  }
};

const readCitiesJson = async () => {
  try {
    const cities = JSON.parse(await fs.readFile('./json/cities-br.json'));
    return cities;
  } catch (err) {
    console.log(err);
  }
};

const readStatesJson = async () => {
  try {
    const states = JSON.parse(await fs.readFile('./json/states-br.json'));
    return states;
  } catch (err) {
    console.log(err);
  }
};

const getCountCitiesOfState = async (states) => {
  try {
    const result = [];
    for (let i = 0; i < states.length; i++) {
      const countCities = await readCountCitiesFromJson(states[i].Acronym);
      result.push(countCities);
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};

const readCountCitiesFromJson = async (state) => {
  try {
    const citiesOfState = JSON.parse(await fs.readFile(`./json/${state}.json`));
    return { state, numCities: citiesOfState.length };
  } catch (err) {
    console.log(err);
  }
};

const getBiggerStates = async (countStateCities, amount) => {
  return countStateCities
    .sort((a, b) => b.numCities - a.numCities)
    .slice(0, amount);
};
const getShorterStates = async (countStateCities, amount) => {
  return countStateCities
    .sort((a, b) => b.numCities - a.numCities)
    .slice(countStateCities.length - amount, countStateCities.length);
};

const getBiggestCityNameEachState = async (states) => {
  const result = [];
  for (let i = 0; i < states.length; i++) {
    const biggestCity = await readBiggestCityNameFromJson(states[i].Acronym);
    result.push(biggestCity);
  }
  return result;
};

const readBiggestCityNameFromJson = async (state) => {
  try {
    const citiesOfState = JSON.parse(await fs.readFile(`./json/${state}.json`));
    const biggestCityName = citiesOfState
      .sort((a, b) => b.name.localeCompare(a))
      .sort((a, b) => b.name.length - a.name.length)[0];
    return { name: biggestCityName.name, state };
  } catch (err) {
    console.log(err);
  }
};

const getShortestCityNameEachState = async (states) => {
  const result = [];
  for (let i = 0; i < states.length; i++) {
    const shortestCity = await readShortestCityNameFromJson(states[i].Acronym);
    result.push(shortestCity);
  }
  return result;
};

const readShortestCityNameFromJson = async (state) => {
  try {
    const citiesOfState = JSON.parse(await fs.readFile(`./json/${state}.json`));
    const shortestCityName = citiesOfState
      .sort((a, b) => a.name.localeCompare(b))
      .sort((a, b) => a.name.length - b.name.length)[0];
    return { name: shortestCityName.name, state };
  } catch (err) {
    console.log(err);
  }
};

const getBiggestCityAllStates = async (biggestCityEachState) => {
  try {
    const biggestCityName = biggestCityEachState
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.name.length - a.name.length)[0];
    return biggestCityName;
  } catch (err) {
    console.log(err);
  }
};

const getShortestCityAllStates = async (shortestCityEachState) => {
  try {
    const shortestCityName = shortestCityEachState
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.name.length - b.name.length)[0];
    return shortestCityName;
  } catch (err) {
    console.log(err);
  }
};

processData();
