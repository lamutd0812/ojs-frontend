import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SubmissionDetail extends Component {
    render() {
        return (
            <div class="content-wrapper">
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Thông tin chi tiết bài báo</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="a">Dashboard</a></li>
                                    <li class="breadcrumb-item">Submissions</li>
                                    <li class="breadcrumb-item active">Submission Detail</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Chi tiết bài báo</h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="p-2 col-lg-12 border rounded mb-3">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group mr-2">
                                                <label>Tác giả</label>
                                                <p class="ml-4">Testtttttttttttttttttttttttttttttttt</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group mr-2">
                                                <label>Biên tập viên</label>
                                                <p class="ml-4">Chưa có</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group mr-2">
                                                <label>Danh sách nhà thẩm định</label>
                                                <p class="ml-4">Chưa có</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="p-2 col-lg-8 border rounded">
                                    <div class="form-group mr-2">
                                        <label>Thể loại</label>
                                        <p class="ml-4">Machime Learning</p>
                                    </div>
                                    <div class="form-group mr-2">
                                        <label>Tiêu để</label>
                                        <p class="ml-4">Unsupervised real-time anomaly detection for streaming data</p>
                                    </div>
                                    <div class="form-group mr-2">
                                        <label>Mô tả</label>
                                        <p class="ml-4">
                                            Streaming data inherently exhibits concept drift, favoring algorithms that learn continuously. Furthermore, the massive number of independent streams in practice requires that anomaly detectors be fully automated. In this paper we propose a novel anomaly detection algorithm that meets these constraints. The technique is based on an online sequence memory algorithm called Hierarchical Temporal Memory (HTM). We also present results using the Numenta Anomaly Benchmark (NAB), a benchmark containing real-world data streams with labeled anomalies. The benchmark, the first of its kind, provides a controlled open-source environment for testing anomaly detection algorithms on streaming data.
                                        </p>
                                    </div>
                                    <div class="form-group mr-2">
                                        <label>File đính kèm</label>
                                        <p class="ml-4">
                                            <i class="fa fa-paperclip fa-lg"></i>
                                             Testtttttttttttttttttttttttttttttttt
                                        </p>
                                    </div>
                                </div>
                                <div class="p-2 col-lg-4 border rounded">
                                    <div class="form-group">
                                        <label>Ngày đăng</label>
                                        <p class="ml-4">26/10/2020</p>
                                    </div>
                                    <div class="form-group">
                                        <label>Chỉnh sửa lần cuối</label>
                                        <p class="ml-4">26/10/2020</p>
                                    </div>
                                    <div class="form-group">
                                        <label>Pha</label><br />
                                        <div class="badge badge-dark ml-3">Chờ thẩm định</div>
                                    </div>
                                    <div class="form-group">
                                        <label>Trạng thái</label><br />
                                        <p class="ml-3">Submit bài báo lên hệ thống thành công.</p>
                                    </div>
                                    <div class="form-group">
                                        <label>Nhật ký hoạt động</label><br />
                                        <p class="ml-3">Xem chi tiết.</p>
                                    </div>
                                    <div class="form-group">
                                        <label>Chỉnh sửa</label><br />
                                        <Link to="#" className="btn btn-info btn-sm mr-1">
                                            <i className="fas fa-pencil-alt"></i> Sửa
                                        </Link>
                                        <Link to="#" className="btn btn-danger btn-sm">
                                            <i className="fas fa-trash"></i> Xóa
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SubmissionDetail;