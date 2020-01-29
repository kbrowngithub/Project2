module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    cell: DataTypes.INTEGER
  });

  User.associate = function(models) {
    // Associating User with Posts and saved restaurants
    // When a User is deleted, also delete any associated Posts or restaurants
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
    User.hasMany(models.SavedRestaurants, {
      onDelete: "cascade"
    });
  };

  return User;
};
