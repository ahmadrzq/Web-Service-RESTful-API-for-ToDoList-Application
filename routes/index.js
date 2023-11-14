const express = require('express')
const routes = express.Router()

// auth routes
const authRoutes = require('./auth/authRoutes')
routes.use("/auth", authRoutes)

// todo routes
const todoRoutes = require('./todo/todoRoutes')
routes.use("/todos", todoRoutes)

module.exports = routes