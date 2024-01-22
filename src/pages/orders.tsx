import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useEffect} from "react";

function Orders() {

  // const [profile, setProfile] = useState({})

  useEffect(() => {
    console.log("Orders page")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
        <div className="container">
          
          Orders
        </div>
      <Footer />
    </>
  );
}

export default Orders;
