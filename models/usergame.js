const bcrypt = require('bcrypt');
module.exports = (sequelize, DataType) => {
  const UserGame = sequelize.define(
    'UserGame',
    {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
      },
      username: {
        type: DataType.STRING,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (UserGame, options) => {
          {
            const salt = await bcrypt.genSalt(10);
            UserGame.password = await bcrypt.hash(UserGame.password, salt);
          }
        },
      },
    }
  );

  UserGame.prototype.validPassword = async (inputPassword, userPassword) => {
    return await bcrypt.compare(inputPassword, userPassword);
  };

  UserGame.associate = (models) => {
    UserGame.hasOne(models.UserGameBiodata, {
      foriegenKey: 'id',
    });
    UserGame.hasMany(models.UserGameHistory);
  };

  return UserGame;
};
