import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useEffect, useState} from "react";
import FirebaseApi from "../api/FirebaseApi";
import UserApi from "../api/UserApi";

function Account() {

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

  const handleAddressInputChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
    
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
                  <input 
                    name="street" 
                    onChange={handleAddressInputChange}
                    value={address.street || ''} 
                    className="form-control" />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Street 2</label>
                  <input 
                    name="street2" 
                    onChange={handleAddressInputChange}
                    value={address.street2 || ''} 
                    className="form-control" />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-3">
                  <label className="form-label">City</label>
                  <input 
                    name="city" 
                    onChange={handleAddressInputChange}
                    value={address.city || ''}
                    className="form-control" />
                </div>
                <div className="col-12 col-sm-3">
                  <label className="form-label">State</label>
                  <input 
                    name="state" 
                    onChange={handleAddressInputChange}
                    value={address.state || ''}
                    className="form-control" />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label">Zipcode</label>
                  <input 
                    name="zipcode" 
                    onChange={handleAddressInputChange}
                    value={address.zipcode || ''}
                    className="form-control" />
                </div>
              </div>

            </div>
          </div>

          <div className="row mt-3 mb-4">
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
              <div className="row mt-3">
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
