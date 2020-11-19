import React from 'react';
// import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getDecisionBadgeClassname } from '../../../../utils/utility';

const ReviewDetail = (props) => {
    return (
        <Aux>
            <div className="card-body">
                <div className="form-group ml-3">
                    <label>Quyết định</label><br />
                    <span className={getDecisionBadgeClassname(props.reviewerSubmission.reviewerDecisionId.value) + " ml-4"}>
                        {props.reviewerSubmission.reviewerDecisionId.decisionName}
                    </span>
                </div>
                <div className="form-group ml-3">
                    <label>Nhận xét</label>
                    <p className="ml-4">{props.reviewerSubmission.content}</p>
                </div>
                <div className="form-group ml-3">
                    <label>File đính kèm</label>
                    <p className="ml-4">
                        <i className="fa fa-paperclip fa-lg"></i>
                        <a href="https://ojs.s3-ap-southeast-1.amazonaws.com/1605345202062-Unsupervised-real-time-anomaly-detection-for-streaming-da_2017_Neurocomputin.pdf" className="text-primary" target="_blank" rel="noopener noreferrer">
                            {" "} test.pdf
                        </a>
                    </p>
                </div>
            </div>
        </Aux>
    );
};

export default ReviewDetail;