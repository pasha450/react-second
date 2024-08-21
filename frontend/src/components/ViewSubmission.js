import React from "react";
import { Link} from "react-router-dom"
function ViewSubmission(){
    return(
        <>
        <header className="header">
    		<div className="container">
                <nav className="navbar navbar-expand-md navbar-light p-0">
                   < Link  className="navbar-brand mr-0 p-0" href="index.html">AP88</Link>
                    <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto text-uppercase">
                            <li className="nav-item"><Link to="#" className="nav-link">Form Submission</Link></li>
                            <li className="nav-item active"><Link to="#" className="nav-link">Activity</Link></li>
                            <li className="nav-item"><Link to="#" className="nav-link">Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
    	</header>

<section className="formArea__Sec pt-5 mt-5">
<div className="container">
    <div className="row justify-content-center">
        <div className="col-12 col-md-10">
            <div className="FormArea__box shadow-lg">
                <h4 className="mb-5">View Submission</h4>
                <ul className="list-unstyled mb-0 table__list d-flex flex-wrap">
                    <li>
                        <span>ID</span>
                        <span>1</span>
                    </li> 
                    <li>
                        <span>Port</span>
                        <span>123</span>
                    </li> 
                    <li>
                        <span>USSD</span>
                        <span>123*#</span>
                    </li> 
                    <li>
                        <span>Status</span>
                        <span>Success</span>
                    </li>                  
                </ul>
            </div>
        </div>
    </div>
</div>
</section>
</>
    )
}   
export default ViewSubmission;