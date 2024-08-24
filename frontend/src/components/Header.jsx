import React from "react";
import { Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Cookies from "js-cookie";
 
function Header() {
    const navigate = useNavigate();
    const handleLogout =async () => {

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
         });
         if (result.isConfirmed) {
            Cookies.remove('authToken');
            localStorage.removeItem('savedEmail'); 
            localStorage.removeItem('savedPassword'); 
            Swal.fire(
                'Logged out!',
                'You have been logged out successfully.',
                'success'
              );
              navigate('/login');
         }
    };

    return(
        <header className="header">
        <div className="container">
            <nav className="navbar navbar-expand-md navbar-light p-0">
                <Link className="navbar-brand mr-0 p-0" to ="index.html">AP88</Link>
                <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    <span className="navbar-toggler-icon"></span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto text-uppercase">
                        <li className="nav-item active"><Link to="/profile" className="nav-link">Profile</Link></li>
                        <li className="nav-item"><Link to="/Activity" className="nav-link">Activity</Link></li>
                        <li className="nav-item"><Link to="#" onClick={handleLogout} className="nav-link">Logout</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    )
}
export default Header;