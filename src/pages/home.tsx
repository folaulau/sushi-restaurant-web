import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import LandingPage from '../components/carousel/landingpage';

function Home() {
  return (
    <>
      <Header />
        <div className="container">
          <LandingPage/>
        </div>
      <Footer />
    </>
  );
}

export default Home;
