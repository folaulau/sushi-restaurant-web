import Header from "../layout/header";
import Footer from "../layout/footer";
import { useState , useEffect} from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import FirebaseApi from "../api/FirebaseApi";
import UserApi from "../api/UserApi";

function SignIn() {

  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "folaudev+"+Math.floor(Math.random() * 1000000000)+"@gmail.com",
    password: "Test1234!"
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // signUpWithEmailAndPassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const signInWithEmailAndPassword = () => {
      console.log(userInfo)
      
      if(!validate(userInfo)){
        return;
      }

      FirebaseApi.signInWithEmail(userInfo.email, userInfo.password)
      .then((userCredential) => {
  
        // console.log("userCredential", userCredential);

        userCredential.user.getIdToken()
        .then((token)=>{
          let authentication = {
            "token": token
          };

          UserApi.authenticate(authentication).then((response) => {
            console.log("response: ", response);

            navigate("/sign-up/create-profile");
          }).catch((error) => {
            console.error("Error: ", error);
          });
        });

      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const validate = (userInfo: any) => {

    if(!validateEmail(userInfo.email)){
      setErrorMsg("Email is invalid")
      return false;
    }

    return true;
  }

  const validateEmail = (email: string) => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {
      return true;
    }

    return false;
  }

  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
          <h1>Sign In</h1>
          
          {errorMsg && 
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              </div>
            </div>
          }

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Email Address</label>
              <input 
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={userInfo.email}
              onChange={handleInputChange}
              required
              className="form-control" 
              placeholder="johndoe@gmail.com"/>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Password</label>
              <input
              id="password"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={handleInputChange}
              required
              className="form-control"
              />
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="d-grid gap-2">
              <button onClick={()=>signInWithEmailAndPassword()} type="button" className="btn btn-primary">Sign In</button>
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

export default SignIn;
