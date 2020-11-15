import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const EditorialBoard = (props) => {
    return (
        <Aux>
            <h6>THÔNG TIN BAN BIÊN TẬP</h6>
            <div className="row ml-2">
                <div className="col-lg-4">
                    <div className="form-group mr-2">
                        <label>Tác giả (Author)</label>
                        <Link to="#">
                            <p className="text-primary ml-4">
                                <i className="fas fa-user text-dark"></i> {" "}
                                {props.submission.authorId.lastname} {props.submission.authorId.firstname}
                            </p>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group mr-2">
                        <label>Biên tập viên (Editor)</label>
                        {props.reviewerAssignment ? (
                            <Link to="#">
                                <p className="text-primary ml-4">
                                    <i className="fas fa-user text-dark"></i> {" "}
                                    {props.reviewerAssignment.editorId.lastname} {props.reviewerAssignment.editorId.firstname}
                                </p>
                            </Link>
                        ) : props.editorAssignment ? (
                            <Link to="#">
                                <p className="text-primary ml-4">
                                    <i className="fas fa-user text-dark"></i> {" "}
                                    {props.editorAssignment.editorId.lastname} {props.editorAssignment.editorId.firstname}
                                </p>
                            </Link>
                        ) : null}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="form-group mr-2">
                        {props.reviewerAssignments ? (
                            <Aux>
                                <label>Thẩm định viên ({props.reviewerAssignments.length}/3)</label>
                                {props.reviewerAssignments.length > 0 ? (
                                    <div className="ml-4">
                                        {props.reviewerAssignments.map(ra => (
                                            <Link to="#" key={ra._id}>
                                                <div className="text-primary"><i className="fas fa-user text-dark"></i> {" "}
                                                    {ra.reviewerId.lastname} {ra.reviewerId.firstname}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                        <div className="ml-4">
                                            <div>Chưa được chỉ định</div>
                                        </div>
                                    )}
                            </Aux>
                        ) : props.reviewerAssignment ? (
                            <Aux>
                                <label>Thẩm định viên</label>
                                <div className="ml-4">
                                    <Link to="#">
                                        <div className="text-primary"><i className="fas fa-user text-dark"></i> {" "}
                                            {props.reviewerAssignment.reviewerId.lastname} {props.reviewerAssignment.reviewerId.firstname}
                                        </div>
                                    </Link>
                                </div>
                            </Aux>
                        ) : null}
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default EditorialBoard;