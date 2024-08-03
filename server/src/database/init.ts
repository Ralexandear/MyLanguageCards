import { DataTypes } from 'sequelize'
import * as Models from './models'
import sequelize from './sequelize'

Models.User.init(
  {
    id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false},
    username: { type: DataTypes.STRING(30), allowNull: false}
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'user'
  }
)


async function init () {
  await Promise.all([
    sequelize.authenticate()
      .then(() => sequelize.sync())
      .then(async () => {
        for (const ModelsName of Object.keys(Models) as Array<keyof typeof Models>){
          await Models[ ModelsName ].sync()
        }
      })
      .then(() => console.log('Postgres is ready')),
  ]);
};


export const DatabaseInitialisationPromise = init();
export default DatabaseInitialisationPromise;
