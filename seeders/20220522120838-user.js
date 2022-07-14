"use strict";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

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

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "user",
          city: "yogyakarta",
          address: "catur tunggal, rt 2 rw 5 sleman yogyakarta",
          phone: "081221113868",
          email: "user@gmail.com",
          verified: true,
          profilePicture:
            "https://res.cloudinary.com/dvvbkxfno/image/upload/v1657716992/rtjc5jh82hf9f6uv2msa.png",
          password: bcrypt.hashSync("User1234567", salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user2",
          city: "yogyakarta",
          address: "catur tunggal, rt 2 rw 5 sleman yogyakarta",
          phone: "081221113868",
          email: "user2@gmail.com",
          verified: true,
          profilePicture:
            "https://res.cloudinary.com/dvvbkxfno/image/upload/v1657612965/hugcah6j3jvprdtsykwd.jpg",
          password: bcrypt.hashSync("User1234567", salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user3",
          city: "yogyakarta",
          address: "catur tunggal, rt 2 rw 5 sleman yogyakarta",
          phone: "081221113868",
          email: "user3@gmail.com",
          verified: true,
          profilePicture:
            "https://res.cloudinary.com/dvvbkxfno/image/upload/v1657199217/y4k9q2vmvweq31n1wrsm.png",
          password: bcrypt.hashSync("User1234567", salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
