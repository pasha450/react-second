import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Forget (){
  const apiUrl = process.env.REACT_APP_API_URL;
   const[email,setEmail]=useState('');
   const[error,setError]=useState('');
   const[message,setMessage]=useState('');
   const[loading,setloading]=useState('');

   const validateEmail = (email) =>{
   const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(String(email).toLowerCase());
   }

    const handleSubmit = async (event) => {
    event.preventDefault();
	setError('');
	setMessage('');
    
	if(!validateEmail(email))
	{   
		setError('Please Enter a valid email address');
		return;
	}
	setloading(true);
        try {
			const response = await axios.post(`${apiUrl}/forget-password`, { email });
			setMessage(response.data.message);
			console.log(setMessage);
			toast.success('Reset email sent successfully');

			setTimeout(() => {
            }, 800);
		} catch (err) {
			// setError('Error sending reset email');
			toast.error('error sending reset email');
		  }finally{
			setloading(false);
		  }
		};  
    return(
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
		                                <h1>Forget Password</h1>
		                                <div className="form-group position-relative mb-4">
		                                    <input
                                             type="email" 
                                             className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                                             id="Email"
		                                     placeholder="Email"
											 value={email}
                                            onChange={(e) => setEmail(e.target.value)}
											disabled={loading}
                                            />
		                                    <i className="fa fa-envelope-o"></i>
											{error && <div className="text-danger">{error}</div>}
		                                </div>
		                                <button 
										className="btn btn-success btn-block shadow border-0 py-2 text-uppercase "
										type="submit"
										disabled={loading}
										>
										{/* {loading ?'sending...': 'Forget Password'} */}
		                                    Forget Password
		                                </button>
										{message && <div className="text-success mt-3">{message}</div>}
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
			</div>
			<ToastContainer/>
    	</section>
        </>
    )
}
export default Forget;