import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../UI/Spinner/Spinner';
import AssignEditor from '../ChiefEditor/AssignEditor';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import { USER_ROLES } from '../../../utils/constant';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getAllEditors } from '../../../store/actions/reviewActions';

class SubmissionDetail extends Component {

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
        }
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.match.params.submissionId) {
    //         if (!this.props.submission || (this.props.submission && this.props.submission._id !== this.props.match.params.submissionId)) {
    //             this.props.getSubmissionDetail(this.props.match.params.submissionId);
    //         }
    //     }
    // }

    // Chief Editor Get All Editor to Assign
    getEditors = () => {
        if (this.props.editors.length < 1) {
            this.props.getAllEditors();
        }
    }

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
                            </div>
                            {this.props.submission ? (
                                <div className="card-body">
                                    <div className="row">
                                        <div className="p-2 col-lg-12 border rounded mb-3">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="form-group mr-2">
                                                        <label>Tác giả</label>
                                                        <Link to="#">
                                                            <p className="text-primary ml-4">{this.props.submission.authorId.firstname} {this.props.submission.authorId.lastname}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group mr-2">
                                                        <label>Biên tập viên (Editor)</label>
                                                        {this.props.submission.editorId ? (
                                                            <Link to="#">
                                                                <p className="text-primary ml-4">{this.props.submission.editorId.firstname} {this.props.submission.editorId.lastname}</p>
                                                            </Link>
                                                        ) : <p className="ml-4">Chưa được chỉ định</p>}
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
                                                        <button className="btn btn-primary btn-block"
                                                            data-toggle="modal"
                                                            data-target="#modalAssignEditor"
                                                            onClick={this.getEditors}>
                                                            Chỉ định biên tập viên
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block" disabled>
                                                            Chỉ định biên tập viên
                                                        </button>
                                                    </div>
                                                )}
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
                {this.props.permissionLevel === USER_ROLES.CHIEF_EDITOR.permissionLevel && (
                    <AssignEditor />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submission: state.submission.submission,
        loading: state.submission.loading,
        permissionLevel: state.auth.role.permissionLevel,
        editors: state.review.editors
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getAllEditors
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionDetail);