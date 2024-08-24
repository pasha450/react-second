import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function Signin() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [isPaswordVisiable, setIsPasswordVisiable] = useState(false);
    const [isCheckedrememberMe, setIsCheckedrememberMe] = useState(false);

    const { register, setError, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            navigate('/');
        }

        const rememberMeData = localStorage.getItem('rememberMe');
        if (rememberMeData) {
            const parsedData = JSON.parse(rememberMeData);
            setIsCheckedrememberMe(true);
            // Set values using setValue
            setValue('email', parsedData.email);
            setValue('password', parsedData.password);
        }
    }, [navigate, setValue]);

    const onSubmit = async (data) => {
        console.log("form submitted with data:", data);
        try {
            const response = await axios.post(`${apiUrl}/login`, data);
            console.log('Login successful:', response);
            toast.success('Login successfully!');
            const { token } = response.data;
            const loggedUserData = response.data.user;
    
            Cookies.set('authToken', token, { expires: 1 });
    
            const { _id, name, profile_image } = loggedUserData;
            const storeData = { userId: _id, name: name, profile_image: profile_image };
            localStorage.setItem('storeData', JSON.stringify(storeData));
    
            if (isCheckedrememberMe) {
                const rememberMe = { email: data.email, password: data.password };
                localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
            } else {
                localStorage.removeItem('rememberMe');
            }
    
            setTimeout(() => {
                navigate('/profile');
            }, 800);
    
        } catch (error) {
            console.error('Login failed:', error);
            if (error.response && error.response.data.errors) {
                error.response.data.errors.forEach(err => {
                    setError(err.field, { type: 'server', message: err.message });
                });
            } else if (error.response && error.response.data.error) {
                setError('invalidCredential', { type: 'server', message: error.response.data.error });
            } else {
                toast.error('Login failed. Please try again.');
            }
            toast.error('Login failed!');
            localStorage.removeItem('storeData');
        }
    };
    

    const handleRememberMeChange = (e) => {
        setIsCheckedrememberMe(e.target.checked);
    };

    return (
        <section className="account__Sec h-100">
            <div className="container h-100 mar-top">
                <div className="row justify-content-center align-items-center h-100">
                    <form className="col-md-9" onSubmit={handleSubmit(onSubmit)}>
                        <div className="AppForm shadow-lg">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <div className="AppFormLeft">
                                        <h1>Login</h1>
                                        <div className="form-group position-relative mb-4">
                                            <input
                                                type="text"
                                                className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                                id="email"
                                                placeholder="Email"
                                                {...register("email", {
                                                    required: 'Email is required',
                                                })}
                                            />
                                            <i className="fa fa-user-o"></i>
                                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                        </div>
                                        <div className="form-group position-relative mb-4">
                                            <input
                                                type={isPaswordVisiable ? "text" : "password"}
                                                className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                                id="password"
                                                placeholder="Password"
                                                {...register('password', {
                                                    required: 'Password is required',
                                                })}
                                            />
                                        
                                            <img src={isPaswordVisiable ? "/assets/images/eye.svg" : "/assets/images/eye-off.svg"} alt="Pailogs SignIn" className="eye-icon img-fluid" onClick={() => setIsPasswordVisiable(!isPaswordVisiable)} />
                                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                            {errors.invalidCredential && <p className="text-danger">{errors.invalidCredential.message}</p>}
                                        
                                        </div>
                                        <div className="row mt-4 mb-4">
                                            <div className="col-md-6">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="remember-me"
                                                        onChange={handleRememberMeChange}
                                                        checked={isCheckedrememberMe}
                                                    />
                                                    <label className="form-check-label" htmlFor="remember-me">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <Link to="/reset">Forgot Password?</Link>
                                            </div>    
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-success btn-block shadow border-0 py-2 text-uppercase">
                                            Login
                                        </button>

                                        <p className="text-center mt-4 mb-0">
                                            Don't have an account? <Link to="/register">Create your account</Link>
                                        </p>

                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                                        <h2 className="position-relative pb-3 mb-4">Welcome to AP 88</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestiae corporis voluptatem, omnis totam est voluptatum ipsa iure sit consectetur.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Signin;
