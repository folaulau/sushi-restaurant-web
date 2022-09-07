import React from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import LandingPage from '../components/carousel/landingpage';
import Menu from './menu';

function Home() {
  return (
    <>
      <Header />
        <div className="container">
          
          <div className="row">
            <div className="col-12">
              <LandingPage/>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <Menu from='home'/>
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Home;
