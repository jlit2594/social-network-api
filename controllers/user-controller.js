const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get user by id
    getUserById(req, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id!'})
                return;
            } else {
                res.json(dbUserData)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400.json(err));
        });
    },

    // creates new user
    createUser(req, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>res.status(400).json(err))
    },

    // updates user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id' })
                return;
            } else {
                res.json(dbUserData);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // deletes user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with that id '})
                return;
            } else {
                res.json(dbUserData)
            }
        })
        .catch(err => res.status(400).json(err))
    },

    // adds friend to the friend array
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body }},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found' });
                return
            } else {
                res.json(dbUserData)
            }
        })
        .catch(err => res.json(err))
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendId:params.friendId }}},
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

module.exports = userController;