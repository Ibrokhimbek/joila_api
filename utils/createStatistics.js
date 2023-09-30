const Employer = require("../models/Employer");
const Statistic = require("../models/Statistic");

exports.createStatistics = async () => {
  const date = new Date();

  //* Get all employers
  const employers = await Employer.find({});

  //* Create statistics object for all employers
  for (const employer of employers) {
    const statistic = new Statistic({
      month: months[date.getMonth()],
      year: date.getFullYear(),
      products: [],
      employerId: employer._id,
    });
    await statistic.save();
  }
};
