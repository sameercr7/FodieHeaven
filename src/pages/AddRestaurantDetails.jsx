import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurantDetails = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [place, setPlace] = useState('');
  const [gstinNo, setGstinNo] = useState('');
  const [nearbyLandmark, setNearbyLandmark] = useState('');
  const [menus, setMenus] = useState(''); // Single string input
  const [dishes, setDishes] = useState('');
  const [cuisines, setCuisines] = useState('');
  const [dietTags, setDietTags] = useState('');
  const [vegOrNonVegType, setVegOrNonVegType] = useState(''); // Dropdown value
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/restaurants/add', {
        restaurantName,
        place,
        gstinNo,
        nearbyLandmark,
        menus, // Single string
        dishes,
        cuisines,
        dietTags,
        vegOrNonVegType
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Restaurant added successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add restaurant');
    }
  };

  return (
    <div>
      <h2>Add Restaurant Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Restaurant Name</label>
          <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
        </div>
        <div>
          <label>Place</label>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />
        </div>
        <div>
          <label>GSTIN No</label>
          <input type="text" value={gstinNo} onChange={(e) => setGstinNo(e.target.value)} required />
        </div>
        <div>
          <label>Nearby Landmark</label>
          <input type="text" value={nearbyLandmark} onChange={(e) => setNearbyLandmark(e.target.value)} />
        </div>
        <div>
          <label>Menus</label>
          <input type="text" value={menus} onChange={(e) => setMenus(e.target.value)} />
        </div>
        <div>
          <label>Dishes</label>
          <input type="text" value={dishes} onChange={(e) => setDishes(e.target.value)} />
        </div>
        <div>
          <label>Cuisines</label>
          <input type="text" value={cuisines} onChange={(e) => setCuisines(e.target.value)} />
        </div>
        <div>
          <label>Diet Tags</label>
          <input type="text" value={dietTags} onChange={(e) => setDietTags(e.target.value)} />
        </div>
        <div>
          <label>Veg or Non-Veg Type</label>
          <select value={vegOrNonVegType} onChange={(e) => setVegOrNonVegType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurantDetails;
