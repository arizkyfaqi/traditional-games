module.exports = (sequelize, DataType) => {
  const UserGameHistory = sequelize.define('UserGameHistory', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    player_id: {
      type: DataType.UUID,
      allowNull: false,
    },
    room_id: {
      type: DataType.UUID,
      allowNull: false,
    },
    result: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  UserGameHistory.associate = (models) => {
    UserGameHistory.belongsTo(models.Room, { foriegenKey: 'room_id' });
  };

  return UserGameHistory;
};
