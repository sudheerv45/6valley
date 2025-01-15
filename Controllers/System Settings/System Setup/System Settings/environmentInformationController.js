// controllers/environmentController.js
const EnvironmentInformation = require("../../../../Models/System Settings/System Setup/System Settings/environmentInformationModel");

// Create or Update the Environment Information
const createOrUpdateEnvironment = async (req, res) => {
  try {
    const {
      appName,
      appDebug,
      appMode,
      appUrl,
      dbConnection,
      dbHost,
      dbPort,
      dbUsername,
      dbPassword,
      buyerUsername,
      purchaseCode,
    } = req.body;

    // Check if a record already exists
    let environmentInfo = await EnvironmentInformation.findOne();

    if (environmentInfo) {
      // Update the existing record
      environmentInfo = await EnvironmentInformation.findByIdAndUpdate(
        environmentInfo._id,
        {
          appName,
          appDebug,
          appMode,
          appUrl,
          dbConnection,
          dbHost,
          dbPort,
          dbUsername,
          dbPassword,
          buyerUsername,
          purchaseCode,
        },
        { new: true }
      );
      return res.status(200).json({ message: "Environment information updated", environmentInfo });
    }

    // If no record exists, create a new one
    const newEnvironmentInfo = new EnvironmentInformation({
      appName,
      appDebug,
      appMode,
      appUrl,
      dbConnection,
      dbHost,
      dbPort,
      dbUsername,
      dbPassword,
      buyerUsername,
      purchaseCode,
    });

    await newEnvironmentInfo.save();

    res.status(201).json({ message: "Environment information created", newEnvironmentInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Environment Information
const getEnvironmentInformation = async (req, res) => {
  try {
    const environmentInfo = await EnvironmentInformation.findOne();

    if (!environmentInfo) {
      return res.status(404).json({ message: "Environment information not found" });
    }

    res.status(200).json(environmentInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
    createOrUpdateEnvironment,
    getEnvironmentInformation
}