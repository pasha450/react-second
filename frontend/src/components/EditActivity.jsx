import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import AddUserModal from "./AddUserModal";
import Cookies from "js-cookie";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function EditActivity() {
        const [users, setUsers] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const[userId, setUserId] = useState('');
        const[header, setHeader] = useState({});
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
      console.log(userId,"userId66")
      const fetchUsers = async () => {
        try {
            const response = await axios.post(`${apiUrl}user`,{createdBy:userId}, { headers: header });
            console.log(header,"header")
            setUsers(response.data.userData);
        }catch (error) {
            console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }, []);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // **** Adding new user ****
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
   }
   console.log(users,'users')
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
                    <AddUserModal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      addUser={addUser}
                    />
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
                          <td>{user.gender === "1" ? "Male" : "Female"}</td>
                          <td>success</td>
                          <td>
                            <Link to="#" className="btn btn-eye">
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link to="#" className="btn btn-trash">
                              <i className="fa fa-trash"></i>
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
    </>
  );
}

export default EditActivity;
