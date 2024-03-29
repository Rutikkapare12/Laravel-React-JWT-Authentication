import { useState } from "react";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Register = () => {
    const [loader, setLoader] = useState(false);
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        setFormData({...formdata, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoader(true);
            // const response = await axios.post("http://127.0.0.1:8000/api/register", formdata);
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),
            });

            const responseData = await response.json();
            if (response.ok) {
                setLoader(false);
                setValidationErrors({});
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: responseData.message,
                }).then(() => {
                    window.location.href = "/login";
                });
            } else {
                setLoader(false);
                setValidationErrors(responseData);
                
                if(responseData.message){
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: responseData.message || "Registration failed.",
                    });
                } else if (responseData) {
                    setValidationErrors(responseData);
                } else {
                    Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: responseData || "Registration failed.",
                    });
                }
            }
        } catch (error) {
            setLoader(false);
            console.error("Error during registration:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred during registration.",
            });
        }
    }
    const imagePath ='/images/bg-image.webp';
   
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
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <form  method="POST" onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            {/* <label htmlFor="name"  className="form-label">Name:</label> */}
                                            <input type="text" name="name" placeholder="Enter Full Name" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.name && <span className="text-danger">{validationErrors.name[0]}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            {/* <label htmlFor="email" className="form-label">Email:</label> */}
                                            <input type="email" name="email" placeholder="Enter Email" className="form-control form-control-lg" onChange={handleChange} />
                                            {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            {/* <label htmlFor="password" className="form-label">Password:</label> */}
                                            <input type="Password" name="password" placeholder="Enter Password" className="form-control form-control-lg" onChange={handleChange}/>
                                            {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary btn-lg mt-4">Register</button>
                                        </div>
                                        
                                    </form>
                                    <p className="text-center text-muted mt-5 mb-0">Have already an account? 
                                        <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link>    
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>

    );
}

export default Register;