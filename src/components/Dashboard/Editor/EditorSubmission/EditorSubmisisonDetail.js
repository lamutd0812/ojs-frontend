import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getDecisionBadgeClassname, getFormattedDate } from '../../../../utils/utility';

const EditorSubmissionDetail = (props) => {
    return (
        <Aux>
            {props.editorSubmission ? (
                <Aux>
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
                            {props.editorSubmission.attachmentFile ? (
                                <a href={props.editorSubmission.attachmentUrl} className="text-primary" target="_blank" rel="noopener noreferrer">
                                    {" "}{props.editorSubmission.attachmentFile}
                                </a>
                            ) : " Không có file đính kèm."}
                        </p>
                    </div>
                    <div className="form-group ml-3">
                        <label>Ngày gửi</label>
                        <p className="ml-4">{getFormattedDate(props.editorSubmission.createdAt)}</p>
                    </div>
                </Aux>
            ) : null}
        </Aux>
    );
};

export default EditorSubmissionDetail;