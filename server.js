const dotenv = require("dotenv");
dotenv.config();
const fastify = require("fastify")();
const cors = require("fastify-cors");
fastify.register(cors);

fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "fastify-api" },
  },
});

const mongoose = require("mongoose");

fastify.get("/", (req, res) => {
  res.send("Api is working");
});
fastify.register(require("./routes/adminRoutes"), { prefix: "/admin" });
fastify.register(require("./routes/employerRoutes"), { prefix: "/employer" });

//? Database setup
// mongoose
//   .connect("mongodb://127.0.0.1:27017/iDev", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

//* Database connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected");
});

fastify.addHook("onClose", async () => {
  await mongoose.connection.close();
});

fastify.listen(
  {
    port: 3000,
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server is running on port 3000`);
  }
);
