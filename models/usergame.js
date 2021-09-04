module.exports = (sequelize, DataType) => {
  const UserGame = sequelize.define('UserGame', {
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
  });

  UserGame.associate = (models) => {
    UserGame.hasOne(models.UserGameBiodata, {
      foriegenKey: 'id',
    });
    UserGame.hasMany(models.UserGameHistory);
  };

  return UserGame;
};
