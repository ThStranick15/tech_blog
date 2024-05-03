const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
}) //singular belongs to method

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
}) //one to many

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
}) //singular belongs to method

module.exports = {User, Post, Comment}