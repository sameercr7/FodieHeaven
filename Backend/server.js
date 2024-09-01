require('dotenv').config(); // Load environment variables
const Review = require('./Model/Review');
const Menu = require('./Model/Menu');
const express = require('express');
const cors = require('cors'); // Import cors
const sequelize = require('./Config/database');
const restaurantController = require('./Controller/restaurantController');
const bodyParser = require('body-parser');
const { register, login } = require('./Controller/userController');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware'); // Import auth middleware

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// User Routes
app.use('/api/users', userRoutes);
app.post('/api/users/register', register);
app.post('/api/users/login', login);
app.use('/api', userRoutes);

// Restaurant Routes with Authorization
app.post('/api/restaurants/add', authMiddleware, restaurantController.addRestaurantDetails);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.log('Error: ' + err);
});
