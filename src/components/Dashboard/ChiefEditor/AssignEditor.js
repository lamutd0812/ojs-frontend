import React from 'react';

const AssignEditor = () => {
    return (
        <div>
            <div class="modal fade" id="modalAssignEditor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h4 class="modal-title w-100 font-weight-bold">Giao bài báo cho Biên tập viên</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mx-3">
                            <div class="md-form mb-5">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title"><b>Danh sách Biên tập viên</b></h3>
                                        <div class="card-tools">
                                            <div class="input-group input-group-sm" style={{ width: '150px' }}>
                                                <input type="text" class="form-control float-right" placeholder="Tìm kiếm" />
                                                <div class="input-group-append">
                                                    <button type="submit" class="btn btn-default">
                                                        <i class="fas fa-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body table-responsive p-0" style={{ height: '300px' }}>
                                        <table class="table table-head-fixed text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Chọn</th>
                                                    <th>User</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Reason</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="radio">
                                                            <label><input type="radio" id='regular' name="optradio" /></label>
                                                        </div>
                                                    </td>
                                                    <td>John Doe</td>
                                                    <td>11-7-2014</td>
                                                    <td><span class="tag tag-success">Approved</span></td>
                                                    <td>Bacon ipsum dolor .</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="radio">
                                                            <label><input type="radio" id='regular' name="optradio" /></label>
                                                        </div>
                                                    </td>
                                                    <td>Alexander Pierce</td>
                                                    <td>11-7-2014</td>
                                                    <td><span class="tag tag-warning">Pending</span></td>
                                                    <td>Bacon ipsum dolor </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="radio">
                                                            <label><input type="radio" id='regular' name="optradio" /></label>
                                                        </div>
                                                    </td>
                                                    <td>Bob Doe</td>
                                                    <td>11-7-2014</td>
                                                    <td><span class="tag tag-primary">Approved</span></td>
                                                    <td>Bacon ipsum dolor </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="radio">
                                                            <label><input type="radio" id='regular' name="optradio" /></label>
                                                        </div>
                                                    </td>
                                                    <td>Mike Doe</td>
                                                    <td>11-7-2014</td>
                                                    <td><span class="tag tag-danger">Denied</span></td>
                                                    <td>Bacon ipsum dolor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="radio">
                                                            <label><input type="radio" id='regular' name="optradio" /></label>
                                                        </div>
                                                    </td>
                                                    <td>Jim Doe</td>
                                                    <td>11-7-2014</td>
                                                    <td><span class="tag tag-success">Approved</span></td>
                                                    <td>Bacon ipsum dolor </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="radio">
                                                            <label><input type="radio" id='regular' name="optradio" /></label>
                                                        </div>
                                                    </td>
                                                    <td>Victoria Doe</td>
                                                    <td>11-7-2014</td>
                                                    <td><span class="tag tag-warning">Pending</span></td>
                                                    <td>Bacon ipsum dolor </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="radio">
                                                            <label><input type="radio" id='regular' name="optradio" /></label>
                                                        </div>
                                                    </td>
                                                    <td>Michael Doe</td>
                                                    <td>11-7-2014</td>
                                                    <td><span class="tag tag-primary">Approved</span></td>
                                                    <td>Bacon ipsum dolor</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="radio">
                                                            <label><input type="radio" id='regular' name="optradio" /></label>
                                                        </div>
                                                    </td>
                                                    <td>Rocky Doe</td>
                                                    <td>11-7-2014</td>
                                                    <td><span class="tag tag-danger">Denied</span></td>
                                                    <td>Bacon ipsum dolor </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button class="btn btn-primary">Giao</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignEditor;