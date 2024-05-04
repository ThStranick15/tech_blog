const client = require('../db/client')
const { DataTypes, Model } = require('sequelize');

class User extends Model {
    validatePass(password) {
        if(password == this.password){
            return true
        }
        return false
    }
}
User.init(
    //Describe the columns and values
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: client,
        modelName: 'user',
        //turn fields off
        //timestamps: true
    }
) //inherited method from model



module.exports = User