const Statistics = require("../models/Statistic");

exports.getStatistics = async (request, reply) => {
  try {
    const { year, month } = request.params;
    const statistics = await Statistics.findOne({ year, month });

    if (!statistics) {
      reply.status(404).send({ error: "Statistics not found" });
      return;
    }

    reply.send(statistics);
  } catch (error) {
    reply.status(500).send({ error: "Error retrieving statistics" });
  }
};
