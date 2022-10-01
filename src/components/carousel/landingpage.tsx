import Carousel from 'react-bootstrap/Carousel';
import './landingpage.css';
import rev1 from '../../images/landingpage/rev_img1.png';
import rev2 from '../../images/landingpage/rev_img2.png';
import rev3 from '../../images/landingpage/rev_img3.png';
import { Link } from "react-router-dom";


const slides = [
    {
        id: 1,
        img: rev1
    },{
        id: 2,
        img: rev2
    },{
        id: 3,
        img: rev3
    },
]

function LandingPage_Top() {

    return (
        <Carousel variant="dark">
            {
                slides.map((slide)=>(
                    <Carousel.Item key={slide.id}>
                        <div className='row'>
                            <div className='col-6'>
                                <img
                                    className="landing-carousel"
                                    src={slide.img}
                                    alt="First slide"
                                />
                            </div>  
                            <div className='col-6 landing-carousel-title'>
                                <h3>True Taste of Sushi</h3>
                                <Link to={`/reservation`} className="btn btn-outline-primary me-2">Book a Table</Link> <Link to={`/menu`} className="btn btn-outline-primary">Order Online</Link>
                            </div>  
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    );
  
}

export default LandingPage_Top;
