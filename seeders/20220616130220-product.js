"use strict";
const { default: axios } = require("axios");
const generateSlug = require("../helper/slug.helper");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const category = [
      { name: "Baju", code: "4k" },
      { name: "Kendaraan", code: "j" },
      { name: "Elektronik", code: "e6" },
      { name: "Hobi", code: "1m" },
      { name: "Kesehatan", code: "1tj" },
    ];

    let data = [];

    const getData = async (ctg, token) => {
      try {
        const uniqloData = await axios.get(
          `https://api.bukalapak.com/feeds/categories?strategy=category-recommendation&category_id=${ctg.code}&limit=18&access_token=${token}`
        );
        // .then((a) => console.log(a.data));

        const res = uniqloData.data.data.map((a) => {
          let d = {
            name: a.product.name,
            price: a.product.price.toString(),
            description: a.product.description,
            slug: generateSlug(a.product.name),
            categories: [ctg.name],
            sellerId: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
            status: "published",
            images: a.product.images.large_urls,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          data.push(d);
          return d;
        });

        // console.log(uniqloData);
        // return uniqloData;
        // data = [...res];
      } catch (error) {
        console.log(error);
      }
    };

    // const test = getData(category[0], process.env.BL_KEY);

    // test.then((a) => console.log(a.data.data));

    category.forEach((element) => {
      getData(element, process.env.BL_KEY);
    });

    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec
    // console.log(data);
    await queryInterface.bulkInsert("Products", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
