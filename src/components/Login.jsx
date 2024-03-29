import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./Loader";

const Login = () =>{
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [ formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [validationErrors, setValidationErrors] = useState({});
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
       
        try {
            setLoader(true);

            const response = await axios.post("http://127.0.0.1:8000/api/login", formData);

            const token = response.data.authorisation.token;

            localStorage.setItem("token", token);

            setLoader(false);

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back!",
            }).then(() => {
                navigate("/dashboard");
            });
            
        } catch (error) {
            setLoader(false);

            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email or password. Please try again.",
                });
            } else {
                const responseData = error.response.data;
                
                setValidationErrors(responseData);
                console.log(responseData);
                if(responseData.message){
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: responseData.message || "Registration failed.",
                    });
                } else if (responseData) {
                    console.log(responseData);
                    setValidationErrors(responseData);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: responseData || "Registration failed.",
                    });
                }
            }
        }
    }
    const imagePath = '/images/bg-image.webp';



    return(
        <>
        {loader && <Loader />}

        <section className="vh-100 vw-100 bg-image"  style={{ backgroundImage: `url('${imagePath}')` }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: '15px'}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <input type="email" name="email" placeholder="Enter Email" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" name="password" placeholder="Enter Password" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary btn-lg mt-4">Submit</button>
                                        </div>
                                    </form>
                                    
                                    <p className="text-center text-muted mt-5 mb-0">Not an account? 
                                        <Link to="/register" className="fw-bold text-body"><u>Register here</u></Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section> 
    </>    
    )
}

export default Login;