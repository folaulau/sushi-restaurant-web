function padWithZero(field){
    if(field<=9){
      return "0"+field;
    }
    return field;
}

const DateTimeUtils = {

    getTimeAndAMPM: (dateAsString) => {
          
        let datetime = new Date(dateAsString);
    
        let ampm = datetime.getHours() >= 12 ? 'pm' : 'am';

        let formatHoursTo12 = datetime.getHours() % 12 || 12;
        
        return formatHoursTo12+":"+datetime.getMinutes()+" "+ampm;
    },
    getTimeSlots: () => {

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

                if(i === hour){
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

        }

        return availableSlots;
    },
    getDateTimeWithTime: (timeAsString) => {
        /**
         * time format: 11:15 am or 1:30 pm
         * return datetime format: 2022-09-13T22:24:57.524Z
         */
        let now = new Date();
        let year = now.getFullYear();
        let month = padWithZero(now.getMonth()+1);
        let date = padWithZero(now.getDate());
    
        let timeArray = timeAsString.split(" ");
        let ampm = timeArray[1];
        let hrTime =  timeArray[0].split(":");
    
        let hr = parseInt(hrTime[0]);
    
        if(ampm==="pm" && hr!==12){
          hr = (hr+12);
        }else{
          hr = padWithZero(hr);
        }
    
        let min = padWithZero(parseInt(hrTime[1]));
    
        let time = hr+":" + min +":00.000Z"
    
        return year+"-"+month+"-"+date+"T"+time;
    }
}

export default DateTimeUtils;