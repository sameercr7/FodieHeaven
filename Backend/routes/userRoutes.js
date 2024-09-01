const express = require('express');
const { register, login } = require('../Controller/userController');
const { addRestaurantDetails } = require('../Controller/restaurantController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const { getRestaurantDetails } = require('../Controller/restaurantFetchController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add', authMiddleware, addRestaurantDetails); // Apply middleware


// Route for fetching restaurant details
router.get('/getRestaurantDetails', getRestaurantDetails);
module.exports = router;
