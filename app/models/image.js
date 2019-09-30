module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
      id_user: DataTypes.STRING,
      url: DataTypes.STRING,
    });
  
    return Image;
  }