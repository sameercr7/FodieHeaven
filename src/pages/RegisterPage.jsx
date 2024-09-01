import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-react-ui-kit';
// import './register.css'; // Include your CSS for additional styling

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [vegOrNonVeg, setVegOrNonVeg] = useState('veg');
  const [place, setPlace] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, password, name, age, vegOrNonVeg, place, mobileNumber });
      window.location.href = '/login'; // Redirect to Login Page
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

              <div className="d-flex flex-row align-items-center mb-4 col-6">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Username' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4  col-6">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 col-6">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Name' id='form3' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 col-6">
                <MDBIcon fas icon="calendar-day me-3" size='lg'/>
                <MDBInput label='Age' id='form4' type='number' value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 col-6">
                <MDBIcon fas icon="utensils me-3" size='lg'/>
                <MDBDropdown>
                  <MDBDropdownToggle tag='button' className='btn btn-outline-primary'>
                    {vegOrNonVeg === 'veg' ? 'Veg' : 'Non-Veg'}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem onClick={() => setVegOrNonVeg('veg')}>Veg</MDBDropdownItem>
                    <MDBDropdownItem onClick={() => setVegOrNonVeg('non-veg')}>Non-Veg</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </div>

              <div className="d-flex flex-row align-items-center mb-4 col-6">
                <MDBIcon fas icon="map-marker-alt me-3" size='lg'/>
                <MDBInput label='Place' id='form6' type='text' value={place} onChange={(e) => setPlace(e.target.value)} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 col-6">
                <MDBIcon fas icon="phone me-3" size='lg'/>
                <MDBInput label='Mobile Number' id='form7' type='text' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
              </div>

              {error && (
                <p className="text-danger text-center mb-4">{error}</p>
              )}

              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default RegisterPage;
