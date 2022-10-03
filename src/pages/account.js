import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useEffect, useState, useRef} from "react";
import FirebaseApi from "../api/FirebaseApi";
import UserApi from "../api/UserApi";
import Autocomplete from "react-google-autocomplete";

function Account() {

  const [addressAsLine, setAddressAsLine] = useState("");

  const addressUuidInput = useRef(null);

  const [profile, setProfile] = useState({
    id: "",
    uuid: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: ""
  })

  const [address, setAddress] = useState({
    id: "",
    uuid: "",
    street: "",
    street2: "",
    city: "",
    state: "",
    zipcode: ""
  })

  const [password, setPassword] = useState({
    new: "",
    current: ""
  })

  /**
   * 1. use left side navbar
   * 2. password reset
   * 3. profile
   * 4. orders
   * 
   */

  useEffect(() => {
    console.log("Account page")

    UserApi.getProfile()
    .then((response) => {
      console.log("get profile response: ", response.data);
      let user = response.data;
      setProfile(user)
      setAddress(user.address)
      setAddressAsLine(user.address.street)
    }).catch((error) => {
      console.error("Error: ", error);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    
  };

  const updateAddress = (place) => {
    const formattedAddress = place.formatted_address;

    let newAddress = {
      street: formattedAddress.split(",")[0],
      city: formattedAddress.split(",")[1].trim(),
      state: formattedAddress.split(",")[2].trim().split(" ")[0],
      zipcode: formattedAddress.split(",")[2].trim().split(" ")[1],
      country: formattedAddress.split(",")[3].trim(),
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    setAddress(newAddress);

    console.log("updated address: ", newAddress);
  };

  const handlePasswordInputChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
    
  };

  const saveProfile = () => {

    console.log("profile", profile)

    let user = profile;
    user['address'] = address

    UserApi.updateProfile(user)
    .then((response) => {
      console.log("updated profile response: ", response.data);
      setProfile(user)
      setAddress(user.address)
      setAddressAsLine(user.address.street)
    }).catch((error) => {
      console.error("Error: ", error);
    });
  }

  const updatePassword = () => {

    console.log("password", password)

    FirebaseApi.setNewPassword(password.new)
    .then((response) => {
      console.log("updated password response: ", response);
      setPassword({})
    }).catch((error) => {
      console.error("Error: ", error);
    });
  }

  return (
    <>
      <Header />
        <div className="container">
          
          <div className="row">
            <div className="col-12">

              <div className="row">
                <div className="col-12">
                  <h5>Profile</h5>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <label className="form-label">First Name</label>
                  <input 
                    name="firstName" 
                    onChange={handleProfileInputChange}
                    value={profile.firstName || ''} 
                    className="form-control" />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Last Name</label>
                  <input 
                    name="lastName"
                    onChange={handleProfileInputChange}
                    value={profile.lastName || ''} 
                    className="form-control" />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <label className="form-label">Phone</label>
                  <input 
                    name="phoneNumber" 
                    onChange={handleProfileInputChange}
                    value={profile.phoneNumber || ''} 
                    type="tel"
                    className="form-control" />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Date of Birth</label>
                  <input 
                    name="dob"
                    onChange={handleProfileInputChange}
                    value={profile.dob || ''} 
                    type="date"
                    className="form-control" />
                </div>
              </div>
             
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">

              <div className="row">
                <div className="col-12">
                  <h5>Delivery Home Address</h5>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <label className="form-label">Street</label>
                  <Autocomplete
                    type="deliveryAddress"
                    name="name"
                    id="name"
                    defaultValue={addressAsLine}
                    ref={addressUuidInput}
                    className="form-control"
                    apiKey="AIzaSyD1KPd02JBlblQ9l1HMZAge0300AtbvghY"
                    onPlaceSelected={(place, inputRef, autocomplete) =>
                      updateAddress(place)
                    }
                    style={{
                      border: '2px solid #85d8e7',
                      color: 'black'
                    }}
                    options={{
                      types: ['address'],
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Street 2</label>
                  <input 
                    name="street2" 
                    disabled={true}
                    value={address.street2 || ''} 
                    className="form-control" />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-3">
                  <label className="form-label">City</label>
                  <input 
                    name="city" 
                    disabled={true}
                    value={address.city || ''}
                    className="form-control" />
                </div>
                <div className="col-12 col-sm-3">
                  <label className="form-label">State</label>
                  <input 
                    name="state" 
                    disabled={true}
                    value={address.state || ''}
                    className="form-control" />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Zipcode</label>
                  <input 
                    name="zipcode" 
                    disabled={true}
                    value={address.zipcode || ''}
                    className="form-control" />
                </div>
              </div>

            </div>
          </div>

          <div className="row mt-4 mb-4">
            <div className="col-12 col-sm-2 offset-md-10">
              <div className="d-grid gap-2">
                <button onClick={()=>saveProfile()} className="btn btn-primary" type="button">Save</button>
              </div>
            </div>
          </div>

          <hr/>
          <div className="row">
            <div className="col-12">

              <div className="row">
                <div className="col-12">
                  <h4>Password Reset</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <label className="form-label">Current Password</label>
                  <input 
                    name="current"
                    onChange={handlePasswordInputChange}
                    value={password.current || ''} 
                    className="form-control" />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">New Password</label>
                  <input 
                    name="new"
                    onChange={handlePasswordInputChange}
                    value={password.new || ''} 
                    className="form-control" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-sm-2 offset-md-10">
                  <div className="d-grid gap-2">
                    <button onClick={()=>updatePassword()} className="btn btn-primary" type="button">Update</button>
                  </div>
                </div>
              </div>

            </div>
          </div>


        </div>
      <Footer />
    </>
  );
}

export default Account;
