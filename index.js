const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const database = require("./db/config");
const nodeCron = require("node-cron");
const cors = require("cors");
const router = require("./routes/index");
const port = process.env.PORT || 3013;
database();
const Activities = require("./models/activitiesSchema");
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

nodeCron.schedule("* * * * *", async function (req, res) {
  console.log("Running cron job");
  try {
    const time = Date.now();
    const currentUpdate = time - 300000;
    const activitiesToUpdate = await Activities.find({
      $or: [
        {
          status: "pending",
        },
        {
          status: "proses",
        },
      ],
      updated_at: { $lte: currentUpdate },
    });

    for (const activities of activitiesToUpdate) {
      if ((activities.status = "pending")) {
        activities.status = "ajukan_proses";
      } else if ((activities.status = "proses")) {
        activities.status = "ajukan_lunas";
      }

      await activities.save();
      console.log((activities.updated_at = Date.now()));
      // }
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
});

app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
