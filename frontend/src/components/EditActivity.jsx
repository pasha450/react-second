import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddUserModal from "./AddUserModal";

function EditActivity() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
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
                                        <button type="button" className="btn btn-primary" onClick={()=>setIsModalOpen(true)}>Add</button>
                                    </div>
                                </div>
                                    <div className="custom__datatable">
                                        <table id="myTable" className="display responsive table table-bordered dataTable table-striped">
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
                                                <tr>
                                                    <td>harry </td>
                                                    <td>harry@gmail.com</td>
                                                    <td>male</td>
                                                    <td>success</td>
                                                    <td>
                                                        <Link to="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                        <Link to="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                            <td>neha </td>
                                            <td>neha12@gmail.com</td>
                                            <td>female</td>
                                            <td>success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                         
                                            </tbody>
                                        </table>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <AddUserModal isOpen={isModalOpen} onClose={closeModal}/>
        </>
    );
}

export default EditActivity;
