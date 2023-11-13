const express = require('express')
const routes = express.Router()

// auth routes
const authRoutes = require('./auth/authRoutes')
routes.use("/", authRoutes)

module.exports = routes