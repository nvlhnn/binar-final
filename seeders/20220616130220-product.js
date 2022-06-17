'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert(
      "Products",
      [
        {
          name:"Sea Stone",
          price: "420000",
          categories:[
            "hobi",
            "kesehatan"
          ],
          description:"Seastone is a naturally-occurring—but immensely rare—mineral substance, best known for its negation of Devil Fruit abilities. Though it originates from Wano Country, Seastone is currently utilized in many inventions and devices across the world. As the most advanced research on it was conducted by the Marine scientist Dr. Vegapunk, its use is particularly common among the Marines and World Government",
          status: "published" ,
          seller: "1",
          images: [
            "cloudinary.contoh-url-gambar-1.com",
            "cloudinary.contoh-url-gambar-2.com",
            "cloudinary.contoh-url-gambar-3.com"
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Products", null, {});
  }
};
