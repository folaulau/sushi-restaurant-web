import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import Footer from "../layout/footer";
import ReservationApi from "../api/ReservationApi";
import Storage from "../store/storage";

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

    let now = new Date();
    let hour = 10;// now.getHours();
    let minute = now.getMinutes();

    let availableSlots = []

    let closeHr = 21;// 9pm

    if(hour<=closeHr){

      // add cushion to allow users to get to the restaurant
      minute = (minute + 10);

      for(let i = hour; i<=20 ; i++){

        let ampm = i >= 12 ? 'pm' : 'am';

        let displayHour = i > 12 ? (i-12) : i;

        if(i == hour){
          if(minute<15){
            availableSlots.push(displayHour+":15 "+ampm)
          }
  
          if(minute<30){
            availableSlots.push(displayHour+":30 "+ampm)
          }
  
          if(minute<45){
            availableSlots.push(displayHour+":45 "+ampm)
          }

          if((i+1)>=12){
            ampm = 'pm'
          }

          if(displayHour===13){
            availableSlots.push((displayHour-1)+":00 "+ampm)
          }else{
            availableSlots.push((displayHour+1)+":00 "+ampm)
          }

        }else{

          availableSlots.push(displayHour+":15 "+ampm)
          availableSlots.push(displayHour+":30 "+ampm)
          availableSlots.push(displayHour+":45 "+ampm)

          if((i+1)>=12){
            ampm = 'pm'
          }

          if((displayHour+1)===13){
            availableSlots.push(1+":00 "+ampm)
          }else{
            availableSlots.push((displayHour+1)+":00 "+ampm)
          }
        }

      }

      setDateTimeOptions(availableSlots)

    }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation]);

  const handleInputChange = (e) => {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  };

  const padWithZero = (field) => {
    if(field<=9){
      return "0"+field;
    }
    return field;
  }

  const create = () => {

    let newReservation = reservation;

    let now = new Date();
    let year = now.getFullYear();
    let month = padWithZero(now.getMonth()+1);
    let date = padWithZero(now.getDate());

    let timeArray = newReservation.dateTime.split(" ");
    let ampm = timeArray[1];
    let hrTime =  timeArray[0].split(":");

    let hr = parseInt(hrTime[0]);

    if(ampm==="pm" && hr!=12){
      hr = (hr+12);
    }else{
      hr = padWithZero(hr);
    }

    let min = padWithZero(parseInt(hrTime[1]));

    let time = hr+":" + min +":00.000Z"

    let dateTime = year+"-"+month+"-"+date+"T"+time;
    //2022-09-14T1:15:00.000Z
    //2022-09-13T22:24:57.524Z
    // newReservation['dateTime'] = "2022-09-13T22:24:57.524Z";

    newReservation['dateTime'] = dateTime;

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
                  {/* <input 
                  type="number" 
                  className="form-control" 
                  placeholder="2"
                  name="numberOfPeople"
                  value={reservation.numberOfPeople}
                  onChange={handleInputChange}
                  /> */}
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
