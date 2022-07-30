import React, { useState, useEffect } from 'react';
import Auth from '../components/auth/auth';
import PublicHeader from './header_pub';

function Header() {

  const [auth, setAuth] = useState({uuid:""});

  useEffect(() => {
    let auth = Auth.getAuth();
    setAuth(auth)
  }, []);// eslint-disable-line react-hooks/exhaustive-deps


  if(!auth){
    return (
      <PublicHeader/>
    );
  }else{
    return (
      <div>
        <header>
          Header
        </header>
      </div>
    );
  }
  
  
}

export default Header;
