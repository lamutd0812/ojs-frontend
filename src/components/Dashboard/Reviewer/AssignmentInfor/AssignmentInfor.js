import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate, getStageBadgeClassname } from '../../../../utils/utility';


const AssignmentInfor = (props) => {
    return (
        <Aux>
            <h6>CHI TIẾT YÊU CẦU</h6>
            <div className="form-group ml-3">
                <label>Nguời giao</label>
                <p className="ml-4 text-primary">
                    <i className="fas fa-user text-dark"></i> {" "}
                    {props.reviewerAssignment.editorId.lastname} {props.reviewerAssignment.editorId.firstname}
                </p>
            </div>
            <div className="form-group ml-3">
                <label>Ngày giao</label>
                <p className="ml-4">
                    {getFormattedDate(props.reviewerAssignment.createdAt)}
                </p>
            </div>
            <div className="form-group ml-3">
                <label>Thời hạn xử lý</label>
                <p className="ml-4">
                    {getFormattedDate(props.reviewerAssignment.dueDate)}
                </p>
            </div>
            <div className="form-group">
                <h6>TIẾN TRÌNH BÀI BÁO</h6>
            </div>
            <div className="form-group ml-3">
                <label>Nhật ký hoạt động</label><br />
                <Link to="#" className="ml-3 text-primary" data-toggle="modal" data-target="#submissionLogsModal"><u>Xem chi tiết</u></Link>
            </div>
            <div className="form-group ml-3">
                <label>Pha</label><br />
                <div className={"badge " + getStageBadgeClassname(props.submission.submissionStatus.stageId.value) + " ml-3"}>
                    {props.submission.submissionStatus.stageId.name}
                </div>
            </div>
            <div className="form-group ml-3">
                <label>Trạng thái</label><br />
                <p className="ml-3">
                    {props.submission.submissionStatus.status}
                </p>
            </div>
        </Aux>
    );
};

export default AssignmentInfor;