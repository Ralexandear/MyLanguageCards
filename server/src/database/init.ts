import { DataTypes } from 'sequelize'
import * as Models from './models'
import sequelize from './sequelize'
import { UserRoleType } from '../types/UserRoleType';

Models.User.init(
  {
    id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false },
    _username: { type: DataTypes.STRING(30), allowNull: false },
    _password: { type: DataTypes.STRING, allowNull: false },
    _role: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'user' as UserRoleType }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'user'
  }
)


Models.Card.init(
  {
    id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false },
    vocabularyId: { type: DataTypes.NUMBER, allowNull: false },
    _source: { type: DataTypes.STRING, allowNull: false },
    _target: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    tableName: 'cards',
    modelName: 'card'
  }
)


Models.Vocabulary.init(
  {
    id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true, allowNull: false },
    userId: { type: DataTypes.NUMBER, allowNull: false },
    _sourceLanguageLabel: { type: DataTypes.STRING, allowNull: false },
    _targetLanguageLabel: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    tableName: 'vocabularies',
    modelName: 'vocabulary'
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
