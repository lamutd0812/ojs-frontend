import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getStageBadgeClassname } from '../../../../utils/utility';

const SubmissionProcess = (props) => {
    return (
        <Aux>
            <div className="form-group">
                <h6><i className="far fa-calendar-alt"></i> TIẾN TRÌNH BÀI BÁO</h6>
            </div>
            <div className="form-group ml-3">
                <label>Trạng thái</label><br />
                <span className="ml-3">{props.submission.submissionLogs[props.submission.submissionLogs.length - 1].event}</span>
            </div>
            <div className="form-group ml-3">
                <label>Nhật ký hoạt động</label><br />
                <Link to="#" className="ml-3 text-primary" data-toggle="modal" data-target="#submissionLogsModal"><u>Xem chi tiết</u></Link>
            </div>
            <div className="form-group ml-3">
                <label>Pha</label><br />
                <div className={"badge " + getStageBadgeClassname(props.submission.stageId.value) + " ml-3"}>
                    {props.submission.stageId.name}
                </div>
            </div>
        </Aux>
    );
};

export default SubmissionProcess;