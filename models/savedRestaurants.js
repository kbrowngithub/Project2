module.exports = function(sequelize, DataTypes) {
    var SavedRestaurants = sequelize.define("SavedRestaurants", {
      name: DataTypes.STRING,
      restaurantAddr: DataTypes.STRING,
      restaurantPhone: DataTypes.STRING
    });
  
    SavedRestaurants.associate = function(models) {
      // Associating saved restaurant with user
      // if a saved restaurant is deleted, also delete any associated User
      SavedRestaurants.belongsTo(models.User, {
        onDelete: "cascade"
      });
    };
  
    return SavedRestaurants;
  };