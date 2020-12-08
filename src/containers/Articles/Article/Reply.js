import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Reply = () => {
    return (
        <Aux>
            {/* <!-- Section Title --> */}
            <div className="section-heading">
                <h5>LEAVE A REPLY</h5>
            </div>

            {/* <!-- Reply Form --> */}
            <div className="contact-form-area">
                <form action="#" method="post">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <input type="text" className="form-control" id="name" placeholder="Your Name*" required />
                        </div>
                        <div className="col-12 col-lg-6">
                            <input type="email" className="form-control" id="email" placeholder="Your Email*" required />
                        </div>
                        <div className="col-12">
                            <textarea name="message" className="form-control" id="message" cols="30" rows="10" placeholder="Message*" required></textarea>
                        </div>
                        <div className="col-12">
                            <button className="btn mag-btn mt-30" type="submit">Submit Comment</button>
                        </div>
                    </div>
                </form>
            </div>
        </Aux>
    );
};

export default Reply;