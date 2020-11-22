import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getDecisionBadgeClassname2 } from '../../../../utils/utility';
import ReviewerSubmissionDetail from './ReviewerSubmissionDetail/ReviewerSubmissionDetail';

const ReviewerSubmissions = (props) => {
    let stt = 1;

    return (
        <Aux>
            <h6><i className="fas fa-comments"></i> Ý KIẾN CỦA THẨM ĐỊNH VIÊN</h6>
            {props.reviewerAssignments.length > 0 ? (
                <table className="table table-bordered table-sm mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: '1%' }}>#</th>
                            <th style={{ width: '30%' }}>Thẩm định viên</th>
                            <th style={{ width: '25%' }}>Trạng thái</th>
                            <th style={{ width: '25%' }} className="text-center">Quyết định</th>
                            <th style={{ width: '19%' }} className="text-center">Ý kiến</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.reviewerAssignments.map(ra => (
                            <Aux key={ra._id}>
                                <tr>
                                    <td>{stt++}</td>
                                    <td>{ra.reviewerId.lastname} {ra.reviewerId.firstname}</td>
                                    <td>{ra.reviewerSubmissionId ? "Đã nộp ý kiến" : "Chưa nộp ý kiến"}</td>
                                    <td className="text-center">
                                        {ra.reviewerSubmissionId ? (
                                            <span className={"badge " + getDecisionBadgeClassname2(ra.reviewerSubmissionId.reviewerDecisionId.value) + " p1"}>
                                                {ra.reviewerSubmissionId.reviewerDecisionId.decisionName}
                                            </span>
                                        ) : (
                                                <span className="badge bg-secondary p-1">Chưa nộp ý kiến</span>
                                            )}
                                    </td>
                                    <td className="text-center">
                                        {ra.reviewerSubmissionId ? (
                                            <Link to="#"
                                                className="text-primary"
                                                data-toggle="modal"
                                                data-target={"#aaa" + ra.reviewerSubmissionId._id}>
                                                <u>Xem</u>
                                            </Link>
                                        ) : (
                                                <Link to="#"
                                                    className="link-disabled">
                                                    Chưa nộp
                                                </Link>
                                            )}
                                    </td>
                                    {ra.reviewerSubmissionId ? (
                                        <td style={{border: '1px solid #fff'}}>
                                            <ReviewerSubmissionDetail reviewerSubmission={ra.reviewerSubmissionId} />
                                        </td>
                                    ) : null}
                                </tr>
                            </Aux>
                        ))}
                    </tbody>
                </table>
            ) : <span className="p-1">Chưa có thẩm định viên nào được chỉ định</span>}
        </Aux>
    );
};

export default ReviewerSubmissions;