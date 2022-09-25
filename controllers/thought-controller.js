const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
    },

    // gets a single thought
    getThoughtById(req, res) {
        Thought.findOne({ _id: params.id })
    },

    // creates thought
    createThought(req, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: params._id },
                {$push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'head empty, no thoughts' });
                return
            } else {
                res.json(dbUserData)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // updates the thought
    updateThought({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'heady empty, no thoughts' });
                return;
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch(err => res.status(404).json(err))
    },

    // deletes thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'head empty no thoughts' });
                return;
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch(err => res.status(400).json(err))
    },

    // adds reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thoughts' });
                return;
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch(err => res.json(err))
    },

    // deletes reaction from thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: { reactionId:params.reactionId }}},
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thoughts' });
                return;
            } else {
                res.json(dbThoughtData)
            }
        })
        .catch(err => res.json(err))
    }

}

module.exports = thoughtController;