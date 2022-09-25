const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/thoughts/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    route('/thoughts/:thoughtId/reactions/:reactionId')
    .post(addReaction)
    .delete(removeReaction)
module.exports = router;