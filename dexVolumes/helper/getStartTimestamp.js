const { request, gql } = require("graphql-request");

const {
  DEFAULT_DAILY_VOLUME_FACTORY,
  DEFAULT_DAILY_VOLUME_FIELD,
} = require("./getUniSubgraphVolume");

const getStartTimestamp =
  ({
    endpoints,
    chain,
    dailyDataField = DEFAULT_DAILY_VOLUME_FACTORY,
    volumeField = DEFAULT_DAILY_VOLUME_FIELD,
    dateField = "date",
    first = 1000,
  }) =>
  async () => {
    const query = gql`
        {
            ${dailyDataField}(first: ${first}) {
                ${dateField}
                ${volumeField}
            }
        }
    `;

    const result = await request(endpoints[chain], query);

    const days = result?.[dailyDataField];

    console.log(days, "days");

    const firstValidDay = days.find((data) => data[volumeField] !== "0");

    console.log(firstValidDay, "firstValidDay");

    return firstValidDay[dateField];
  };

module.exports = {
  getStartTimestamp,
};
