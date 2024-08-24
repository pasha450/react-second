import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const apiUrl = process.env.REACT_APP_API_URL;


function EditProfile(){
    const[Message,setMessage] = useState('');
    const[userId, setUserId] = useState('');
    const[header, setHeader] = useState({});
    const[selectedImage,setSelectedImage] = useState();

     const[userData , setUserData] = useState({});
    
   useEffect(() =>{
    const token = Cookies.get('authToken');
    let loggedUserData = localStorage.getItem("storeData");
    loggedUserData = JSON.parse(loggedUserData)
    const userId = loggedUserData.userId;
    const header = {
        'Authorization': token 
    } 
    setUserId(userId);
    setHeader(header);

    const fetchUserData = async () => {
        try{
            const result= await axios.post(`${apiUrl}/edit-profile`,{userId:userId},{ headers: header});
            const userObject = {
                userId:result.data.userData._id,
                name:result.data.userData.name,
                email:result.data.userData.email,
                gender:result.data.userData.gender,
                profile_image:result.data.userData.profile_image,
                gender:result.data.userData.gender == undefined ? '': result.data.userData.gender,
            }
             setUserData(userObject);
        }catch(error){
            console.log(error)
        }
    }
    fetchUserData();
 },[]);
  
 const handleImageChange =(e) =>{
    const file = e.target.files[0];
    console.log(file,"fileeeeeee")
    
    if (file)
    {
       setSelectedImage(file);
       setUserData(prevState => ({
           ...prevState,
           profile_image: file 
       }));
     }
    };


 const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ 
        ...prevState,
         [name]: value,
        }));
}
const handleSubmit =  async(e) => {
    e.preventDefault();

        const formData = new FormData()
        formData.append('name', userData.name);
        formData.append('userId', userId);
        formData.append('profile_image', selectedImage);
        console.log(selectedImage,'nothing hereeee');
        try{
           console.log(userData,'userData')

            // make the request to the server-------  
            let result = await axios.post(`${apiUrl}/update-profile`,formData,
                { headers: header ,'Content-Type': 'multipart/form-data',
                ...header} );
            console.log("form submitted !!",result);
            console.log(userData,"updated value");

            // **** extract data from the response ******
            const {name, profile_image, _id , gender , email} = result.data.userData;
            const userObject = {
                userId:_id,
                name:name,
                email:result.email,
                gender:result.gender,
                profile_image:profile_image,
                gender:result.gender == undefined ? '': result.gender,
            }
           
            // Show success toast
            toast.success('Profile updated successfully!'); 

            // --save the user object to localStorage---
            localStorage.setItem('storeData',JSON.stringify(userObject));
            
        }
        catch(error){
          console.log(error);
          toast.error('Error updating profile');
        }
    }
    return(
        <section className="formArea__Sec pt-5 mt-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <div className="FormArea__box shadow-lg">
                        <h4 className="mb-5">Profile</h4>
                        <form className="formarea" method='post' onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-group mb-4">
                                <label>Username</label>
                                <input type="text" 
                                className="form-control"
                                 placeholder="Username"
                                 name="name"
                                value={userData.name}
                                onChange={handleChange}
                                 />
                            </div>
                            <div className="form-group mb-4">
                                <label>Email</label>
                                <input type="email" 
                                name="email"
                                className="form-control" 
                                placeholder="Email"
                                value={userData.email}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="form-group position-relative mb-4">
                                <label htmlFor="">Gender</label> <br/>
                                <div className="form-check form-check-inline">
                                    <input 
                                    className="form-check-input"
                                     type="radio" 
                                     id="inlineRadio1" 
                                     name="gender"
                                     value="1"
                                     checked={userData.gender =="1" ? true : false}
                                     onChange={handleChange}
                                     />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                <input
                                 className="form-check-input"
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
                            <div className="form-group mb-4">
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">Profile Image</label>
                                    <input 
                                    className="form-control"
                                     type="file" 
                                     id="formFile"
                                     name="profile_image"
                                     onChange={handleImageChange}
                                     />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="submitbtn text-uppercase">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </section>
    )
}
export default EditProfile;