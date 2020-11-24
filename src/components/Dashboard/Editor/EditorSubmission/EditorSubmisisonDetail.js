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
                            <a href="https://ojs.s3-ap-southeast-1.amazonaws.com/1605345202062-Unsupervised-real-time-anomaly-detection-for-streaming-da_2017_Neurocomputin.pdf" className="text-primary" target="_blank" rel="noopener noreferrer">
                                {" "} nhanxet.pdf
                        </a>
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