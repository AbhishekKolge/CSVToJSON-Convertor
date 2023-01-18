const { StatusCodes } = require("http-status-codes");

const CustomError = require("../errors");
const customUtils = require("../utils");
const Model = require("../models");

const addUsers = async (req, res) => {
  if (!req.files || !req.files.users) {
    throw new CustomError.BadRequestError("No file uploaded");
  }

  const usersFile = req.files.users;

  if (usersFile.mimetype !== "text/csv") {
    throw new CustomError.BadRequestError("Please upload a csv file");
  }

  const userList = await customUtils.readCSVFile(usersFile.tempFilePath);

  const users = new Model.Users();

  await users.create(userList);

  await customUtils.deleteFile(usersFile.tempFilePath);

  res.status(StatusCodes.OK).json({});
};

const getAgeDistribution = async (req, res) => {
  const data = await new Model.Users().calculateAgeDistribution();

  res.status(StatusCodes.OK).json({ data });
};

module.exports = { addUsers, getAgeDistribution };
