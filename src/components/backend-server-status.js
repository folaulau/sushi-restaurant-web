import React, { useState, useEffect } from 'react';
import BackendAPI from '../api/Backend';

function BackendServerStatus(props) {

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
      info = process.env.REACT_APP_ENV ==="local" ? data : data['sushi']

      /**
       * assume that rds takes longer to finish its execution(turn on/off)
       */

      if(info['rdsDBInstanceStatus']==='stopped'){
        status['down'] = true
        status['status'] = "stopped"
      }else if(info['rdsDBInstanceStatus']==='starting'){
        status['down'] = true
        status['status'] = "starting up... take up to 5 minutes"
      }else if(info['rdsDBInstanceStatus']==='available' && info['ecsRunningCount']===1){
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
    <>
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
                    backendInfo.status==="stopped" && process.env.REACT_APP_ENV !=="local" && 
                    <button onClick={()=>turnOnBackendServices()} type="button" className="btn btn-outline-primary btn-sm">Start Backend</button>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default BackendServerStatus;