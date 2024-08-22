import React, {useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; 
function Signin(){
    const apiUrl = process.env.REACT_APP_API_URL;

	const navigate = useNavigate();
	const [isPaswordVisiable , setIsPasswordVisiable] = useState(false);
    const [user,setUser]=useState(null);
    const [rememberMe, setRememberMe] = useState({ username: '', password: '' });
    const [isCheckedrememberMe, setIsCheckedrememberMe] = useState(false);

	const { register,handleSubmit,setError,formState: { errors } } = useForm();
      useEffect(()=>{
    
        const token = Cookies.get('authToken');
       if (token) {
         navigate('/'); 
        }   
		const rememberMeData = localStorage.getItem('rememberMe');
        setRememberMe(JSON.parse(rememberMeData))
        console.log(rememberMeData,"rememberMe2");
        if(rememberMeData !==''){
            setIsCheckedrememberMe(false);
		}
	    },[navigate]);

		const onSubmit = async (data) => {
			const dataa = { useremail: 'testuser', password: 'testpass' };
				try {
				  const response = await axios.post(`${apiUrl}/login`, data);
				  console.log('Login successful:', response);
				  toast.success('Login successfully!');
				  const { token } = response.data;  
				  const loggedUserData = response.data.user;
				  console.log('response',loggedUserData);
				  Cookies.set('authToken', token, { expires: 1 });

				  const {_id, name, profile_image} = loggedUserData;
				  const storeData = {userId:_id , name:name, profile_image:profile_image};
				  
				  localStorage.setItem('storeData', JSON.stringify(storeData));
                  console.log('setUser',storeData);
            
				 if (token) { 

					let rememberMe = {email:dataa.email,password:dataa.password};
					localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
				
				}else {
					localStorage.removeItem('rememberMe');
				}
				  setTimeout(() => {
					  navigate('/profile')
				   }, 800);

			        //   ----------set value in localStorage-----

				} catch (error) {
					console.log(error,'typeee')
				if (error.response && error.response.data.errors) {
					error.response.data.errors.forEach(err => {
					setError(err.field, { type: 'server', message: err.message });
					});
				} else if(error.response && error.response.data.error){
					console.log('object',error.response.data.error)
					setError('invalidCredential', { type: 'server', message: error.response.data.error } )
				}else{
					toast.error('Login failed. Please try again.');
				}
				  console.log('Login failed:'.error);
				  toast.error('Login failed!');
				  localStorage.removeItem('storeData');
				  
				 }
				
			};  
			const handleRememberMeChange = (e) => {
				const isChecked = e.target.checked;
				setIsCheckedrememberMe(isChecked)
			};
			
		console.log(rememberMe,'rememberMe',isCheckedrememberMe)
    return(
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
		                                    <input type="text" 
											className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="email"
		                                    placeholder="Email"
											{...register("email", {
											  required: 'email is required',
											  
											})}
											defaultValue={rememberMe !== null ? rememberMe.email:''}
											/>
		                                    <i className="fa fa-user-o"></i>
											{errors.name && <p className="text-danger">{errors.name.message}</p>}
		                                </div>
		                                <div className="form-group position-relative mb-4">
		                                    <input
											type= {isPaswordVisiable ? "text " :"password" }
											 className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password"
		                                     placeholder="Password"
											 {...register('password', { 
												required: 'Password is required',
											  })}
											  defaultValue={rememberMe !== null ? rememberMe.password:''}
												/>
		                                       
											<img src={isPaswordVisiable ? "/assets/images/eye.svg" : "/assets/images/eye-off.svg"} alt="Pailogs SignIn" className="img-fluid" onClick={()=>setIsPasswordVisiable(!isPaswordVisiable)}/>
											{errors.password && <p className="text-danger">{errors.password.message}</p>}
											{errors.invalidCredential && <p className="text-danger">{errors.invalidCredential.message}</p>}

		                                </div>
		                                <div className="row  mt-4 mb-4">
		                                    <div className="col-md-6">
		                                        <div className="form-check">
		                                            <input 
													className="form-check-input" 
													type="checkbox" value="" 
													id="defaultCheck1"
													onChange={handleRememberMeChange}
													checked={isCheckedrememberMe}
													/>
		                                            <label className="form-check-label" htmlFor="defaultCheck1">
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
										className="btn btn-success btn-block shadow border-0 py-2 text-uppercase ">
		                                    Login
		                                </button>

		                                <p className="text-center mt-4 mb-0">
		                                    Don't have an account? <Link to="/register">Create your account</Link> </p>

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
export default Signin;