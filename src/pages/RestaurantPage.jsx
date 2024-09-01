import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  useEffect(() => {
    // Fetch restaurant data on component mount
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getRestaurantDetails');
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } catch (err) {
        console.error('Error fetching restaurants', err);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    // Apply search and filter criteria
    const applyFilters = () => {
      let filtered = restaurants;

      if (search) {
        filtered = filtered.filter(restaurant =>
          restaurant.restaurantName.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (vegOnly) {
        filtered = filtered.filter(restaurant =>
          restaurant.vegOrNonVegType === 'veg'
        );
      }

      setFilteredRestaurants(filtered);
    };

    applyFilters();
  }, [search, vegOnly, restaurants]);

  return (
    <div>
      <h2>Restaurants</h2>

      <Form>
        <Form.Group controlId="search">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by restaurant name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="vegFilter">
          <Form.Check
            type="checkbox"
            label="Show only Veg"
            checked={vegOnly}
            onChange={() => setVegOnly(!vegOnly)}
          />
        </Form.Group>
      </Form>

      <Row>
        {filteredRestaurants.map(restaurant => (
          <Col key={restaurant.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>{restaurant.restaurantName}</Card.Title>
                <Card.Text>
                  <strong>Dishes:</strong> {restaurant.dishes.join(', ')}
                </Card.Text>
                <Card.Text>
                  <strong>Cuisines:</strong> {restaurant.cuisines}
                </Card.Text>
                <Card.Text>
                  <strong>Diet Tags:</strong> {restaurant.dietTags}
                </Card.Text>
                <Card.Text>
                  <strong>Type:</strong> {restaurant.vegOrNonVegType}
                </Card.Text>
                <Card.Text>
                  <strong>Rating:</strong> {restaurant.rating || 'N/A'}
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RestaurantPage;
