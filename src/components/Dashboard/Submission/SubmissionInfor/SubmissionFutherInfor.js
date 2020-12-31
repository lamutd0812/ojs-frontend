import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate, getStageBadgeClassname2 } from '../../../../utils/utility';

const SubmissionFutherInfor = (props) => {
    return (
        <Aux>
            <div className="form-group">
                <h6><i className="far fa-calendar-alt"></i> TIẾN TRÌNH BÀI BÁO</h6>
            </div>
            <div className="form-group">
                <label>Ngày đăng:</label>
                <p className="ml-4">
                    {getFormattedDate(props.submission.createdAt)}
                </p>
            </div>
            <div className="form-group">
                <label>Cập nhật lần cuối:</label>
                <p className="ml-4">
                    {getFormattedDate(props.submission.updatedAt)}
                </p>
            </div>
            <div className="form-group">
                <label>Trạng thái</label><br />
                <span className="ml-3">{props.submission.submissionLogs[props.submission.submissionLogs.length - 1].event}</span>
            </div>
            <div className="form-group">
                <label>Nhật ký hoạt động</label><br />
                <Link to="#" className="ml-3 text-primary" data-toggle="modal" data-target="#submissionLogsModal"><u>Xem chi tiết</u></Link>
            </div>
            <div className="form-group">
                <label>Pha</label><br />
                <div className={"badge-ol " + getStageBadgeClassname2(props.submission.stageId.value) + " pt-2 pb-2"} style={{ width: '120px', fontSize: '14px' }}>
                    {props.submission.stageId.name}
                </div>
            </div>
        </Aux>
    );
};

export default SubmissionFutherInfor;