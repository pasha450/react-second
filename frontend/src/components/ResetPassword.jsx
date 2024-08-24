import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { token } = useParams();
    console.log(token, 'token');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateForm = () => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm() && validateForm() !==undefined) {
            return; 
        }

        try {
            const response = await axios.post(`${apiUrl}/reset-password`, { token, password ,confirmPassword});
            console.log('Reset successful:', response);
            setSuccessMessage("Password has been reset successfully!");
            toast.success('Password reset successful!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Reset failed:', error);
            setErrorMessage("Please try again later.");
            toast.error('Reset failed. Please try again later.');
        }
    };

    return (
        <>
            <section className="account__Sec h-100">
                <div className="mar-top">
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center h-100">
                            <form className="col-md-9" onSubmit={handleSubmit}>
                                <div className="AppForm shadow-lg">
                                    <div className="row">
                                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                                            <div className="AppFormLeft">
                                                <h1>Reset Password</h1>
                                                <div className="form-group position-relative mb-4">
                                                    <input
                                                        type={passwordVisible ? "text" : "password"}
                                                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                                        id="password"
                                                        placeholder="Enter Your Password"
                                                        value={password}
                                                        autoComplete="new-password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <i>
                                                        <img src={passwordVisible ? "/assets/images/eye.svg" : "/assets/images/eye-off.svg"}
                                                            alt="AP88 SignIn"
                                                            className="img-fluid"
                                                            onClick={togglePasswordVisibility} />
                                                    </i>
                                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                                </div>
                                                <div className="form-group position-relative mb-4">
                                                    <input
                                                        type={confirmPasswordVisible ? "text" : "password"}
                                                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                                        id="confirmPassword"
                                                        placeholder="Confirm Your Password"
                                                        autoComplete="new-password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                    <i>
                                                        <img src={confirmPasswordVisible ? "/assets/images/eye.svg" : "/assets/images/eye-off.svg"}
                                                            alt="AP88 SignIn"
                                                            className="img-fluid"
                                                            onClick={toggleConfirmPasswordVisibility} />
                                                    </i>
                                                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block shadow border-0 py-2 text-uppercase">
                                                    Reset
                                                </button>
                                                {successMessage && (<div className="text-success mt-3">{successMessage}</div>)}
                                                {errorMessage && (<div className="text-danger mt-3">{errorMessage}</div>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                                                <h2 className="position-relative pb-3 mb-4">Welcome to AP 88</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestias, totam est voluptatum iure sit consectetur.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}

export default ResetPassword;
