import React from 'react';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate } from '../../../../../utils/utility';

const RevisionDetail = (props) => {
    return (
        <Aux>
            {props.authorRevision ? (
                <Aux>
                    <div className="form-group ml-3">
                        <label>Bản chỉnh sửa bài báo</label>
                        <div className="text-primary ml-4"
                            style={{ cursor: 'pointer' }}
                            onClick={props.step1Active}>
                            <u>Xem chi tiết</u>
                        </div>
                    </div>
                    <div className="form-group ml-3">
                        <label>Ngày nộp</label>
                        <p className="ml-4">{getFormattedDate(props.authorRevision.createdAt)}</p>
                    </div>
                    <div className="form-group ml-3">
                        <label>Trạng thái</label><br />
                        {props.authorRevision.isAccepted ? (
                            <span className="decision-success ml-4">Biên tập viên đã tiếp nhận</span>
                        ) : (
                                <span className="decision-danger ml-4">Biên tập viên chưa tiếp nhận</span>
                            )}
                    </div>
                </Aux>
            ) : null}
        </Aux>
    );
};

export default RevisionDetail;