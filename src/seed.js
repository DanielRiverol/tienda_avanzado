import mongoose from "mongoose";
import { fakerES_MX as faker } from "@faker-js/faker";
import Customer from "./models/customer.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";

const seedDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dani:RmCCU0Wfh1utAV1F@cluster0.lfr0tyx.mongodb.net/tienda?appName=Cluster0",
    );
    // OJO CON ESTO
    await Customer.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const customers = [];
    for (let i = 0; i < 3000; i++) {
      const first_name = faker.person.firstName().toLowerCase();
      const first_name_formated = first_name.replaceAll(" ", "_");
      const last_name = faker.person.lastName().toLowerCase();
      const last_name_formated = last_name.replaceAll(" ", "_");

      customers.push({
        first_name,
        last_name,
        email: `${first_name_formated}.${last_name_formated}${i}@test.com`,
      });
    }

    const createdCustomers = await Customer.insertMany(customers);

    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push({
        name: faker.commerce.product().toLocaleLowerCase(),
        price: faker.number.int({ min: 10, max: 1000 }),
      });
    }
    const createdProduct = await Product.insertMany(products);

    for (let i = 0; i < 5; i++) {
      await Order.create({
        code: `ORD-00${i + 1}`,
        customer: createdCustomers[i]._id,
        products: [createdProduct[i]._id, createdProduct[i + 1]._id],
        total: faker.number.int({ min: 100, max: 2000 }),
      });
    }

    console.log("Base de datos sembrada correctamente");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


seedDB()