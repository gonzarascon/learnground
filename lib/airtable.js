import Airtable from 'airtable';
import _ from 'lodash';

const badgesBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base('appGUifuxAwNhckOZ');

const badgesTable = badgesBase('badges');
const titlesTable = badgesBase('titles');
const pinsTable = badgesBase('pins');

// maps over the records, calling minifyRecord, giving us required data
const getMinifiedRecords = (records) => {
  return records.map((record) => minifyRecord(record));
};

// gets the data we want and puts it into variables
const minifyRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

export const getAllBadges = async () => {
  const records = await badgesTable.select({}).all();
  const minifiedRecords = await getMinifiedRecords(records);

  return minifiedRecords;
};

/**
 * parseIdFilter
 * @param {Array} arr
 */
const parseIdFilter = (arr) => {
  let finalString = '';

  arr.map((id, index) => {
    finalString += `{id} = '${id}'${index === arr.length - 1 ? '' : ', '}`;
  });

  return finalString;
};

/**
 * getTitlesByIDs
 * @param {String[]} titlesArray
 */

export const getTitlesByIDs = async (titlesArray) => {
  if (_.isEmpty(titlesArray)) {
    return null;
  }
  const finalArray = [];
  const allRecords = [];
  const data = titlesTable
    .select({
      filterByFormula: `OR(${parseIdFilter(titlesArray)})`,
    })
    .eachPage(async (records, fetchNextPage) => {
      finalArray.push(Promise.all(getMinifiedRecords(records)));

      fetchNextPage();
    })
    .then(async (err) => {
      if (err) {
        console.log(err);
      }

      return await Promise.all(finalArray).then((results) => {
        for (let i in results) {
          allRecords.push.apply(allRecords, results[i]);
        }
        return allRecords;
      });
    });

  return await data;
};

/**
 * getTitlesByIDs
 * @param {String[]} pinsArray
 */

export const getPinsByIDs = async (pinsArray) => {
  if (_.isEmpty(pinsArray)) {
    return null;
  }
  const finalArray = [];
  const allRecords = [];
  const data = pinsTable
    .select({
      filterByFormula: `OR(${parseIdFilter(pinsArray)})`,
    })
    .eachPage(async (records, fetchNextPage) => {
      finalArray.push(Promise.all(getMinifiedRecords(records)));

      fetchNextPage();
    })
    .then(async (err) => {
      if (err) {
        console.log(err);
      }

      return await Promise.all(finalArray).then((results) => {
        for (let i in results) {
          allRecords.push.apply(allRecords, results[i]);
        }
        return allRecords;
      });
    });

  return await data;
};
