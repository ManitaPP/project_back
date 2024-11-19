/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // เพิ่มคอลัมน์ `villageId` ไปที่ตาราง `Users`
    await queryInterface.addColumn('Users', 'villageId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    // ลบคอลัมน์ `villageId` หากต้องการย้อนกลับการ migration
    await queryInterface.removeColumn('Users', 'villageId');
  },
};
