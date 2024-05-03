const client = require('../db/client')
const { DataTypes, Model } = require('sequelize');

class Post extends Model {}
Post.init(
    //Describe the columns and values
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text:{
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize: client,
        modelName: 'post',
        //turn fields off
        //timestamps: true
    }
) //inherited method from model

module.exports = Post