import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getDecisionBadgeClassname, getFormattedDate } from '../../../../utils/utility';

const CESubmissionDetail = (props) => {
    return (
        <Aux>
            {props.chiefEditorSubmission ? (
                <Aux>
                    <div className="ml-2 mt-3">
                        <span className={getDecisionBadgeClassname(props.chiefEditorSubmission.chiefEditorDecisionId.value)}>
                            {props.chiefEditorSubmission.chiefEditorDecisionId.decisionName}
                        </span>
                    </div>
                    <div className="ml-2 mt-2">
                        <Link to="#" className="text-primary" data-toggle="modal" data-target="#ceSubmisisonModal"><u>Xem chi tiết</u></Link>
                    </div>
                </Aux>
            ) : null}
            <div className="modal fade" id="ceSubmisisonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Quyết định của tổng biên tập</h5>
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
                                        {props.chiefEditorSubmission.chiefEditorId.lastname} {props.chiefEditorSubmission.chiefEditorId.firstname}
                                    </Link>
                                    {" "}<div className="badge-ol badge-ol-danger badge-outlined mb-1">Tổng biên tập</div>
                                </div>
                            </div>
                            <div className="form-group ml-3">
                                <label>Quyết định</label><br />
                                <span className={getDecisionBadgeClassname(props.chiefEditorSubmission.chiefEditorDecisionId.value) + " ml-4"}>
                                    {props.chiefEditorSubmission.chiefEditorDecisionId.decisionName}
                                </span>
                            </div>
                            <div className="form-group ml-3">
                                <label>Nhận xét</label>
                                <p className="ml-4">{props.chiefEditorSubmission.content}</p>
                            </div>
                            <div className="form-group ml-3">
                                <label>Ngày gửi</label>
                                <p className="ml-4">{getFormattedDate(props.chiefEditorSubmission.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default CESubmissionDetail;