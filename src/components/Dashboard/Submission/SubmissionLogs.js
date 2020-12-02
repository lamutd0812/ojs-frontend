import React from 'react';
import { getFormattedDateOnly, getFormattedTimeOnly } from '../../../utils/utility';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const SubmissionLogs = (props) => {
    return (
        <Aux>
            <div className="modal fade" id="submissionLogsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Nhật ký hoạt động</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="timeline">
                                {props.logs.map(log => (
                                    <Aux key={log.createdAt}>
                                        <div className="time-label">
                                            <span className="bg-red">{getFormattedDateOnly(log.createdAt)}</span>
                                        </div>
                                        <div>
                                            <i className="fas fa-user bg-green"></i>
                                            <div className="timeline-item">
                                                <span className="time"><i className="fas fa-clock"></i> {getFormattedTimeOnly(log.createdAt)}</span>
                                                <h3 className="timeline-header no-border">{log.event}</h3>
                                            </div>
                                        </div>
                                    </Aux>
                                ))}
                                <div>
                                    <i className="fas fa-clock bg-gray"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default SubmissionLogs;