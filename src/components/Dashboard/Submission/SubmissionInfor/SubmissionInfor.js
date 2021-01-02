import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import { SUBMISSION_TYPES } from '../../../../utils/constant';

const SubmissionInfor = (props) => {
    return (
        <Aux>
            <h6>
                <i className="fas fa-info-circle"></i> THÔNG TIN CHI TIẾT BÀI BÁO {" "}
                {props.hasAuthorRevision && <div className="badge-ol badge-ol-secondary badge-outlined mb-1"> Bản chỉnh sửa</div>}
            </h6>
            <div className="form-group ml-3">
                <label>Loại bài báo</label>
                <Link to="#">
                    <div className="ml-4 text-danger">
                        <div className="badge-ol badge-ol-danger badge-outlined mb-1 pl-3 pr-3 pt-2 pb-2">
                            {props.submission.typeId.name}
                        </div>
                    </div>
                </Link>
            </div>
            {props.submission.typeId.name === SUBMISSION_TYPES.PUBLISHED_RESEARCH.name && (
                <Aux>
                    <div className="form-group ml-3">
                        <label>Tạp chí xuất bản</label>
                        <p className="ml-4">{props.submission.magazineName}</p>
                    </div>
                    <div className="form-group ml-3">
                        <label>DOI</label>
                        <p className="ml-4">{props.submission.DOI}</p>
                    </div>
                </Aux>
            )}
            <div className="form-group ml-3">
                <label>Lĩnh vực nghiên cứu</label>
                <Link to="#">
                    <div className="ml-4 text-danger">{props.submission.categoryId.name}</div>
                </Link>
            </div>
            <div className="form-group ml-3">
                <label>Tiêu đề</label>
                <p className="ml-4">{props.submission.title}</p>
            </div>
            <div className="form-group ml-3">
                <label>Tóm tắt</label>
                <p className="ml-4">
                    {props.submission.abstract}
                </p>
            </div>
            <div className="form-group ml-3">
                <label>File bài báo</label>
                <p className="ml-4">
                    <i className="fa fa-paperclip fa-lg"></i>
                    <a href={props.submission.attachmentUrl} className="text-primary" target="_blank" rel="noopener noreferrer">
                        {" "}{props.submission.attachmentFile}
                    </a>
                </p>
            </div>
            {/* Metadata */}
            <h6>
                <i className="fas fa-tag"></i> METADATA {" "}
            </h6>
            <div className="form-group ml-3">
                <label>Danh sách đồng tác giả</label>
                {props.submission.contributors.length > 0 ? props.submission.contributors.map((contributor, idx) => (
                    <div className="row" key={idx}>
                        <div className="text-primary ml-4 font-weight-bold">
                            <i className="fas fa-user text-dark"></i> {" "}
                            {contributor.fullname} - {" "}
                        </div>
                        <div>
                            {contributor.affiliation}
                        </div>
                    </div>
                )) : <div className="ml-4 text-secondary">Không có đồng tác giả nào.</div>}
                <label className="pt-3">Tài liệu kèm theo</label>
                {props.submission.metadata.length > 0 ? props.submission.metadata.map((file, idx) => (
                    <div className="ml-4" key={idx}>
                        <i className="fa fa-paperclip fa-lg"></i>
                        <a href={file.url} className="text-primary" target="_blank" rel="noopener noreferrer">
                            {" "}{file.filename}
                        </a>
                    </div>
                )) : <div className="ml-4 text-secondary">Không có tài liệu kèm theo nào.</div>}
            </div>
        </Aux>
    );
};

export default SubmissionInfor;