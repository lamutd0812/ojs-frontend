import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate } from '../../../../utils/utility';

const AuthorAssignment = (props) => {
    return (
        <Aux>
            {props.authorAssignment ? (
                <Aux>
                    <div className="form-group ml-3">
                        <label>Trạng thái</label><br />
                        {props.authorAssignment.authorRevisionId ? (
                            <span className="decision-success ml-4">
                                Tác giả đã gửi bản chỉnh sửa bài báo
                            </span>
                        ) : (
                            <span className="decision-danger ml-4">
                                Tác giả chưa gửi bản chỉnh sửa bài báo
                            </span>
                        )}
                    </div>
                    <div className="form-group ml-3">
                        <label>Người gửi</label>
                        {/* <p className="ml-4">{props.authorAssignment.editorId.lastname} {props.authorAssignment.editorId.firstname}</p> */}
                        <Link to="#">
                            <div className="text-primary ml-3"><i className="fas fa-user text-dark"></i> {" "}
                                {props.authorAssignment.editorId.lastname} {props.authorAssignment.editorId.firstname}
                            </div>
                        </Link>
                    </div>
                    <div className="form-group ml-3">
                        <label>Lời nhắn</label>
                        <p className="ml-4">{props.authorAssignment.message}</p>
                    </div>
                    <div className="form-group ml-3">
                        <label>Ngày gửi yêu cầu</label>
                        <p className="ml-4">{getFormattedDate(props.authorAssignment.createdAt)}</p>
                    </div>
                    <div className="form-group ml-3">
                        <label>Hạn nộp bản chỉnh sửa</label>
                        <p className="ml-4">{getFormattedDate(props.authorAssignment.dueDate)}</p>
                    </div>
                </Aux>
            ) : null}
        </Aux>
    );
};

export default AuthorAssignment;