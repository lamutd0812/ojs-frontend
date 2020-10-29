import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import { USER_ROLES } from '../../../utils/constant';

class SubmissionDetail extends Component {

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
        }
    }

    // componentDidUpdate() {
    //     if (this.props.match.params.submissionId) {
    //         if (!this.props.submission || (this.props.submission && this.props.submission._id !== this.props.match.params.submissionId)) {
    //             this.props.getSubmissionDetail(this.props.match.params.submissionId);
    //         }
    //     }
    // }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader>
                        <li className="breadcrumb-item active">Submission Detail</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                {this.props.submission ? <h3 className="card-title">{this.props.submission.title}</h3> : null}
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            {this.props.submission ? (
                                <div className="card-body">
                                    <div className="row">
                                        <div className="p-2 col-lg-12 border rounded mb-3">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="form-group mr-2">
                                                        <label>Tác giả</label>
                                                        <p className="ml-4">{this.props.submission.authorId.firstname} {this.props.submission.authorId.lastname}</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group mr-2">
                                                        <label>Biên tập viên (Editor)</label>
                                                        <p className="ml-4">Chưa có</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group mr-2">
                                                        <label>Nhà thẩm định (Reviewers)</label>
                                                        <p className="ml-4">Chưa có</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="p-2 col-lg-9 border rounded">
                                            <div className="form-group mr-2">
                                                <label>Thể loại</label>
                                                <p className="ml-4">{this.props.submission.categoryId.name}</p>
                                            </div>
                                            <div className="form-group mr-2">
                                                <label>Tiêu để</label>
                                                <p className="ml-4">{this.props.submission.title}</p>
                                            </div>
                                            <div className="form-group mr-2">
                                                <label>Mô tả</label>
                                                <p className="ml-4">
                                                    {this.props.submission.abstract}
                                                </p>
                                            </div>
                                            <div className="form-group mr-2">
                                                <label>File đính kèm</label>
                                                <p className="ml-4">
                                                    <i className="fa fa-paperclip fa-lg"></i>
                                                    <a href={this.props.submission.attachmentUrl} className="text-primary" target="_blank" rel="noopener noreferrer">
                                                        {" "}{this.props.submission.attachmentFile}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-2 col-lg-3 border rounded">
                                            {this.props.permissionLevel === USER_ROLES.CHIEF_EDITOR.permissionLevel
                                                && !this.props.submission.editorId ? (
                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">Thêm biên tập viên</button>
                                                    </div>
                                                ) : null}
                                            {this.props.permissionLevel === USER_ROLES.CHIEF_EDITOR.permissionLevel ? (
                                                <div>
                                                    <div className="form-group">
                                                        <button className="btn btn-success btn-block">Chấp nhận bài báo</button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-danger btn-block">Từ chối bài báo</button>
                                                    </div>
                                                </div>
                                            ) : null}
                                            <div className="form-group">
                                                <label>Ngày đăng:</label>
                                                <p className="ml-4">
                                                    {getFormattedDate(this.props.submission.createdAt)}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label>Chỉnh sửa lần cuối</label>
                                                <p className="ml-4">
                                                    {getFormattedDate(this.props.submission.updatedAt)}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label>Pha</label><br />
                                                <div className={"badge " + getStageBadgeClassname(this.props.submission.submissionStatus.stageId.value) + " ml-3"}>
                                                    {this.props.submission.submissionStatus.stageId.name}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Trạng thái</label><br />
                                                <p className="ml-3">
                                                    {this.props.submission.submissionStatus.status}
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label>Nhật ký hoạt động</label><br />
                                                <Link to="#" className="ml-3 text-primary">Xem chi tiết.</Link>
                                            </div>
                                            {this.props.permissionLevel === USER_ROLES.AUTHOR.permissionLevel ? (
                                                <div className="form-group">
                                                    <label>Chỉnh sửa</label><br />
                                                    <Link to="#" className="btn btn-info btn-sm mr-1">
                                                        <i className="fas fa-pencil-alt"></i> Sửa
                                                    </Link>
                                                    <Link to="#" className="btn btn-danger btn-sm">
                                                        <i className="fas fa-trash"></i> Xóa
                                                    </Link>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : <Spinner />}
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submission: state.submission.submission,
        loading: state.submission.loading,
        permissionLevel: state.auth.role.permissionLevel
    }
};

const mapDispatchToProps = {
    getSubmissionDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionDetail);