import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getDecisionBadgeClassname, getFormattedDate } from '../../../../utils/utility';

const EditorSubmissionDetail = (props) => {
    return (
        <Aux>
            {props.editorSubmission ? (
                <Aux>
                    <div className="ml-2 mt-3">
                        <span className={getDecisionBadgeClassname(props.editorSubmission.editorDecisionId.value)}>
                            {props.editorSubmission.editorDecisionId.decisionName}
                        </span>
                    </div>
                    <div className="ml-2 mt-2">
                        <Link to="#" className="text-primary" data-toggle="modal" data-target="#editorSubmisisonModal"><u>Xem chi tiết</u></Link>
                    </div>
                </Aux>
            ) : null}
            <div className="modal fade" id="editorSubmisisonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Quyết định của biên tập viên</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group ml-3">
                                <label>Nguời gửi</label>
                                <div className="ml-4">
                                    <i className="fas fa-user text-dark"></i> {" "}
                                    <Link to="#" className="text-primary">
                                        {props.editorAssignment.editorId.lastname} {props.editorAssignment.editorId.firstname}
                                    </Link>
                                    {" "}<div className="badge-ol badge-ol-danger badge-outlined mb-1">Biên tập viên</div>
                                </div>
                            </div>
                            <div className="form-group ml-3">
                                <label>Quyết định</label><br />
                                <span className={getDecisionBadgeClassname(props.editorSubmission.editorDecisionId.value) + " ml-4"}>
                                    {props.editorSubmission.editorDecisionId.decisionName}
                                </span>
                            </div>
                            <div className="form-group ml-3">
                                <label>Ý kiến</label>
                                <p className="ml-4">{props.editorSubmission.content}</p>
                            </div>
                            <div className="form-group ml-3">
                                <label>File đính kèm</label>
                                <p className="ml-4">
                                    <i className="fa fa-paperclip fa-lg"></i>
                                    <a href="https://ojs.s3-ap-southeast-1.amazonaws.com/1605345202062-Unsupervised-real-time-anomaly-detection-for-streaming-da_2017_Neurocomputin.pdf" className="text-primary" target="_blank" rel="noopener noreferrer">
                                        {" "} nhanxet.pdf
                                    </a>
                                </p>
                            </div>
                            <div className="form-group ml-3">
                                <label>Ngày gửi</label>
                                <p className="ml-4">{getFormattedDate(props.editorSubmission.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default EditorSubmissionDetail;