const express = require("express");

const {
  addUsers,
  getAgeDistribution,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(addUsers);
router.route("/age-distribution").get(getAgeDistribution);

module.exports = router;
