module.exports = (sequelize, DataType) => {
  const UserGameBiodata = sequelize.define('UserGameBiodata', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    fullname: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    phone: {
      type: DataType.BIGINT,
      allowNull: false,
    },
    role: {
      type: DataType.STRING,
      defaultValue: 'user',
    },
  });

  UserGameBiodata.associate = (models) => {
    UserGameBiodata.belongsTo(models.UserGame, {
      onDelete: 'CASCADE',
      foreignKey: 'UserGameId',
      allowNull: false,
      hooks: true,
    });
  };

  return UserGameBiodata;
};
