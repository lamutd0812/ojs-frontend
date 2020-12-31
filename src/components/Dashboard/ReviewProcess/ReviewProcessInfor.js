import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { SUBMISSION_TYPES } from '../../../utils/constant';
import CESubmissionDetail from '../ChiefEditor/EditorialBoardSubmissions/CESubmisisonDetail';
import ReviewerSubmissions from '../Editor/ReviewerSubmissions/ReviewerSubmissions';
import EditorSubmissionDetail from '../ChiefEditor/EditorialBoardSubmissions/EditorSubmissionDetail';

const ReviewProcessInfor = (props) => {
    return (
        <Aux>
            {props.submission.typeId.name === SUBMISSION_TYPES.PEER_REVIEW_RESEARCH.name && (
                <Aux>
                    {props.editorAssignment ? (
                        // Row
                        <div className="row border rounded mt-2" style={props.editorAssignment.reviewerAssignmentId.length > 0 ? { minHeight: '200px' } : null}>
                            {/* Column */}
                            <div className="p-2 col-lg-8">
                                <ReviewerSubmissions reviewerAssignments={props.editorAssignment.reviewerAssignmentId} />
                            </div>
                            {/* Column */}
                            <div className="p-2 col-lg-4">
                                <Doughnut
                                    data={props.fetchDoughnutData(props.editorAssignment.reviewerAssignmentId)}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        legend: {
                                            labels: {
                                                fontSize: 12,
                                                fontFamily: 'Roboto Slab'
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                            <div className="row border rounded mt-2">
                                <div className="p-2 col-lg-8">
                                    <h6><i className="fas fa-comments"></i> Ý KIẾN CỦA THẨM ĐỊNH VIÊN</h6>
                                    <div>Chưa có thông tin thẩm định của thẩm định viên.</div>
                                </div>
                            </div>
                        )}
                </Aux>
            )}
            {/* Row */}
            <div className="row border rounded mt-2">
                <div className="p-2 col-lg-10">
                    <h6><i className="fas fa-comment"></i> Ý KIẾN CỦA BIÊN TẬP VIÊN</h6>
                    {props.editorAssignment && props.editorAssignment.editorSubmissionId ? (
                        <EditorSubmissionDetail
                            editorAssignment={props.editorAssignment}
                            editorSubmission={props.editorAssignment.editorSubmissionId} />
                    ) : (
                            <div>Chưa có thông tin thẩm định của biên tập viên.</div>
                        )}
                </div>
            </div>
            {/* Row */}
            {props.submission.typeId.name === SUBMISSION_TYPES.PEER_REVIEW_RESEARCH.name && (
                <div className="row border rounded mt-2">
                    <div className="p-2 col-lg-10">
                        <h6><i className="fas fa-gavel"></i> QUYẾT ĐỊNH CỦA TỔNG BIÊN TẬP</h6>
                        {props.chiefEditorSubmission ? (
                            <CESubmissionDetail chiefEditorSubmission={props.chiefEditorSubmission} />
                        ) : (
                                <div>Tổng biên tập chưa đưa ra quyết định.</div>
                            )}
                    </div>
                </div>
            )}
        </Aux>
    );
};

export default ReviewProcessInfor;