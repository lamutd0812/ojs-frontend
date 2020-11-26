import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import { getMyEditorAssignments } from '../../../store/actions/reviewActions';
import { Link } from 'react-router-dom';
import { checkDueDate, getDoughnutData, getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import { Doughnut } from 'react-chartjs-2';

class Home extends Component {

    componentDidMount() {
        this.props.getMyEditorAssignments();
    }

    refreshHandler = () => {
        this.props.getMyEditorAssignments();
    }

    fetchDoughnutData = (reviewerAssignments) => {
        const data = getDoughnutData(reviewerAssignments);
        return data;
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader title="Trang biên tập viên" />
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
                                {this.props.editorAssignments.length > 0 ? (
                                    <table className="table table-striped projects" style={{ borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '1%' }}> #</th>
                                                <th style={{ width: '25%' }}> Bài Báo</th>
                                                <th style={{ width: '15%' }} className="text-center"> Pha</th>
                                                <th style={{ width: '15%' }} className="text-center"> Thẩm định viên</th>
                                                <th style={{ width: '15%' }} className="text-center"> Hạn xử lý</th>
                                                <th style={{ width: '15%' }} className="text-center"> Trạng thái</th>
                                                <th style={{ width: '15%' }} className="text-center"> Xử lý</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.editorAssignments.map(ea => (
                                                <Aux key={ea._id}>
                                                    <tr data-toggle="collapse" data-target={`#aaa${ea._id}`} className="accordion-toggle" aria-expanded="true" aria-controls="collapseOne">
                                                        <td style={{ cursor: 'pointer' }}><i className="fas fa-caret-down"></i></td>
                                                        <td>
                                                            <b>{ea.submissionId.title}</b>
                                                        </td>
                                                        <td className="project-state">
                                                            <span className={"badge " + getStageBadgeClassname(ea.submissionId.submissionStatus.stageId.value)}>{ea.submissionId.submissionStatus.stageId.name}</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <i className="fas fa-user"></i> {" "}
                                                            <span>{ea.reviewerAssignmentId.length}/3</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <span>{getFormattedDate(ea.dueDate)}</span>
                                                            {!checkDueDate(ea.dueDate) ? (
                                                                <div className="badge-ol badge-ol-danger mb-1">Hết hạn xử lý</div>
                                                            ) : null}
                                                        </td>
                                                        <td className="text-center">
                                                            {ea.authorAssignmentId ? (
                                                                <span className="text-danger"><i className="fas fa-edit"></i> Đã yêu cầu tác giả chỉnh sửa</span>
                                                            ) : ea.editorSubmissionId ? (
                                                                <span className="badge bg-success"> Đã nộp ý kiến</span>
                                                            ) : (
                                                                <span className="badge bg-danger">Chưa nộp ý kiến</span>
                                                            )}
                                                        </td>
                                                        <td className="project-actions text-center">
                                                            {!checkDueDate(ea.dueDate) ? (
                                                                <Link to={`/dashboard/editor/assignment/${ea.submissionId._id}`} className="btn btn-outline-primary btn-sm mr-1">
                                                                    <i className="fas fa-eye"></i> Xem
                                                                </Link>
                                                            ) : (
                                                                    <Link to={`/dashboard/editor/assignment/${ea.submissionId._id}`} className="btn btn-outline-primary btn-sm mr-1">
                                                                        <i className="fas fa-tasks"></i> Xử lý
                                                                    </Link>
                                                                )}
                                                        </td>
                                                    </tr>
                                                    <tr><td colSpan="8" className="hiddenRow">
                                                        <div id={`aaa${ea._id}`} className="accordian-body collapse">
                                                            <div className="col-lg-12">
                                                                <div className="row pl-5">
                                                                    <div className="col-lg-4 pt-2">
                                                                        <div className="mr-2">
                                                                            <div className="font-weight-bold">Nguời giao</div>
                                                                            <div className="ml-3 pb-2">
                                                                                <Link to="#">
                                                                                    <div className="text-primary mt-2 mb-2"><i className="fas fa-user text-dark"></i> {" "}
                                                                                        {ea.chiefEditorId.lastname} {ea.chiefEditorId.firstname}
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mr-2">
                                                                            <div className="font-weight-bold">Ngày giao</div>
                                                                            <p className="ml-3">{getFormattedDate(ea.createdAt)}</p>
                                                                        </div>
                                                                        <div className="mr-2">
                                                                            <div className="font-weight-bold">Hạn xử lý</div>
                                                                            <p className="ml-3">{getFormattedDate(ea.dueDate)}</p>
                                                                        </div>
                                                                        <div className="mr-2">
                                                                            <div className="font-weight-bold">Lời nhắn</div>
                                                                            <p className="ml-3">{ea.message}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 border rounded pt-2">
                                                                        <div className="form-group">
                                                                            <label>Tác giả</label>
                                                                            <div className="ml-4">
                                                                                <Link to="#">
                                                                                    <div className="text-primary"><i className="fas fa-user text-dark"></i> {" "}
                                                                                        {ea.submissionId.authorId.lastname} {ea.submissionId.authorId.firstname}
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Biên tập viên</label>
                                                                            <div className="ml-4">
                                                                                <Link to="#">
                                                                                    <div className="text-primary"><i className="fas fa-user text-dark"></i> {" "}
                                                                                        {ea.editorId.lastname} {ea.editorId.firstname}
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Thẩm định viên ({ea.reviewerAssignmentId.length}/3)</label>
                                                                            {ea.reviewerAssignmentId.length > 0 ? (
                                                                                <div className="ml-4">
                                                                                    {ea.reviewerAssignmentId.map(ra => (
                                                                                        <Link to="#" key={ra._id}>
                                                                                            <div className="text-primary"><i className="fas fa-user text-dark"></i> {" "}
                                                                                                {ra.reviewerId.lastname} {ra.reviewerId.firstname}
                                                                                            </div>
                                                                                        </Link>
                                                                                    ))}
                                                                                </div>
                                                                            ) : (
                                                                                    <div className="ml-4">
                                                                                        <div>Thẩm định viên chưa được chỉ định</div>
                                                                                    </div>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 border rounded pt-2 pb-2">
                                                                        <label>Ý kiến thẩm định viên</label>
                                                                        <div className="form-group">
                                                                            {ea.reviewerAssignmentId.length > 0 ? (
                                                                                <Aux>
                                                                                    <Doughnut
                                                                                        // data={data}
                                                                                        data={this.fetchDoughnutData(ea.reviewerAssignmentId)}
                                                                                        options={{
                                                                                            responsive: true,
                                                                                            maintainAspectRatio: true,
                                                                                            legend: {
                                                                                                labels: {
                                                                                                    fontSize: 10,
                                                                                                    fontFamily: 'Roboto Slab'
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <Link to={`/dashboard/editor/assignment/${ea.submissionId._id}`} className="text-primary"><u>Xem chi tiết</u></Link>
                                                                                </Aux>
                                                                            ) : (
                                                                                    <div className="ml-4">
                                                                                        <div>Thẩm định viên chưa được chỉ định</div>
                                                                                    </div>
                                                                                )}
                                                                        </div>
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
        token: state.auth.token,
        editorAssignments: state.review.editorAssignments,
        loading: state.review.loading,
        error: state.review.error
    }
};

const mapDispatchToProps = {
    getMyEditorAssignments
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);