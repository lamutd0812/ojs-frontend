import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate, getStageBadgeClassname } from '../../../../utils/utility';

const SubmissionFutherInfor = (props) => {
    return (
        <Aux>
            <div className="form-group mt-4">
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
                <div className={"badge " + getStageBadgeClassname(props.submission.submissionStatus.stageId.value) + " ml-3"}>
                    {props.submission.submissionStatus.stageId.name}
                </div>
            </div>
            <div className="form-group">
                <label>Trạng thái</label><br />
                <p className="ml-3">
                    {props.submission.submissionStatus.status}
                </p>
            </div>
        </Aux>
    );
};

export default SubmissionFutherInfor;