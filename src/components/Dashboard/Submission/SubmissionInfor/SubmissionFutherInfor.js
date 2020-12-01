import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate, getStageBadgeClassname } from '../../../../utils/utility';

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
                <label>Nhật ký hoạt động</label><br />
                <Link to="#" className="ml-3 text-primary" data-toggle="modal" data-target="#submissionLogsModal"><u>Xem chi tiết</u></Link>
            </div>
            <div className="form-group">
                <label>Pha</label><br />
                <div className={"badge " + getStageBadgeClassname(props.submission.stageId.value) + " ml-3"}>
                    {props.submission.stageId.name}
                </div>
            </div>
        </Aux>
    );
};

export default SubmissionFutherInfor;