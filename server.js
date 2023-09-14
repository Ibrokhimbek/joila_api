const dotenv = require("dotenv");
dotenv.config();
const cron = require("node-cron");
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const multipart = require("@fastify/multipart");
fastify.register(cors);
fastify.register(multipart);
fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Joila API",
      description: "This is a Joila CRM platform's API list!",
      version: "1.0.0",
    },
    tags: [
      { name: "API", description: "Test related end-points" },
      { name: "Admin", description: "Super Admin related end-points" },
      { name: "Employer", description: "Employer related end-points" },
      { name: "Employee", description: "Employee related end-points" },
      { name: "Product", description: "Product related end-points" },
      { name: "Market", description: "Market related end-points" },
      { name: "Order", description: "Order related end-points" },
      { name: "Transaction", description: "Order related end-points" },
    ],
  },
});

const mongoose = require("mongoose");
const Statistic = require("./models/Statistic");
const { months } = require("./utils/date");

fastify.get("/", { schema: { tags: ["API"] } }, (req, res) => {
  res.send("Api is working");
});
fastify.register(require("./routes/adminRoutes"), {
  prefix: "/api/v1/admin",
});
fastify.register(require("./routes/employerRoutes"), {
  prefix: "/api/v1/employer",
});
fastify.register(require("./routes/employeeRoutes"), {
  prefix: "/api/v1/employee",
});
fastify.register(require("./routes/productRotues"), {
  prefix: "/api/v1/product",
});
fastify.register(require("./routes/marketRoutes"), {
  prefix: "/api/v1/market",
});
fastify.register(require("./routes/orderRoutes"), {
  prefix: "/api/v1/order",
});
fastify.register(require("./routes/transactionRoutes"), {
  prefix: "/api/v1/transaction",
});
fastify.register(require("./routes/statisticsRoutes"), {
  prefix: "/api/v1/statistics",
});

//? Schedule the task to run on the first day of each month at midnight (00:00)
cron.schedule("0 0 1 * *", async () => {
  const date = new Date();
  
  const statistic = new Statistic({
    month: months[date.getMonth()],
    year: date.getFullYear(),
    products: [],
  });
  await statistic.save();
});

//? Database setup
// mongoose
//   .connect("mongodb://127.0.0.1:27017/iDev", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Local db connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

//* Database connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Global db connected");
});

fastify.addHook("onClose", async () => {
  await mongoose.connection.close();
});

fastify.listen(3000, "0.0.0.0", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on port 3000`);
});
