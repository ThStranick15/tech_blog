const client = require('../db/client')
const { DataTypes, Model } = require('sequelize');

class Comment extends Model {}
Comment.init(
    //Describe the columns and values
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize: client,
        modelName: 'comment',
        //turn fields off
        //timestamps: true
    }
) //inherited method from model

module.exports = Comment