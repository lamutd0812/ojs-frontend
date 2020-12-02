import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getDecisionBadgeClassname, getFormattedDate } from '../../../../utils/utility';

const CESubmissionDetail = (props) => {
    return (
        <Aux>
            {props.chiefEditorSubmission ? (
                <Aux>
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
                </Aux>
            ) : null}
        </Aux>
    );
};

export default CESubmissionDetail;