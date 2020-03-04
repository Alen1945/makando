const Users = require('express').Router()
const checkAuthToken = require('../middleware/authMiddleware')
const { RegisterUser, LoginUser, UpdateUser, GetProfile, DeleteUser } = require('../controllers/users')

Users.get('/profile', checkAuthToken, GetProfile)
Users.post('/register', RegisterUser)
Users.post('/login', LoginUser)
Users.patch('/update', checkAuthToken, UpdateUser)
Users.delete('/delete', checkAuthToken, DeleteUser)

module.exports = Users
