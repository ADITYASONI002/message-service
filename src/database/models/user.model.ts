import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const users = sequelize.define('Users', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
      set(value: string) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      },
    },
    createdAt: {
      type: dataTypes.STRING,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: dataTypes.STRING,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });
  return users;
};
