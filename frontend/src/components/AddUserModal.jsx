import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from 'react-bootstrap';
import { useEffect, useState} from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

function AddUserModal({isOpen,onClose ,addUser, userToEdit, userData, setUserData}) {
  // const navigate =useNavigate();
  const[userId, setUserId] = useState('');
  const[header, setHeader] = useState({});
  const[formData , setFormData] =useState({
     name:'',
     email: '',
     gender:'',
  });
  
  const handleChange = (e) =>{
    const {name ,value} = e.target;
    setUserData({
      ...userData,
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
   },[])
   
    const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       if (userToEdit) {
          const response = await axios.post(`${apiUrl}user/update`, userData,{ headers: header });
          addUser(response.data);
          // navigate('/activity');
      }else {
          const response = await axios.post(`${apiUrl}user/store`, formData, { headers: header }); 
          addUser(response.data);
        }
          onClose();
          setFormData({
          name: '',
          email: '',
          gender: '',
        });
    }catch (error) { 
      console.log('Error during submission:', error);
      onClose(true);
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
              <img src="/assets/images/red-flag-bg.svg" className="img-fluid w-25" alt=""/>
              <h3>Flag Data</h3>
              <p>Please report the incorrect information</p>
            </div>
             
            <form className="formarea"onSubmit={handleSubmit}>
    							<div className="form-group mb-4">
    								<label>Name</label>
    								<input 
                    type="text"
                    className="form-control" 
                    name='name'
                    placeholder="Name"
                    value={userData.name}
                    onChange={handleChange}
                    />
    							</div>
								<div className="form-group mb-4">
    								<label>Email</label>
    								<input 
                    type="email" 
                    className="form-control" 
                    name='email'
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                    />
    							</div>
								<div className="form-group position-relative mb-4">
									<label htmlFor="">Gender</label> <br/>
									<div className="form-check form-check-inline">
										<input className="form-check-input"
                     type="radio" 
                     name="gender" 
                     id="inlineRadio1" 
                     value= "1"
                     checked={userData.gender =="1" ? true : false}
                     onChange={handleChange}
                     />
										<label className="form-check-label" htmlFor="inlineRadio1">Male</label>
									</div>
									<div className="form-check form-check-inline">
									<input className="form-check-input" 
                  type="radio" 
                  name="gender" 
                  id="inlineRadio2"
                  value="2"
                  checked={userData.gender =="2" ? true : false}
                  onChange={handleChange}
                   />
									<label className="form-check-label" htmlFor="inlineRadio2">Female</label>
									</div>
								</div>
                <div className="form-group">
    								<button type="submit" className="submitbtn text-uppercase">Submit</button>
    							</div>
               </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddUserModal;