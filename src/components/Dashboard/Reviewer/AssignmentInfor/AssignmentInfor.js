import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { checkDueDate, getFormattedDate, getStageBadgeClassname } from '../../../../utils/utility';


const AssignmentInfor = (props) => {
    return (
        <Aux>
            <h6><i className="fas fa-tasks"></i> CHI TIẾT YÊU CẦU</h6>
            <div className="form-group ml-3">
                <label>Nguời giao</label>
                <div className="ml-4">
                    <i className="fas fa-user text-dark"></i> {" "}
                    <Link to="#" className="text-primary">
                        {props.reviewerAssignment.editorId.lastname} {props.reviewerAssignment.editorId.firstname}
                    </Link>
                    {" "}<div className="badge-ol badge-ol-danger badge-outlined mb-1">Biên tập viên</div>
                </div>
            </div>
            <div className="form-group ml-3">
                <label>Ngày giao</label>
                <div className="ml-4">
                    {getFormattedDate(props.reviewerAssignment.createdAt)}
                </div>
            </div>
            <div className="form-group ml-3">
                <label>Thời hạn xử lý</label>
                <div className="ml-4">
                    {getFormattedDate(props.reviewerAssignment.dueDate)} {" "}
                    {!checkDueDate(props.reviewerAssignment.dueDate) ? (
                        <div className="badge-ol badge-ol-danger mb-1">Hết hạn xử lý</div>
                    ) : null}
                </div>
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
                <div className="ml-3">
                    {props.submission.submissionStatus.status}
                </div>
            </div>
        </Aux>
    );
};

export default AssignmentInfor;