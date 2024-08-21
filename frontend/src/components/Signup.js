import React, {useEffect ,useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie'; 

import axios from "axios";
function Signup(){
	const[userData , setUserData] = useState({gender:' '});
	const navigate = useNavigate();
	const [isPaswordVisiable , setIsPasswordVisiable] = useState(false);
    const [ConfirmPaswordVisiable , setConfirmPasswordVisiable] = useState(false);
	const { register ,setValue,setError,handleSubmit, formState: { errors } } = useForm();
	const [formValues, setFormValues] = useState({
		username: '',
        email: '',
        gender: '',
        password: '',
        confirmPassword: '',
	}); 
	const apiUrl = process.env.REACT_APP_API_URL;
	console.log(apiUrl,'apiUrl');
	useEffect(()=>{
		const token = Cookies.get('authToken');
		if (token) {
		  navigate('/'); 
		}   
		  const savedEmail =localStorage.getItem('savedEmail')
		  const savedPassword = localStorage.getItem('savedPassword')
		  const savedName =localStorage.getItem('savedName')
		  const savedGender = localStorage.getItem('savedGender')
		  if (savedEmail && savedPassword &&savedName && savedGender) {
				setValue('email', savedEmail);
				setValue('password', savedPassword);
				setValue('name', savedName);
				setValue('Gender', savedGender);
				  
			} 
			  },   [navigate,setValue]);
  
			  const handleChange = (e) => {
			  setFormValues({ ...formValues, gender: e.target.value });
			}
			console.log(formValues,'formValues');



	const handleInputChange = (field, value) => {
		setFormValues({ ...formValues, [field]: value });
		setValue(field, value, { shouldValidate: true });
	  };
	  const onSubmit = async (data) => {
		try {
		  const response = await axios.post(`${apiUrl}/register`, formValues);
		  console.log('Signup successful:', response);
		  toast.success('Registration successful!');
	
		  setTimeout(() => {
			navigate('/login');
		  }, 800);
		}catch (error) {
			console.error('Signup error:', error);
			if (error.response && error.response.data.errors) {
				error.response.data.errors.forEach(err => {
				  setError(err.path, { type: 'server', message: err.msg });
			  });
		  } 
		   else if (error.response && error.response.data.error) {
			toast.error(error.response.data.error);
	
		  }
		   else {
			toast.error('An unexpected error occurred. Please try again.');
			} 
		  }
		};
		console.log(errors,'errors')

    return(
        <section className="account__Sec h-100">
		    <div className="container h-100">
		        <div className="row justify-content-center align-items-center h-100">
		            <form className="col-md-9"onSubmit={handleSubmit(onSubmit)}>
		                <div className="AppForm shadow-lg">
		                    <div className="row">
		                        <div className="col-md-6 d-flex justify-content-center align-items-center">
		                            <div className="AppFormLeft">
		                                <h1>Register</h1>
		                                <div className="form-group position-relative mb-4">
		                                    <input 
											type="text" 
											className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
											id="username"
		                                    placeholder="Username"
											value={formValues.name}
											{...register("name", {
											  required: 'Name is required',
											  validate: {
												maxLength: v =>
												  v.length <= 15 || "The  Name should have at most 15 characters",
												matchPattern: v =>
												  /^[A-Za-z\s]+$/.test(v) || "Name must be a valid address"
											  }
											})}
											onChange={(e) => handleInputChange('name', e.target.value)}
											/>
		                                    <i className="fa fa-user-o"></i>
											{errors.name && <p className="text-danger">{errors.name.message}</p>}
		                                </div>
										<div className="form-group position-relative mb-4">
		                                    <input
											 type="Email"
											  className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="username"
		                                      placeholder="Email"
											  value={formValues.email}
											  {...register("email", {
												required: "Email address is required",
												validate: {
												  maxLength: v =>
													v.length <= 50 || "The Email address should have at most 50 characters",
												  matchPattern: v =>
													/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address"
												}
											  })}
											  onChange={(e) => handleInputChange('email', e.target.value)}
											  />
		                                     <i className="fa fa-envelope-o"></i>
											 {errors.email && <p className="text-danger">{errors.email.message}</p>}
		                                </div>
										<div className="form-group position-relative mb-4">
											<label htmlFor="">Gender</label> <br/>
		                                    <div className="form-check form-check-inline">
												<input 
												className="form-check-input" 
												type="radio" 
												name="inlineRadioOptions" 
												id="inlineRadio1" 
												value="1"
                                               checked={formValues.gender ==="1"}
                                               onChange={handleChange}
												/>
												<label className="form-check-label" htmlFor="inlineRadio1">Male</label>
											</div>
											<div className="form-check form-check-inline">
											<input 
											className="form-check-input" 
											type="radio" 
											name="inlineRadioOptions" id="inlineRadio2" 
											value="2"
                                            checked={formValues.gender ==="2"}
											onChange={handleChange}
											/>
											<label className="form-check-label" htmlFor="inlineRadio2">Female</label>
											</div>
		                                </div>
		                                <div className="form-group position-relative mb-4">
		                                    <input 
											 type= {isPaswordVisiable ? "text " :"password" }
											className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password"
		                                        placeholder="Password"
												value={formValues.password}
												{...register('password', {
													required: 'Password must be required',
												
												})}
												onChange={(e) => handleInputChange('password', e.target.value)}
												/>
												<img src={isPaswordVisiable ? "/assets/images/eye.svg" : "/assets/images/eye-off.svg"} alt="AP88 SignIn" className="img-fluid" onClick={()=>setIsPasswordVisiable(!isPaswordVisiable)}/>

                                               {errors.password && <p className="text-danger">{errors.password.message}</p>}
		                                </div>
		                                <div className="form-group position-relative mb-4">
		                                    <input
											type={ConfirmPaswordVisiable ? "text" :"password"}
											className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
											id="password"
		                                    placeholder="Confirm Password"
											value={formValues.confirmPassword}
											{...register('confirmPassword', {
											  required: 'ConfirmPassword is required',
											 
											})}
											onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
											/>
                                            <img src={ConfirmPaswordVisiable ? "/assets/images/eye.svg" : "/assets/images/eye-off.svg"} alt="Signup" className="img-fluid" onClick={()=>setConfirmPasswordVisiable(!ConfirmPaswordVisiable)}/>
										</div>
										
		                                <div className="row  mt-4 mb-4">
		                                    <div className="col-md-12">
		                                        <div className="form-check">
		                                            <input 
													className="form-check-input" 
													type="checkbox" value=""
													 id="defaultCheck1"/>
		                                            <label className="form-check-label" for="defaultCheck1">I accept
                                                        <Link to ="/">the terms of use </Link> & <Link to="/">Privacy Policy</Link></label>
		                                        </div>
		                                    </div>
		                                </div>
		                                <button 
										type="submit"
										className="btn btn-success btn-block shadow border-0 py-2 text-uppercase "> Register
		                                </button>

		                                <p className="text-center mt-4 mb-0">
		                                    Already have an account?<Link to="/login">Sign in</Link> </p>

		                            </div>
		                        </div>
		                        <div className="col-md-6">
		                            <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
		                                <h2 className="position-relative pb-3 mb-4">Welcome to AP 88</h2>
		                                <p>Lorem ipsuing elit. Molomos totam est voluptatum i omos totam est voluptatum i ure sit consectetur ill</p>
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
export default Signup;