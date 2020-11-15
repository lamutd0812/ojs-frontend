import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const SubmissionInfor = (props) => {
    return (
        <Aux>
            <h6>THÔNG TIN CHI TIẾT BÀI BÁO</h6>
            <div className="form-group ml-3">
                <label>Thể loại</label>
                <Link to="#">
                    <p className="ml-4 text-success">{props.submission.categoryId.name}</p>
                </Link>
            </div>
            <div className="form-group ml-3">
                <label>Tiêu để</label>
                <p className="ml-4">{props.submission.title}</p>
            </div>
            <div className="form-group ml-3">
                <label>Mô tả</label>
                <p className="ml-4">
                    {props.submission.abstract}
                </p>
            </div>
            <div className="form-group mr-2">
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