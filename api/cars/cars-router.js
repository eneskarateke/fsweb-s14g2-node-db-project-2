// HOKUS POKUS
const router = require("express").Router();

const carsModel = require("./cars-model.js");

const mw = require("./cars-middleware.js");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA

  try {
    const cars = await carsModel.getAll();
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkCarId, (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.car);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkCarPayload,
  mw.checkVinNumberValid,
  mw.checkVinNumberUnique,
  async (req, res, next) => {
    // KODLAR BURAYA

    try {
      const insertedCar = await carsModel.create({
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        title: req.body.title,
        transmission: req.body.transmission,
      });
      res.status(201).json(insertedCar);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
