import { Sequelize, DataTypes } from 'sequelize';
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { resolve, dirname } from 'path';
import sequelize from '../database/connections.js';
import config from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class DatabaseLoader {
  public static db: { [key: string]: any } = {};

  static async connectDb() {
    await sequelize.authenticate();

    const modelsPath = resolve(__dirname, '../database/models');

    const modelFiles = readdirSync(modelsPath).filter(
      (file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js'
    );

    for (const file of modelFiles) {
      // Convert the file path to a file:// URL
      const filePath = pathToFileURL(resolve(modelsPath, file)).href;
      const { default: model } = await import(filePath);
      const initializedModel = model(sequelize, DataTypes);
      this.db[initializedModel.name] = initializedModel;
    }

    Object.keys(this.db).forEach((modelName) => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db);
      }
    });

    this.db.sequelize = sequelize;
    this.db.Sequelize = Sequelize;

    console.info(
      `Database: ${config.database.name} connected with URI ${config.database.host}:${config.database.port}`
    );

    return this.db;
  }

  static getInstance() {
    if (Object.keys(this.db).length === 0) {
      throw new Error('DB has not been initialized');
    }
    return this.db;
  }

  static async close() {
    if (Object.keys(this.db).length === 0) {
      throw new Error('DB has not been initialized');
    }
    await this.db.sequelize.close();
    this.db = {};
  }
}
