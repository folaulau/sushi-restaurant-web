import Carousel from 'react-bootstrap/Carousel';
import './landingpage_top.css';
import rev1 from '../../images/landingpage/rev_img1.png';
import rev2 from '../../images/landingpage/rev_img2.png';
import rev3 from '../../images/landingpage/rev_img3.png';

function LandingPage_Top() {

    return (
        <Carousel variant="dark">
            <Carousel.Item>
                <div className='row'>
                    <div className='col-6'>
                        <img
                            className="landing-carousel"
                            src={rev1}
                            alt="First slide"
                        />
                    </div>  
                    <div className='col-6 landing-carousel-title'>
                        <h3>True Taste of Sushi</h3>
                        <button type="button" className="btn btn-outline-primary">Order Online</button>
                    </div>  
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='row'>
                    <div className='col-6'>
                        <img
                            className="landing-carousel"
                            src={rev2}
                            alt="First slide"
                        />
                    </div>  
                    <div className='col-6 landing-carousel-title'>
                        <h3>True Taste of Sushi</h3>
                        <button type="button" className="btn btn-outline-primary">Order Online</button>
                    </div>  
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className='row'>
                    <div className='col-6'>
                        <img
                            className="landing-carousel"
                            src={rev3}
                            alt="First slide"
                        />
                    </div>  
                    <div className='col-6 landing-carousel-title'>
                        <h3>True Taste of Sushi</h3>
                        <button type="button" className="btn btn-outline-primary">Order Online</button>
                    </div>  
                </div>
            </Carousel.Item>
        </Carousel>
    );
  
}

export default LandingPage_Top;
