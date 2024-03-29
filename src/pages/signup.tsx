import { useState , useEffect} from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import Footer from "../layout/footer";
import UserApi from "../api/UserApi";
import Auth from "../components/auth/auth";

function SignUp() {

  // let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "folaudev+"+Math.floor(Math.random() * 1000000000)+"@gmail.com",
    phoneNumber: "3101234567",
    password: "Test1234!",
    firstName: "John",
    lastName: "Doe",
    confirmPassword: "Test1234!"
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // signUpWithEmailAndPassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const signUpWithEmailAndPassword = () => {
      console.log(userInfo)
      
      if(!validate(userInfo)){
        return;
      }

      UserApi.signUp(userInfo).then((response) => {
        console.log("response: ", response);

        Auth.signIn(response.data);

        window.location.href = "/menu";
        
      }).catch((error) => {
        console.error("Error msg: ", error.message);
        console.error("Error: ", error);
        if(error.response.data){
          setErrorMsg(error.response.data.message)
        }else{
          setErrorMsg(error.message+". Server may be down")
        }
      });
  };

  const validate = (userInfo: any) => {

    if(!validateEmail(userInfo.email)){
      setErrorMsg("Email is invalid")
      return false;
    }

    if(userInfo.password!==userInfo.confirmPassword){
      setErrorMsg("Password and Confirm Password are not equal") 
      return false;
    }

    return true;
  }

  const validateEmail = (email: string) => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {
      return true;
    }

    return false;
  }

  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
          <h1>Sign Up</h1>
          
          {errorMsg && 
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              </div>
            </div>
          }

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">First Name</label>
              <input 
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="firstName"
              value={userInfo.firstName}
              onChange={handleInputChange}
              required
              className="form-control" 
              placeholder=""/>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Last Name</label>
              <input 
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="lastName"
              value={userInfo.lastName}
              onChange={handleInputChange}
              required
              className="form-control" 
              placeholder=""/>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Email Address</label>
              <input 
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={userInfo.email}
              onChange={handleInputChange}
              required
              className="form-control" 
              placeholder="johndoe@gmail.com"/>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Phone Number</label>
              <input 
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              autoComplete="phone"
              value={userInfo.phoneNumber}
              onChange={handleInputChange}
              required
              className="form-control" 
              placeholder=""/>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Password</label>
              <input
              id="password"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={handleInputChange}
              required
              className="form-control"
              />
            </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Confirm Password</label>
              <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={userInfo.confirmPassword}
              onChange={handleInputChange}
              required
              className="form-control"/>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="d-grid gap-2">
              <button onClick={()=>signUpWithEmailAndPassword()} type="button" className="btn btn-primary">Sign Up</button>
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

export default SignUp;