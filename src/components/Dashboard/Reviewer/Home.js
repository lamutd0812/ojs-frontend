import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import { getMyReviewerAssignments } from '../../../store/actions/reviewActions';
import { Link } from 'react-router-dom';
import { checkDueDate, getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';

class Home extends Component {

    componentDidMount() {
        this.props.getMyReviewerAssignments();
    }

    refreshHandler = () => {
        this.props.getMyReviewerAssignments();
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader title="Trang thẩm định viên" />
                </section>

                {/* <!-- Main content --> */}
                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Danh mục bài báo được phân công thẩm định</h3>
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                {this.props.reviewerAssignments.length > 0 ? (
                                    <table className="table table-striped projects" style={{ borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '1%' }}> #</th>
                                                <th style={{ width: '30%' }}> Bài Báo</th>
                                                <th style={{ width: '15%' }} className="text-center"> Pha</th>
                                                <th style={{ width: '15%' }} className="text-center"> Hạn xử lý</th>
                                                <th style={{ width: '10%' }} className="text-center"> Trạng thái</th>
                                                <th style={{ width: '15%' }} className="text-center"> Xử lý</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.reviewerAssignments.map(ra => (
                                                <Aux key={ra._id}>
                                                    <tr data-toggle="collapse" data-target={`#aaa${ra._id}`} className="accordion-toggle" aria-expanded="true" aria-controls="collapseOne">
                                                        <td style={{ cursor: 'pointer' }}><i className="fas fa-caret-down"></i></td>
                                                        <td>
                                                            <b>{ra.submissionId.title}</b>
                                                        </td>
                                                        <td className="project-state">
                                                            <span className={"badge " + getStageBadgeClassname(ra.submissionId.stageId.value)}>{ra.submissionId.stageId.name}</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <span>{getFormattedDate(ra.dueDate)}</span>
                                                            {!checkDueDate(ra.dueDate) ? (
                                                                <div className="badge-ol badge-ol-danger mb-1">Hết hạn xử lý</div>
                                                            ) : null}
                                                        </td>
                                                        <td className="text-center">
                                                            {ra.reviewerSubmissionId ? (
                                                                <span className="badge bg-success"> Đã nộp ý kiến</span>
                                                            ) : (
                                                                    <span className="badge bg-danger">Chưa nộp ý kiến</span>
                                                                )}
                                                        </td>
                                                        <td className="project-actions text-center">
                                                            {ra.reviewerSubmissionId ? (
                                                                <Link to={`/dashboard/reviewer/assignment/${ra.submissionId._id}`} className="btn btn-outline-primary btn-sm mr-1">
                                                                    <i className="fas fa-eye"></i> Xem
                                                                </Link>
                                                            ) : (
                                                                <Aux>
                                                                    {!checkDueDate(ra.dueDate) ? (
                                                                        <Link to={`/dashboard/reviewer/assignment/${ra.submissionId._id}`} className="btn btn-outline-primary btn-sm mr-1">
                                                                            <i className="fas fa-eye"></i> Xem
                                                                        </Link>
                                                                    ) : (
                                                                        <Link to={`/dashboard/reviewer/assignment/${ra.submissionId._id}`} className="btn btn-outline-primary btn-sm mr-1">
                                                                            <i className="fas fa-tasks"></i> Xử lý
                                                                        </Link>
                                                                    )}
                                                                </Aux>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr><td colSpan="6" className="hiddenRow">
                                                        <div id={`aaa${ra._id}`} className="accordian-body collapse">
                                                            <div className="col-lg-12">
                                                                <div className="row pl-5">
                                                                    <div className="col-lg-4 pt-2">
                                                                        <div className="mr-2 mb-3">
                                                                            <div className="font-weight-bold mb-1">Nguời giao</div>
                                                                            <div className="ml-3">
                                                                                <Link to="#">
                                                                                    <div className="text-primary"><i className="fas fa-user text-dark"></i> {" "}
                                                                                        {ra.editorId.lastname} {ra.editorId.firstname}
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mr-2">
                                                                            <div className="font-weight-bold">Ngày giao</div>
                                                                            <p className="ml-3">{getFormattedDate(ra.createdAt)}</p>
                                                                        </div>
                                                                        <div className="mr-2">
                                                                            <div className="font-weight-bold">Hạn xử lý</div>
                                                                            <p className="ml-3">{getFormattedDate(ra.dueDate)}</p>
                                                                        </div>
                                                                        <div className="mr-2">
                                                                            <div className="font-weight-bold">Lời nhắn</div>
                                                                            <p className="ml-3">{ra.message}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 border rounded pt-2">

                                                                    </div>
                                                                    <div className="col-lg-4 border rounded pt-2 pb-2">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td></tr>
                                                </Aux>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                        <div className="card-text ml-4">Bạn chưa được phân công chủ trì thẩm định bài báo nào.</div>
                                    )}
                            </div>
                        </div>
                    ) : <Spinner />}
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reviewerAssignments: state.review.reviewerAssignments,
        loading: state.review.loading,
        error: state.review.error
    }
};

const mapDispatchToProps = {
    getMyReviewerAssignments
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);