const User = require("../model/User");

async function getAllUsers(req, res) {
    try {
        const users =  await User.find();
        res.status(200).json(users);


    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message})

    }


}

async function getUserById(req, res) {
    try{
        const user= await User.findById(req.params.id);
        console.log(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "Couldn't find a user for you." })
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })

    }


}


async function createUser(req,res) {
    
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({ message: "User creation failed ", error: error.message });

    }

}

async function deleteUser(req,res) {
    try {
        const deletedUser =  await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: " User not found "})
        }
        res.status(200).json({ message: " User deleted succcessfully ", user: deletedUser })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })

    }
    
}

async function updateUser(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}