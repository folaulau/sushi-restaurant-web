import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import LandingPage_Top from '../components/carousel/landingpage_top';

function Home() {
  return (
    <>
      <Header />
        <div className="container">
          <LandingPage_Top/>
        </div>
      <Footer />
    </>
  );
}

export default Home;
