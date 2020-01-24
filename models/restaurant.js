module.exports = function(sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
      restaurantName: DataTypes.STRING,
      restaurantAddr: DataTypes.STRING,
      restaurantPhone: DataTypes.STRING
    });

    Restaurant.associate = function(models) {
      // Associating User with Posts
      // When a User is deleted, also delete any associated Posts

      Restaurant.hasMany(models.Post, {

      });
    };
    return Restaurant;
  };  