import React from "react";
import { Link } from "react-router-dom";
function Activity(){
    return(
        <>
          <header className="header">
    		<div className="container">
                <nav className="navbar navbar-expand-md navbar-light p-0">
                    <Link className="navbar-brand mr-0 p-0" to="index.html">AP88</Link>
                    <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto text-uppercase">
                            <li className="nav-item active"><Link to="/profile" className="nav-link">Profile</Link></li>
                            <li className="nav-item"><Link to="/Activity" className="nav-link">Activity</Link></li>
                            <li className="nav-item"><Link to="/" className="nav-link">Logout</Link></li>
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
    						<h4 className="mb-5">Activity</h4>
    						<div className="custom__datatable">
                                <table id="myTable" className="display responsive table table-bordered dataTable table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Port</th>
                                            <th>USSD</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link >
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
                                            <td>
                                                <Link to ="#" className="btn btn-eye"><i className="fa fa-eye"></i></Link>
                                                <Link to ="#" className="btn btn-trash"><i className="fa fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>25</td>
                                            <td>123*#</td>
                                            <td>Success</td>
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
        </>
    )
}
export default Activity;