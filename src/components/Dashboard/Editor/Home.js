import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import { getMyNotifications } from '../../../store/actions/authActions';
import { getCategories, getStages, getSubmissionTypes } from '../../../store/actions/submissionActions';
import { getMyEditorAssignments } from '../../../store/actions/reviewActions';
import { Link } from 'react-router-dom';
import { checkDueDate, getDoughnutData, getFormattedDate, getFormattedDateOnly, getStageBadgeClassname, updateObject } from '../../../utils/utility';
import { Doughnut } from 'react-chartjs-2';
import Pagination from '../../UI/Pagination/Pagination';
import { SUBMISSION_TYPES } from '../../../utils/constant';
import Filter from '../Filter/Filter';

const ITEMS_PER_PAGE = 8;
class Home extends Component {

    state = {
        selectedCategoryId: '',
        selectedStageId: '',
        selectedTypeId: '',
        keyword: ''
    }

    init = () => {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const page = query.get('page');
            if (page) {
                this.props.getMyEditorAssignments(page, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, this.state.selectedTypeId);
            }
        } else {
            this.props.getMyEditorAssignments(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, this.state.selectedTypeId);
        }
    }

    componentDidMount() {
        this.props.getCategories();
        this.props.getStages();
        this.props.getSubmissionTypes();
        this.init();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const prevQuery = new URLSearchParams(prevProps.location.search);
            const query = new URLSearchParams(this.props.location.search);
            const prevPage = prevQuery.get('page');
            const page = query.get('page');
            if (page !== prevPage) {
                this.props.getMyEditorAssignments(page, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, this.state.selectedTypeId);
            }
        }
    }

    refreshHandler = () => {
        this.init();
        this.props.getMyNotifications();
    }

    fetchDoughnutData = (reviewerAssignments) => {
        const data = getDoughnutData(reviewerAssignments);
        return data;
    }

    searchInputChangeHandler = (event) => {
        const keyword = event.target.value;
        this.setState(updateObject(this.state, { keyword }));
        this.props.getMyEditorAssignments(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, this.state.selectedTypeId, keyword);
    }

    categoryFilterHandler = (event) => {
        this.setState(updateObject(this.state, { selectedCategoryId: event.target.value }));
        this.props.getMyEditorAssignments(1, ITEMS_PER_PAGE, event.target.value, this.state.selectedStageId, this.state.selectedTypeId, this.state.keyword);
    }

    stageFilterHandler = (event) => {
        this.setState(updateObject(this.state, { selectedStageId: event.target.value }));
        this.props.getMyEditorAssignments(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, event.target.value, this.state.selectedTypeId, this.state.keyword);
    }

    typeFilterHandler = (event) => {
        this.setState(updateObject(this.state, { selectedTypeId: event.target.value }));
        this.props.getMyEditorAssignments(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, event.target.value, this.state.keyword);
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader title="Trang biên tập viên">
                        <li className="breadcrumb-item">Trang biên tập viên</li>
                    </ContentHeader>
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
                            <Filter
                                categories={this.props.categories.length > 0 ? this.props.categories : []}
                                stages={this.props.stages.length > 0 ? this.props.stages : []}
                                types={this.props.types.length > 0 ? this.props.types : []}
                                typeFilterHandler={this.typeFilterHandler}
                                categoryFilterHandler={this.categoryFilterHandler}
                                stageFilterHandler={this.stageFilterHandler}
                                searchInputChangeHandler={this.searchInputChangeHandler} />
                            <div className="card-body p-0">
                                {this.props.editorAssignments.length > 0 ? (
                                    <Aux>
                                        <table className="table table-hover projects" style={{ borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '1%' }}> #</th>
                                                    <th style={{ width: '35%' }}> Bài Báo</th>
                                                    <th style={{ width: '10%' }} className="text-center"> Pha</th>
                                                    <th style={{ width: '15%' }} className="text-center"> Thẩm định viên</th>
                                                    <th style={{ width: '10%' }} className="text-center"> Hạn xử lý</th>
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
                                                                <br />
                                                                {/* <div className="badge-ol badge-ol-danger badge-outlined mb-1 pt-1 pb-1 pl-2 pr-2">
                                                                    {ea.submissionId.typeId.name}
                                                                </div> */}
                                                                <small style={{ fontSize: '13px', color: 'red' }}><b className="text-dark">Thể loại:</b> {ea.submissionId.typeId.name}</small>
                                                            </td>
                                                            <td className="project-state">
                                                                <span className={"badge " + getStageBadgeClassname(ea.submissionId.stageId.value)}>{ea.submissionId.stageId.name}</span>
                                                            </td>
                                                            <td className="text-center">
                                                                {ea.submissionId.typeId.name === SUBMISSION_TYPES.PEER_REVIEW_RESEARCH.name ? (
                                                                    <Aux>
                                                                        <i className="fas fa-user"></i> {" "}
                                                                        <span>{ea.reviewerAssignmentId.length}/3</span>
                                                                    </Aux>
                                                                ) : (
                                                                        <span>Không yêu cầu</span>
                                                                    )}
                                                            </td>
                                                            <td className="text-center">
                                                                <span>{getFormattedDateOnly(ea.dueDate)}</span>
                                                                {!checkDueDate(ea.dueDate) ? (
                                                                    <div className="badge-ol badge-ol-danger mb-1">Hết hạn xử lý</div>
                                                                ) : null}
                                                            </td>
                                                            <td className="text-center">
                                                                {ea.editorSubmissionId ? (
                                                                    <span className="badge-ol badge-ol-success badge-outlined pt-2 pb-2 pl-3 pr-3"> Đã nộp ý kiến</span>
                                                                ) : (
                                                                        <span className="badge-ol badge-ol-danger badge-outlined p-2">Chưa nộp ý kiến</span>
                                                                    )}
                                                            </td>
                                                            <td className="project-actions text-center">
                                                                {!checkDueDate(ea.dueDate) ? (
                                                                    <Link to={`/dashboard/editor/assignment/${ea.submissionId._id}`} className="btn btn-outline-dark btn-flat btn-sm mr-1">
                                                                        <i className="fas fa-eye"></i> Xem
                                                                    </Link>
                                                                ) : (
                                                                        <Link to={`/dashboard/editor/assignment/${ea.submissionId._id}`} className="btn btn-outline-dark btn-flat btn-sm mr-1">
                                                                            <i className="fas fa-tasks"></i> Xử lý
                                                                        </Link>
                                                                    )}
                                                            </td>
                                                        </tr>
                                                        {/* sub tab */}
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
                                                                                {ea.submissionId.typeId.name === SUBMISSION_TYPES.PEER_REVIEW_RESEARCH.name ? (
                                                                                    <Aux>
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
                                                                                    </Aux>
                                                                                ) : (
                                                                                        <Aux>
                                                                                            <label>Thẩm định viên</label>
                                                                                            <div className="ml-4">Khong yêu cầu</div>
                                                                                        </Aux>
                                                                                    )}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 border rounded pt-2 pb-2">
                                                                            <label>Trạng thái bài báo</label>
                                                                            <div className="form-group ml-4">{ea.submissionId ? ea.submissionId.submissionLogs[ea.submissionId.submissionLogs.length - 1].event : ""}</div>
                                                                            <label>Ý kiến thẩm định viên</label>
                                                                            <div className="form-group">
                                                                                {ea.submissionId.typeId.name === SUBMISSION_TYPES.PEER_REVIEW_RESEARCH.name ? (
                                                                                    <Aux>
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
                                                                                    </Aux>
                                                                                ) : (
                                                                                        <Aux>
                                                                                            <div className="ml-4">
                                                                                                <div>Không yêu cầu</div>
                                                                                            </div>
                                                                                        </Aux>
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
                                        <div className="mt-2">
                                            <Pagination
                                                currentPage={this.props.currentPage}
                                                hasNextPage={ITEMS_PER_PAGE * this.props.currentPage < this.props.total}
                                                hasPrevPage={this.props.currentPage > 1}
                                                nextPage={this.props.currentPage + 1}
                                                prevPage={this.props.currentPage - 1}
                                                lastPage={Math.ceil(this.props.total / ITEMS_PER_PAGE)}
                                                location={this.props.location} />
                                        </div>
                                    </Aux>
                                ) : (<div className="card-text ml-4">Không tìm thấy bài báo nào.</div>)}
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
        categories: state.submission.categories,
        types: state.submission.types,
        stages: state.submission.stages,
        editorAssignments: state.review.editorAssignments,
        loading: state.review.loading,
        error: state.review.error,
        total: state.review.total_items,
        currentPage: state.review.currentPage
    }
};

const mapDispatchToProps = {
    getCategories,
    getStages,
    getSubmissionTypes,
    getMyEditorAssignments,
    getMyNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);