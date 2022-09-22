import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import Auth from '../components/auth/auth';
import { Link } from "react-router-dom";
import CartIcon from "../components/cart-icon";
import BackendAPI from '../api/Backend';


function Header() {

  const [auth, setAuth] = useState({uuid:""});

  useEffect(() => {

    checkBackendService();

    let auth = Auth.getAuth();
    setAuth(auth)
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const checkBackendService = () => {
    
    BackendAPI.getBackendStatus()
    .then(response => {
      console.log("response, ", response)
    }).catch((error)=>{
      console.log("error, ", error)
    });

  }


  if(!auth){
    return (
      <PublicHeader/>
    );
  }else{
    return (
      <>
        <header className="container mt-3">
          <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <a
              href="/"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
              <img src={logo} alt="logo" />
              <span className="fs-4">Sushi</span>
            </a>

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">

              <Link to="/menu" className="me-3 py-2 text-dark text-decoration-none">Menu</Link>
              
              <Link to="/reservation" className="me-3 py-2 text-dark text-decoration-none">Reservation</Link>

              <Link to="/account" className="me-3 py-2 text-dark text-decoration-none">Account</Link>

              <CartIcon />

            </nav>
          </div>
        </header>
      </>
    );
  }
  
  
}

export default Header;

function PublicHeader() {

  const [backendInfo, setBackendInfo] = useState({down: false,status:""});

  useEffect(() => {
    checkBackendService();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkBackendService();
      // check backend service every 15 minutes
    }, 1000 * 60 * 15);
    return () => clearInterval(interval);
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const checkBackendService = () => {
    
    let info = {};
    let status = {};
    BackendAPI.getBackendStatus()
    .then(response => {
      console.log("backend status response, ", response)

      let data = response.data;
      info = data['sushi']

      /**
       * assume that rds takes longer to finish its execution(turn on/off)
       */

      if(info['rdsDBInstanceStatus']==='stopped'){
        status['down'] = true
        status['status'] = "stopped"
      }else if(info['rdsDBInstanceStatus']==='starting'){
        status['down'] = true
        status['status'] = "starting up... take up to 5 minutes"
      }else if(info['rdsDBInstanceStatus']==='available' && info['ecs-runningCount']===1){
        status['down'] = false
        status['status'] = "running"
      }else if(info['rdsDBInstanceStatus']==='stopping'){
        status['down'] = true
        status['status'] = "turning off(5 minutes)... wait til it's fully turned off to be turned on again"
      }

      setBackendInfo(status)
    }).catch((error)=>{
      console.log("backend status error, ", error)
      status['down'] = true
      status['status'] = "stopped"
      setBackendInfo(status)
    });

  }

  const turnOnBackendServices = () => {

    BackendAPI.turnOnBackendServices()
    .then(response => {
      console.log("turn on response 1, ", response)
    }).catch((error)=>{
      console.log("turn on error 1, ", error)
      BackendAPI.turnOnBackendServices()
      .then(response => {
        console.log("turn on response 2, ", response)
        checkBackendService();
      }).catch((error)=>{
        console.log("turn on error 2, ", error)
      });
    });
  }

  return (
    <header className="container mt-3">
      {
        backendInfo.down && 
        <>
          <div className='row'>
            <div className='col-12 text-center'>
              <div className='row'>
                <div className='col-12'>
                  <h5>Backend service is turned off to save money when there's no activity for 15 minutes</h5>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 col-sm-12'>
                  backend status: {backendInfo.status}
                  <br></br>
                  {
                    backendInfo.status==="stopped" && 
                    <button onClick={()=>turnOnBackendServices()} type="button" className="btn btn-outline-primary btn-sm">Start Backend</button>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </>
      }
      
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <img src={logo} alt="logo" />
          <span className="fs-4">Sushi</span>
        </a>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">

          <Link to="/menu" className="me-3 py-2 text-dark text-decoration-none">Menu</Link>
          
          <Link to="/reservation" className="me-3 py-2 text-dark text-decoration-none">Reservation</Link>

          <Link to="/signup" className="me-3 py-2 text-dark text-decoration-none">Sign Up</Link>

          <Link to="/signin" className="me-3 py-2 text-dark text-decoration-none">Sign In</Link>

          <CartIcon />

        </nav>
      </div>
    </header>
  );
}