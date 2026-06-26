const express = require('express');
const { getAllUsers,getUserById, createUser, deleteUser, updateUser } = require('../controllers/users.controller');

const routes = express.Router();

routes.get("/",getAllUsers);
routes.get("/:id",getUserById);
routes.post("/",createUser);
routes.delete("/:id",deleteUser);
routes.put("/:id",updateUser)


module.exports = routes;