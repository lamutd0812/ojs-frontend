import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubmissionLogs from '../Submission/SubmissionLogs';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../Shared/ContentHeader';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getEditorAssignmentBySubmission, getReviewerAssignmentsBySubmission } from '../../../store/actions/reviewActions';
import { Doughnut } from 'react-chartjs-2';
import ReviewerSubmission from './ReviewerSubmission';

const data = {
    labels: ['Chấp nhận bài báo', 'Yêu cầu chỉnh sửa', 'Chưa nộp ý kiến'],
    datasets: [
        {
            data: [1, 1, 1],
            backgroundColor: [
                '#28a745',
                '#dc3545',
                '#17a2b8'
            ]
        },
    ],
}

class EditorAssignment extends Component {

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
            this.props.getReviewerAssignmentsBySubmission(this.props.match.params.submissionId);
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getEditorAssignmentBySubmission(this.props.match.params.submissionId);
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Xử lý yêu cầu thẩm định">
                        <li className="breadcrumb-item active">Submission Detail</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                {this.props.submission ? <h3 className="card-title">{this.props.submission.title}</h3> : null}
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>

                            {this.props.submission && this.props.editorAssignment && this.props.reviewerAssignments ? (
                                <div className="card-body">
                                    {/* Row */}
                                    <div className="row">
                                        <div className="p-2 col-lg-12 border rounded">
                                            <EditorialBoard
                                                submission={this.props.submission}
                                                editorAssignment={this.props.editorAssignment}
                                                reviewerAssignments={this.props.reviewerAssignments} />
                                        </div>
                                    </div>
                                    {/* Row */}
                                    <div className="row border rounded mt-2">
                                        <div className="p-2 col-lg-8">
                                            <h6>Ý KIẾN CỦA THẨM ĐỊNH VIÊN</h6>
                                            <table className="table table-bordered table-sm mt-2">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '1%' }}>#</th>
                                                        <th style={{ width: '30%' }}>Thẩm định viên</th>
                                                        <th style={{ width: '25%' }}>Trạng thái</th>
                                                        <th style={{ width: '25%' }} className="text-center">Quyết định</th>
                                                        <th style={{ width: '19%' }} className="text-center">Chi tiết</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Nguyễn Tùng Dương</td>
                                                        <td>Đã nộp ý kiến</td>
                                                        <td className="text-center">
                                                            <span className="badge bg-success p-1">Chấp nhận bài báo</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <Link to="#" className="text-primary" style={{ fontWeight: '400' }} data-toggle="modal" data-target="#reviewerSubmissionModal">
                                                                <u>Xem</u>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Lê Văn Nam</td>
                                                        <td>Đã nộp ý kiến</td>
                                                        <td className="text-center">
                                                            <span className="badge bg-danger p-1">Yêu cầu chỉnh sửa</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <Link to="#" className="text-primary" style={{ fontWeight: '400' }} data-toggle="modal" data-target="#reviewerSubmissionModal">
                                                                <u>Xem</u>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>David De Gea</td>
                                                        <td>Chưa nộp ý kiến</td>
                                                        <td className="text-center">
                                                            <span className="badge bg-secondary p-1">Chưa nộp ý kiến</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <Link to="#" className="link-disabled" style={{ fontWeight: '400' }} data-toggle="modal" data-target="#reviewerSubmissionModal">
                                                                <u>Xem</u>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-2 col-lg-4">
                                            <Doughnut
                                                data={data}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: true,
                                                    legend: {
                                                        labels: {
                                                            fontFamily: 'Roboto Slab'
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Row */}
                                    <div className="row pt-2">
                                        <div className="p-2 col-lg-8 border rounded">
                                            <SubmissionInfor
                                                submission={this.props.submission} />
                                        </div>
                                        <div className="p-2 col-lg-4 border rounded">
                                            <div className="form-group">
                                                <h6>GỬI QUYẾT ĐỊNH</h6>
                                            </div>
                                            {this.props.reviewerAssignments.length < 3 ? (
                                                <div className="form-group">
                                                    <Link to={`/dashboard/editor/assign-reviewer?submissionId=${this.props.submission._id}`}>
                                                        <button className="btn btn-outline-primary btn-block">
                                                            <i className="fas fa-user"></i>{" "}
                                                                Chỉ định thẩm định viên
                                                        </button>
                                                    </Link>
                                                </div>
                                            ) : null}
                                            <div className="form-group">
                                                <button className="btn btn-outline-success btn-block">
                                                    <i className="fas fa-check"></i> {" "}
                                                    Chấp nhận bài báo
                                                </button>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-outline-danger btn-block">
                                                    <i className="fas fa-edit"></i> {" "}
                                                    Yêu cầu chỉnh sửa
                                                </button>
                                            </div>
                                            <div className="form-group pt-3">
                                                <h6>THÔNG TIN CHI TIẾT YÊU CẦU</h6>
                                            </div>
                                            <div className="form-group ml-3">
                                                <label>Nguời giao</label>
                                                <p className="ml-4 text-primary">
                                                    <i className="fas fa-user text-dark"></i> {" "}
                                                    {this.props.editorAssignment.chiefEditorId.lastname} {this.props.editorAssignment.chiefEditorId.firstname}
                                                </p>
                                            </div>
                                            <div className="form-group ml-3">
                                                <label>Ngày giao</label>
                                                <p className="ml-4">
                                                    {getFormattedDate(this.props.editorAssignment.createdAt)}
                                                </p>
                                            </div>
                                            <div className="form-group ml-3">
                                                <label>Thời hạn xử lý</label>
                                                <p className="ml-4">
                                                    {getFormattedDate(this.props.editorAssignment.dueDate)}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <h6>TIẾN TRÌNH THẨM ĐỊNH</h6>
                                            </div>
                                            <div className="form-group ml-3">
                                                <label>Nhật ký hoạt động</label><br />
                                                <Link to="#" className="ml-3 text-primary" data-toggle="modal" data-target="#submissionLogsModal"><u>Xem chi tiết</u></Link>
                                            </div>
                                            <div className="form-group ml-3">
                                                <label>Pha</label><br />
                                                <div className={"badge " + getStageBadgeClassname(this.props.submission.submissionStatus.stageId.value) + " ml-3"}>
                                                    {this.props.submission.submissionStatus.stageId.name}
                                                </div>
                                            </div>
                                            <div className="form-group ml-3">
                                                <label>Trạng thái</label><br />
                                                <p className="ml-3">
                                                    {this.props.submission.submissionStatus.status}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : <Spinner />}
                </section>
                {this.props.submission && <SubmissionLogs logs={this.props.submission.submissionLogs} />}
                <ReviewerSubmission />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submission: state.submission.submission,
        loading: state.submission.loading,
        editorAssignment: state.review.editorAssignment,
        reviewerAssignments: state.review.reviewerAssignments
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getEditorAssignmentBySubmission,
    getReviewerAssignmentsBySubmission
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorAssignment);