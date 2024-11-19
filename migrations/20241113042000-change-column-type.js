/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // เพิ่มคอลัมน์ `villageId` ไปที่ตาราง `Users`
    await queryInterface.addColumn('Villages', 'subdistrict', {
      type: Sequelize.STRING, // หรือใช้ DataType อื่นตามที่เหมาะสม เช่น TEXT
      allowNull: true, // หรือกำหนดเป็น false ถ้าจำเป็นต้องมีค่าเสมอ
    });
  },
  down: async (queryInterface, Sequelize) => {
    // ลบคอลัมน์ `villageId` หากต้องการย้อนกลับการ migration
    await queryInterface.removeColumn('Villages', 'subdistrict');
  },
};
