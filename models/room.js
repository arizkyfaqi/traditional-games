module.exports = (sequelize, DataType) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  // Room.associate = (models) => {
  //   Room.hasMany(models.UserGameHistory);
  // };

  return Room;
};
