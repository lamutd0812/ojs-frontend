import React from 'react';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import ReviewDetail from '../../../Reviewer/ReviewSubmission/ReviewDetail';

const ReviewerSubmissionDetail = (props) => {
    return (
        <Aux>
            <div className="modal fade" id={"aaa"+props.reviewerSubmission._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ý kiến của thẩm định viên</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ReviewDetail
                                reviewerSubmission={props.reviewerSubmission} />
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default ReviewerSubmissionDetail;