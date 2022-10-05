import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import Footer from "../layout/footer";
import ReservationApi from "../api/ReservationApi";
import Storage from "../store/storage";
import DateTimeUtils from "../utils/datetime";
function Reservation() {

  let navigate = useNavigate();

  const uuid = new URLSearchParams(window.location.search).get(
    "uuid"
  );

  if(uuid!=null && uuid.trim().length>0){
    navigate("/reservation/details?uuid="+uuid);
  }

  const [reservation, setReservation]= useState({name:"", numberOfPeople:1, dateTime:""})
  
  const numberOfPeopleOptions = [1,2,3,4,5,6,7,8];

  // generate available time
  // 11am - 9pm
  const [dateTimeOptions, setDateTimeOptions]= useState([""])
  
  useEffect(() => {

    let timeSlots = DateTimeUtils.getTimeSlots();

    setReservation({name:"", numberOfPeople:1, dateTime:timeSlots[0]})

    setDateTimeOptions(timeSlots)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  };

  const create = () => {

    let newReservation = reservation;

    console.log("newReservation.dateTime, ", newReservation.dateTime)

    newReservation['dateTime'] = DateTimeUtils.getDateTimeWithTime(newReservation.dateTime);

    console.log("newReservation, ", newReservation)

    ReservationApi.create(newReservation)
    .then((response) => {
      console.log("response.data: ", response.data);

      Storage.setJson("reservation", response.data)

      navigate("/reservation/details?uuid="+response.data.uuid);
    })
    .catch((error)=>{
      console.log("error: ", error.response.data);
    });

  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12">
            
            <div className="row">
              <div className="col-12 col-md-12">
                <h4>Make a Reservation</h4>
                <p>We are full capacity at 110 guests. Maximum of 8 guests per party</p>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input 
                  className="form-control" 
                  placeholder="John"
                  name="name"
                  value={reservation.name}
                  onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mb-3">
                  <label className="form-label">Number Of Guests</label>
                  <select 
                  className="form-select" 
                  name="numberOfPeople" 
                  value={reservation.numberOfPeople} 
                  onChange={handleInputChange}>
                  {
                    numberOfPeopleOptions.map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))
                  }
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="mb-3">
                  <label className="form-label">Time</label>
                  <select 
                  className="form-select" 
                  name="dateTime" 
                  value={reservation.dateTime} 
                  onChange={handleInputChange}>
                  {
                    dateTimeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))
                  }
                  </select>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-1 offset-md-11">
                <div className="d-grid gap-2">
                  <button type="button" onClick={()=>create()} className="btn btn-outline-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Reservation;
