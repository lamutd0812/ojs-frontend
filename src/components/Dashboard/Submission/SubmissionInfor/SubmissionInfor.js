import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const SubmissionInfor = (props) => {
    return (
        <Aux>
            <h6><i className="fas fa-info-circle"></i> THÔNG TIN CHI TIẾT BÀI BÁO</h6>
            <div className="form-group ml-3">
                <label>Thể loại</label>
                <Link to="#">
                    <div className="ml-4 text-success">{props.submission.categoryId.name}</div>
                </Link>
            </div>
            <div className="form-group ml-3">
                <label>Tiêu để</label>
                <div className="ml-4">{props.submission.title}</div>
            </div>
            <div className="form-group ml-3">
                <label>Tóm tắt</label>
                <div className="ml-4">
                    {props.submission.abstract}
                </div>
            </div>
            <div className="form-group ml-3">
                <label>File đính kèm</label>
                <p className="ml-4">
                    <i className="fa fa-paperclip fa-lg"></i>
                    <a href={props.submission.attachmentUrl} className="text-primary" target="_blank" rel="noopener noreferrer">
                        {" "}{props.submission.attachmentFile}
                    </a>
                </p>
            </div>
        </Aux>
    );
};

export default SubmissionInfor;