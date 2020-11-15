import React, { Component } from 'react';
// import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ContentHeader from '../Shared/ContentHeader';
import SubmissionInfor from '../Submission/SubmissionInfor/SubmissionInfor';
import Spinner from '../../UI/Spinner/Spinner';
import SubmissionLogs from '../Submission/SubmissionLogs';
import { updateObject, getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import { getSubmissionDetail } from '../../../store/actions/submissionActions';
import { getMyReviewerAssignmentDetail } from '../../../store/actions/reviewActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditorialBoard from '../Submission/SubmissionInfor/EditorialBoard';

class ReviewerAssignment extends Component {

    state = {
        step1Active: true,
        step2Active: false
    }

    componentDidMount() {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getMyReviewerAssignmentDetail(this.props.match.params.submissionId);
        }
    }

    refreshHandler = () => {
        if (this.props.match.params.submissionId) {
            this.props.getSubmissionDetail(this.props.match.params.submissionId);
            this.props.getMyReviewerAssignmentDetail(this.props.match.params.submissionId);
        }
    }

    step1ActiveHandler = (event) => {
        event.preventDefault();
        let newState = updateObject(this.state, {
            step1Active: true,
            step2Active: false,
        });
        this.setState(newState);
    }

    step2ActiveHandler = () => {
        let newState = updateObject(this.state, {
            step1Active: false,
            step2Active: true,
        });
        this.setState(newState);
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
                        <div className="card card-primary card-outline card-outline-tabs">
                            <div className="card-header">
                                {this.props.submission ? <h3 className="card-title">{this.props.submission.title}</h3> : null}
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-header p-0">
                                <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li className="nav-item">
                                        <div className={this.state.step1Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step1ActiveHandler}>
                                            <div className={this.state.step1Active ? 'text-primary' : 'text-dark'}><b>1. Chi tiết yêu cầu</b></div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={this.state.step2Active ? 'nav-link active' : 'nav-link'}
                                            onClick={this.step2ActiveHandler}>
                                            <div className={this.state.step2Active ? 'text-primary' : 'text-dark'}><b>2. Nộp ý kiến</b></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {this.props.submission && this.props.reviewerAssignment ? (
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        <div className={this.state.step1Active ? 'tab-pane show active' : 'tab-pane'}>
                                            {/* Row */}
                                            <div className="row">
                                                <div className="p-2 col-lg-12 border rounded">
                                                    <EditorialBoard
                                                        submission={this.props.submission}
                                                        reviewerAssignment={this.props.reviewerAssignment} />
                                                </div>
                                            </div>
                                            {/* Row */}
                                            <div className="row mt-2">
                                                <div className="p-2 col-lg-8 border rounded">
                                                    <SubmissionInfor
                                                        submission={this.props.submission} />
                                                </div>
                                                <div className="p-2 col-lg-4 border rounded">
                                                    <h6>THÔNG TIN CHI TIẾT YÊU CẦU</h6>
                                                    <div className="form-group ml-3">
                                                        <label>Nguời giao</label>
                                                        <p className="ml-4 text-primary">
                                                            <i className="fas fa-user text-dark"></i> {" "}
                                                            {this.props.reviewerAssignment.editorId.lastname} {this.props.reviewerAssignment.editorId.firstname}
                                                        </p>
                                                    </div>
                                                    <div className="form-group ml-3">
                                                        <label>Ngày giao</label>
                                                        <p className="ml-4">
                                                            {getFormattedDate(this.props.reviewerAssignment.createdAt)}
                                                        </p>
                                                    </div>
                                                    <div className="form-group ml-3">
                                                        <label>Thời hạn xử lý</label>
                                                        <p className="ml-4">
                                                            {getFormattedDate(this.props.reviewerAssignment.dueDate)}
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
                                        <div className={this.state.step2Active ? 'tab-pane show active' : 'tab-pane'}>
                                            TAB 2
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : <Spinner />}
                </section>
                {this.props.submission && <SubmissionLogs logs={this.props.submission.submissionLogs} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submission: state.submission.submission,
        loading: state.submission.loading,
        reviewerAssignment: state.review.reviewerAssignment
    }
};

const mapDispatchToProps = {
    getSubmissionDetail,
    getMyReviewerAssignmentDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewerAssignment);
