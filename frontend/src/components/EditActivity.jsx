import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddUserModal from "./AddUserModal";
import Cookies from "js-cookie";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function EditActivity() {
        const [users, setUsers,] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const[userId, setUserId] = useState('');
        const[header, setHeader] = useState({});
        const[selectedUser,setSelectedUser]=useState();
        const[userData,setUserData]=useState([]);
        const[userToEdit,setUserToEdit] =useState([]);

    useEffect(() => {
        const token = Cookies.get('authToken');
        let loggedUserData = localStorage.getItem("storeData");
        loggedUserData = JSON.parse(loggedUserData)
        const userId = loggedUserData.userId;
        const header = {
            'Authorization': token 
        }  
        setHeader(header);
        setUserId(userId);
        const fetchUsers = async () => {
          try {
                const response = await axios.post(`${apiUrl}user`,{createdBy:userId}, { headers: header });
                setUsers(response.data.userData);
          }catch (error) {
                console.error('Error fetching users:', error);
          }
        };
        fetchUsers();
    }, []);
    const openModal = () => {
        setIsModalOpen(true);
  }
    const closeModal = () =>{
       setIsModalOpen(false);
       setSelectedUser(null)
    } 
  // **** Adding new user ****
    const addUser = (newUser) => {
       setUsers([...users, newUser]);
    }

  const handleClick = async (userId) => {

      try {
          const token = Cookies.get('authToken');
          const headers = {
              'Authorization': token 
          }
          const response = await axios.post(`${apiUrl}user/edit`,{userId:userId}, { headers: header });
          const userData = response.data;
          console.log(userData.userData,"shshsusuis")
          const newData = userData.userData;
          let currentUserData = {
            userId:newData._id,
            name:newData.name,
            email:newData.email,
            gender:newData.gender,
          }
          setUserData(currentUserData)
          setIsModalOpen(true);
     }catch (error) {
          console.log('Error fetching user data:', error);
      }  
  };
  const handleDelete = async (userId) => {
    try {
         const token =Cookies.get('authToken');
         const headers = {
            'Authorization': token
         }
         const response = await axios.post(`${apiUrl}user/destroy`, {userId:userId}, { headers: header });
         const userData =response.data;
        setUsers(users.filter(user => user._id !== userId));
    }catch(error)
    {
      console.log('Error fetching user data:',error );
    }
  } 
  return (
    <>
      <section className="formArea__Sec pt-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10">
              <div className="FormArea__box shadow-lg">
                <div className="header-bar">
                  <div className="pull-left">
                    <h4 className="mb-5">Activity</h4>
                  </div>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={openModal}> Add
                    </button>
                  </div>
                </div>
                <div className="custom__datatable">
                  <table
                    className="display responsive table table-bordered"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => ( 
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.gender == "1" ? "Male" : "Female"}</td>
                          <td>success</td>
                          <td>
                            <Link to="#" className="btn btn-eye">
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link to="#" className="btn btn-trash" onClick={() =>handleDelete(user._id)}>
                              <i className="fa fa-trash"></i>
                            </Link>
                            <Link to="#" className="btn btn-edit" onClick={() =>handleClick(user._id)}>
                              <i className="fa fa-pencil"></i>
                            </Link>
                          </td>
                        </tr> ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <AddUserModal isOpen={isModalOpen} onClose={closeModal} /> */}
      <AddUserModal
  isOpen={isModalOpen}
  onClose={closeModal}
  addUser={addUser}
  userToEdit={userToEdit} 
  userData={userData}
  setUserData={setUserData} 
     />
    </>
  );
}

export default EditActivity;
