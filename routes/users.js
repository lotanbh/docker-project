const express = require('express');
const { getAllUsers,getUserById, createUser, deleteUser, updateUser } = require('../controllers/users.controller');

const router = express.Router();

router.get("/",getAllUsers);
router.get("/:id",getUserById);
router.post("/",createUser);
router.delete("/:id",deleteUser);
router.put("/:id",updateUser)


module.exports = router;