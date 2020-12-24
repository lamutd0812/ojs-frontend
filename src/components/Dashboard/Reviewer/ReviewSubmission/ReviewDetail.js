import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getDecisionBadgeClassname, getFormattedDate } from '../../../../utils/utility';

const ReviewDetail = (props) => {
    return (
        <Aux>
            {props.reviewerSubmission ? (
                <Aux>
                    <div className="form-group ml-3">
                        <label>Quyết định</label><br />
                        <span className={getDecisionBadgeClassname(props.reviewerSubmission.reviewerDecisionId.value) + " ml-4"}>
                            {props.reviewerSubmission.reviewerDecisionId.decisionName}
                        </span>
                    </div>
                    <div className="form-group ml-3">
                        <label>Ý kiến</label>
                        <p className="ml-4">{props.reviewerSubmission.content}</p>
                    </div>
                    <div className="form-group ml-3">
                        <label>File đính kèm</label>
                        <p className="ml-4">
                            <i className="fa fa-paperclip fa-lg"></i>
                            {props.reviewerSubmission.attachmentFile ? (
                                <a href={props.reviewerSubmission.attachmentUrl} className="text-primary" target="_blank" rel="noopener noreferrer">
                                    {" "}{props.reviewerSubmission.attachmentFile}
                                </a>
                            ) : " Không có file đính kèm."}
                        </p>
                    </div>
                    <div className="form-group ml-3">
                        <label>Ngày gửi</label>
                        <p className="ml-4">{getFormattedDate(props.reviewerSubmission.createdAt)}</p>
                    </div>
                </Aux>
            ) : null}
        </Aux>
    );
};

export default ReviewDetail;