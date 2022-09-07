import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import Footer from "../layout/footer";
import FirebaseApi from "../api/FirebaseApi";
import UserApi from "../api/UserApi";
import Auth from "../components/auth/auth";

function SignUp() {

  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "folaudev+"+Math.floor(Math.random() * 1000000000)+"@gmail.com",
    password: "Test1234!",
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

      FirebaseApi.signUpWithEmail(userInfo.email, userInfo.password)
      .then((userCredential) => {
  
        // console.log("userCredential", userCredential);

        userCredential.user.getIdToken()
        .then((token)=>{
          let authentication = {
            "token": token
          };

          UserApi.authenticate(authentication).then((response) => {
            console.log("response: ", response);

            Auth.signIn(response.data);

            navigate("/menu");
            
          }).catch((error) => {
            console.error("Error: ", error);
            setErrorMsg(error.message)
          });
        });

      })
      .catch((error) => {
        console.error("Error: ", error);
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