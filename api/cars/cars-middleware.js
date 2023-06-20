const carsModel = require("./cars-model.js");

const vinValidation = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  const { id } = req.params;

  try {
    const car = await carsModel.getById(id);
    if (!car) {
      return res
        .status(404)
        .json({ message: `${id} kimliğine sahip araba bulunamadı` });
    } else {
      req.car = car;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS

  try {
    let { vin, make, model, mileage } = req.body;

    if (!vin || !make || !model || !mileage) {
      let missingField = "";

      if (!vin) {
        missingField = "vin";
      } else if (!make) {
        missingField = "make";
      } else if (!model) {
        missingField = "model";
      } else {
        missingField = "mileage";
      }

      res.status(400).json({ message: `${missingField} is missing.` });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  const vin = req.body.vin;

  try {
    let isValid = vinValidation.validate(vin);
    if (!isValid) {
      res.status(400).json({ message: `vin ${vin} is invalid` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS

  try {
    let isExist = false;
    const existingVin = await carsModel.getByVin(req.body.vin);
    isExist = existingVin ? true : false;

    if (isExist) {
      return res
        .status(400)
        .json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkVinNumberUnique,
  checkCarPayload,
  checkVinNumberValid,
};
