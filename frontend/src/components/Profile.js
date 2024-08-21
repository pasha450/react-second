import React from "react";
import { Link } from "react-router-dom";
function Profile(){
    return(
        <>
        <header className="header">
    		<div className="container">
                <nav className="navbar navbar-expand-md navbar-light p-0">
                    <Link className="navbar-brand mr-0 p-0" href="index.html">AP88</Link>
                    <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto text-uppercase">
                            <li className="nav-item active"><a href="#" className="nav-link">Form Submission</a></li>
                            <li className="nav-item"><Link to="/" className="nav-link">Activity</Link></li>
                            <li className="nav-item"><Link to="/" className="nav-link">Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
    	</header>

        {/* -----form section ------ */}

        <section class="formArea__Sec pt-5 mt-5">
    		<div class="container">
    			<div class="row justify-content-center">
    				<div class="col-12 col-md-10">
    					<div class="FormArea__box shadow-lg">
    						<h4 class="mb-5">Profile</h4>
    						<form class="formarea">
    							<div class="form-group mb-4">
    								<label>Username</label>
    								<input type="text" class="form-control" placeholder="Username"/>
    							</div>
								<div class="form-group mb-4">
    								<label>Email</label>
    								<input type="email" class="form-control" placeholder="Email"/>
    							</div>
								<div class="form-group position-relative mb-4">
									<label for="">Gender</label> <br/>
									<div class="form-check form-check-inline">
										<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
										<label class="form-check-label" for="inlineRadio1">Male</label>
									</div>
									<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
									<label class="form-check-label" for="inlineRadio2">Female</label>
									</div>
								</div>
								<div class="form-group mb-4">
    								<div class="mb-3">
										<label htmlFor="formFile" class="form-label">Profile Image</label>
										<input class="form-control" type="file" id="formFile"/>
									</div>
    							</div>
    							<div class="form-group">
    								<button type="submit" class="submitbtn text-uppercase">Submit</button>
    							</div>
    						</form>
    					</div>
    				</div>
    			</div>
    		</div>
    	</section>
    </>
    )
}
export default Profile;