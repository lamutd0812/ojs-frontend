import React from 'react';
import { getFormattedDateOnly, getFormattedTimeOnly } from '../../../utils/utility';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const SubmissionLogs = (props) => {
    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Nhật ký hoạt động</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="timeline">
                            {props.logs.map(log => (
                                <Aux>
                                    <div class="time-label">
                                        <span class="bg-red">{getFormattedDateOnly(log.createdAt)}</span>
                                    </div>
                                    <div>
                                        <i class="fas fa-user bg-green"></i>
                                        <div class="timeline-item">
                                            <span class="time"><i class="fas fa-clock"></i> {getFormattedTimeOnly(log.createdAt)}</span>
                                            <h3 class="timeline-header no-border">{log.event}</h3>
                                        </div>
                                    </div>
                                </Aux>
                            ))}

                            <div>
                                <i class="fas fa-clock bg-gray"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionLogs;