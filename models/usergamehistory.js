module.exports = (sequelize, DataType) => {
  const UserGameHistory = sequelize.define('UserGameHistory', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValu: DataType.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    game: {
      type: DataType.STRING,
      allowNull: false,
    },
    secore: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataType.STRING,
      allowNull: false,
    },
  });
  return UserGameHistory;
};
