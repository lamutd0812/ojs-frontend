import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { checkDueDate, getFormattedDate } from '../../../../utils/utility';

const AssignmentInfor = (props) => {
    return (
        <Aux>
            <div className="form-group pt-3">
                <h6><i className="fas fa-tasks"></i> YÊU CẦU THẨM ĐỊNH</h6>
            </div>
            <div className="form-group ml-3">
                <label>Nguời giao</label>
                <div className="ml-4">
                    <i className="fas fa-user text-dark"></i> {" "}
                    <Link to="#" className="text-primary">
                        {props.editorAssignment.chiefEditorId.lastname} {props.editorAssignment.chiefEditorId.firstname}
                    </Link>
                    {" "}<div className="badge-ol badge-ol-danger badge-outlined mb-1">Tổng biên tập</div>
                </div>
            </div>
            <div className="form-group ml-3">
                <label>Ngày giao</label>
                <div className="ml-4">
                    {getFormattedDate(props.editorAssignment.createdAt)}
                </div>
            </div>
            <div className="form-group ml-3">
                <label>Thời hạn xử lý</label>
                <div className="ml-4">
                    {getFormattedDate(props.editorAssignment.dueDate)} {" "}
                    {!checkDueDate(props.editorAssignment.dueDate) ? (
                        <div className="badge-ol badge-ol-danger mb-1">Hết hạn xử lý</div>
                    ) : null}
                </div>
            </div>
        </Aux>
    );
};

export default AssignmentInfor;