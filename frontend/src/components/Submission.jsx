import React from "react";
import { Link } from "react-router-dom";
function Submission(){
    return(
        <>
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
export default Submission;