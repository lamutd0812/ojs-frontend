import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate, getStageBadgeClassname } from '../../../../utils/utility';

const AssignmentInfor = (props) => {
    return (
        <Aux>
            <div className="form-group pt-3">
                <h6><i className="fas fa-tasks"></i> THÔNG TIN CHI TIẾT YÊU CẦU</h6>
            </div>
            <div className="form-group ml-3">
                <label>Nguời giao</label>
                <p className="ml-4 text-primary">
                    <i className="fas fa-user text-dark"></i> {" "}
                    {props.editorAssignment.chiefEditorId.lastname} {props.editorAssignment.chiefEditorId.firstname}
                </p>
            </div>
            <div className="form-group ml-3">
                <label>Ngày giao</label>
                <p className="ml-4">
                    {getFormattedDate(props.editorAssignment.createdAt)}
                </p>
            </div>
            <div className="form-group ml-3">
                <label>Thời hạn xử lý</label>
                <p className="ml-4">
                    {getFormattedDate(props.editorAssignment.dueDate)}
                </p>
            </div>
            <div className="form-group">
                <h6><i className="far fa-calendar-alt"></i> TIẾN TRÌNH BÀI BÁO</h6>
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