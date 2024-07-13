const { StatusCodes } = require("http-status-codes");
const available = async (req, res) => {
  try {
    // TODO: Implement available campaigns
    // Retrieves the available campaigns from database.
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const find = async (req, res) => {
  try {
    // TODO: Implement find a campaign
    // Retrieves campaign data for specific campaign.
  } catch (error) {
    console.error(error.stack);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { available, find };
