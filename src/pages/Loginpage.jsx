import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import './login.css'; // Ensure to include your CSS

import BackgroundImage from '../assets/images/top-view-delicious-food-with-copy-space.jpg'; // Update path as needed
import Logo from '../assets/images/d84d8d9e-74cb-4474-a3b3-a9a1f5c598c8.jpg'; // Update path as needed

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      
      if (response.data.isAdmin) {
        window.location.href = '/addRestaurantDetails'; // Redirect to Add Restaurant Details Page
      } else {
        window.location.href = '/restaurants'; // Redirect to Restaurant Page
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>

      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>

        {/* Alert */}
        {error && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setError('')}
            dismissible
          >
            {error}
          </Alert>
        )}

        {/* Username */}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Admin Checkbox */}
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check
            type="checkbox"
            label="Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button className="w-100" variant="primary" type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </Button>

        {/* Forgot Password Link */}
        <div className="d-grid justify-content-end mt-2">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={() => {/* Handle forgot password */}}
          >
            Forgot password?
          </Button>
        </div>
      </Form>

      {/* Footer */}
     
    </div>
  );
};

export default LoginPage;
