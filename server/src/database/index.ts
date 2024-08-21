import { DataTypes } from 'sequelize'
import sequelize from './sequelize'
import * as Models from './models'
import { UserRoleType } from '@shared/types/UserRoleType'

Models.User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    // _username: { type: DataTypes.STRING(30) },
    _password: { type: DataTypes.STRING, allowNull: false },
    _email: { type: DataTypes.STRING, allowNull: false },
    _role: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'user' as UserRoleType },
    _languageId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'user'
  }
)


Models.Card.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    vocabularyId: { type: DataTypes.INTEGER, allowNull: false },
    _learningWord: { type: DataTypes.STRING, allowNull: false },
    _translation: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    tableName: 'cards',
    modelName: 'card'
  }
)


Models.Language.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    _label: { type: DataTypes.STRING , allowNull: false },
  }, {
    sequelize,
    tableName: 'languages',
    modelName: 'language'
  }
)

Models.Vocabulary.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    _label: { type: DataTypes.STRING },
    _learningLanguageId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    tableName: 'vocabularies',
    modelName: 'vocabulary'
  }
)

Models.User.hasMany(Models.Vocabulary, {foreignKey: "userId"})
Models.Vocabulary.hasMany(Models.Card, {foreignKey: "vocabularyId"});



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
