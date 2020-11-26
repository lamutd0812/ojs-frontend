import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { STAGE } from '../../../../utils/constant';

const SubmissionActions = (props) => {
    return (
        <Aux>
            {props.userId === props.submission.authorId._id ? (
                <div className="form-group">
                    <label>Chỉnh sửa</label><br />
                    {props.submission.submissionStatus.stageId.value === STAGE.SUBMISSION.value ? (
                        <Aux>
                            <Link to={`/dashboard/edit-submission/${props.submission._id}`} className="btn btn-outline-secondary btn-sm mr-1">
                                <i className="fas fa-pencil-alt"></i> Chỉnh sửa
                            </Link>
                            <button className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deleteSubmissionModal">
                                <i className="fas fa-trash"></i> Xóa bài báo
                            </button>
                        </Aux>
                    ) : props.submission.submissionStatus.stageId.value === STAGE.REVIEW.value && props.authorAssignment ? (
                        <Aux>
                            <Link to={`/dashboard/revise-submission/${props.submission._id}`} className="btn btn-outline-secondary btn-sm mr-1">
                                <i className="fas fa-pencil-alt"></i> Nộp bản chỉnh sửa bài báo
                            </Link>
                        </Aux>
                    ) : (
                        <Aux>
                            <button className="btn btn-outline-secondary btn-sm mr-1"
                                onClick={() => toast.error('Không thể chỉnh sửa bài báo khi chưa có yêu cầu.')}>
                                        <i className="fas fa-pencil-alt"></i> Chỉnh sửa
                            </button>
                            <button className="btn btn-outline-danger btn-sm"
                                onClick={() => toast.error('Không thể xóa bài báo trong thời gian thẩm định.')}>
                                        <i className="fas fa-trash"></i> Xóa bài báo
                            </button>
                        </Aux>
                    )}
                </div>
            ) : null}
        </Aux>
    );
};

export default SubmissionActions;