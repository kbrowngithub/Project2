module.exports = function(sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
      restaurantName: DataTypes.STRING,
      restaurantAddr: DataTypes.STRING,
      restaurantPhone: DataTypes.STRING
    });
    return Restaurant;
  };  