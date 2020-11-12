import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const ReviewerSubmission = (props) => {
    return (
        <Aux>
            <div className="modal fade" id="reviewerSubmissionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ý kiến của thẩm định viên</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Đây là ý kiến của thẩm định viên
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default ReviewerSubmission;