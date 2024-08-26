import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
const apiUrl = process.env.REACT_APP_API_URL;

function AddUserModal({isOpen,onClose , addUser}) {
  const[userId, setUserId] = useState('');
  const[header, setHeader] = useState({});
  const[formData , setFormData] =useState({
     username:'',
     email: '',
     gender:'' ,
  });

  const handleChange = (e) =>{
    const {name ,value} =e.target;
    setFormData({
      ...formData,
      [name]:value,
    })
  }
   useEffect(() =>{
      const token = Cookies.get('authToken');
      let loggedUserData = localStorage.getItem("storeData");
      loggedUserData = JSON.parse(loggedUserData)
      const userId = loggedUserData.userId;
      const header = {
          'Authorization': token 
      } 
      setHeader(header);
      setUserId(userId);
      console.log(userId,"userId")

      const fetchUserData = async() =>{
        try {
          const response = await axios.post(`${apiUrl}user`,{userId},{ headers: header});

        } catch(error){
           console.log('error during the submission:',error);
         }
        };
        fetchUserData();
   },[])

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}user/store`, formData, { headers: header });
      addUser(formData);
      // onClose();

      setFormData({
        username: '',
        email: '',
        gender: '',
      });
    } catch (error) {
      console.log('Error during submission:', error);
    }
  };
  return ( 
    <div>
    <Modal show={isOpen} onHide={onClose} className="modal-form-main">
        <div className="puu-left">
        <button 
        type="button" 
        className="btn-close pull-right p-3"
         onClick={onClose}>
        </button>
        </div>
          
        <Modal.Body>
          <div className="want-to-edit">
            <div className="popup-heading-block text-center">
              <img src="/assets/images/red-flag-bg.svg" class="img-fluid w-25" alt=""/>
              <h3>Flag Data</h3>
              <p>Please report the incorrect information</p>
            </div>
             
            <form class="formarea"onSubmit={handleSubmit}>
    							<div class="form-group mb-4">
    								<label>Username</label>
    								<input 
                    type="text"
                    class="form-control" 
                    name='username'
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    />
    							</div>
								<div class="form-group mb-4">
    								<label>Email</label>
    								<input 
                    type="email" 
                    class="form-control" 
                    name='email'
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    />
    							</div>
								<div class="form-group position-relative mb-4">
									<label for="">Gender</label> <br/>
									<div class="form-check form-check-inline">
										<input class="form-check-input"
                     type="radio" 
                     name="gender" 
                     id="inlineRadio1" 
                     value= "1"
                     checked={formData.gender =="1" ? true : false}
                     onChange={handleChange}
                     />
										<label class="form-check-label" for="inlineRadio1">Male</label>
									</div>
									<div class="form-check form-check-inline">
									<input class="form-check-input" 
                  type="radio" 
                  name="gender" 
                  id="inlineRadio2"
                  value="2"
                  checked={formData.gender =="2" ? true : false}
                  onChange={handleChange}
                   />
									<label class="form-check-label" for="inlineRadio2">Female</label>
									</div>
								</div>
                <div class="form-group">
    								<button type="submit" class="submitbtn text-uppercase">Submit</button>
    							</div>
               </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddUserModal;