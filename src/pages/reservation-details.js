import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import Footer from "../layout/footer";
import ReservationApi from "../api/ReservationApi";
import DateTimeUtils from "../utils/datetime";

function ReservationDetails() {

  let navigate = useNavigate();

  const uuid = new URLSearchParams(window.location.search).get(
    "uuid"
  );

  if(uuid==null && uuid.trim().length===0){
    navigate("/reservation");
  }

  const [reservation, setReservation]= useState({name:"", numberOfPeople:1, dateTime:""})
  const [bookedReservation, setBookedReservation]= useState({})
  const [showMessage, setShowMessage]= useState({updateNtc:false,errorNtc:false})


  const numberOfPeopleOptions = [1,2,3,4,5,6,7,8];

  // generate available time
  // 11am - 9pm
  const [dateTimeOptions, setDateTimeOptions]= useState([""])

  useEffect(() => {
    setDateTimeOptions(DateTimeUtils.getTimeSlots());
    getReservation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReservation = () => {
    ReservationApi.get(uuid)
    .then((response) => {
      let data = response.data;
      console.log("get reservation: ", data);
      updateReservation(data)
    })
    .catch((error)=>{
      console.log("error: ", error);
    });
  }

  const handleInputChange = (e) => {
    console.log("name, ", e.target.name)
    console.log("value, ", e.target.value)

    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  };

  const update = () => {

    let newReservation = reservation;

    newReservation['dateTime'] = DateTimeUtils.getDateTimeWithTime(newReservation.dateTime);

    console.log("newReservation, ", newReservation)

    ReservationApi.update(newReservation)
    .then((response) => {
      let data = response.data;
      console.log("updated reservation: ", data);
      updateReservation(data)

      setShowMessage({updateNtc:true,errorNtc:false})

      setTimeout(()=>{
        setShowMessage({updateNtc:false,errorNtc:false})
      }, 2000)

    })
    .catch((error)=>{
      console.log("error: ", error.response.data);
    });

  }

  const updateReservation = (res) => {

    res.dateTime = DateTimeUtils.getTimeAndAMPM(res.dateTime)

    setReservation(res);

    setBookedReservation(res);

  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12">
            
            <div className="row">
              <div className="col-12 col-md-12">
                <h4>Reservation Details</h4>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12 col-md-4">
                <div className="row">
                  <div className="col-6 col-md-3 text-end">
                    Name:
                  </div>
                  <div className="col-6 col-md-9 text-start">
                    {bookedReservation.name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-md-3 text-end">
                    Time:
                  </div>
                  <div className="col-6 col-md-9 text-start">
                    {bookedReservation.dateTime}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-md-3 text-end">
                    Guests:
                  </div>
                  <div className="col-6 col-md-9 text-start">
                    {bookedReservation.numberOfPeople}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
              {
                showMessage.updateNtc && 
                <div className="row">
                  <div className="col-12 col-md-12">
                    <div className="alert alert-info" role="alert">
                      Reservation has been updated!
                    </div>
                  </div>
                </div>
              }
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-12">
                <div className="row">
                  <div className="col-12 col-md-12">
                    <h5>Update Your Reservation</h5>
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
                    <button type="button" onClick={()=>update()} className="btn btn-outline-primary">Update</button>
                  </div>
                </div>
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

export default ReservationDetails;