import React, { useState, useEffect } from 'react';
import Auth from '../components/auth/auth';
import PublicFooter from './footer_pub';

function Footer() {
  const [auth, setAuth] = useState({uuid:""});

  useEffect(() => {
    let auth = Auth.getAuth();
    setAuth(auth)
  }, []);// eslint-disable-line react-hooks/exhaustive-deps


  if(!auth){
    return (
      <PublicFooter/>
    );
  }else{
    return (
      <div>
        <header>
          Footer
        </header>
      </div>
    );
  }
}

export default Footer;
