import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useEffect} from "react";

function Profile() {

  // const [profile, setProfile] = useState({})

  useEffect(() => {
    console.log("Profile page")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
        <div className="container">
          
          Profile
        </div>
      <Footer />
    </>
  );
}

export default Profile;
