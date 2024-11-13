/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ลบคอลัมน์ `username` จากตาราง `Users`
    await queryInterface.removeColumn('Users', 'username');
  },
  down: async (queryInterface, Sequelize) => {
    // เพิ่มคอลัมน์ `username` กลับไป (ในกรณีที่ต้องการย้อนกลับการ migration)
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: true, // เปลี่ยนเป็น false หากต้องการให้เป็นคอลัมน์ที่ต้องกรอก
    });
  },
};
