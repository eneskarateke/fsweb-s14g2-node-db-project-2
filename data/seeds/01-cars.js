/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const defaultCars = [
  {
    vin: "123",
    make: "Citroen",
    model: "C4",
    mileage: 1234,
  },
  {
    vin: "1234",
    make: "Toyota",
    model: "Corolla",
    mileage: 124334,
  },
  {
    vin: "1235",
    make: "Peugeout",
    model: "202",
    mileage: 134234,
  },
  {
    vin: "1236",
    make: "Audi",
    model: "A3",
    mileage: 12345,
  },
];

exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert(defaultCars);
};
