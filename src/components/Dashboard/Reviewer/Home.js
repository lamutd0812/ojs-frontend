import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import { getMyNotifications } from '../../../store/actions/authActions';
import { getCategories, getStages, getSubmissionTypes } from '../../../store/actions/submissionActions';
import { getMyReviewerAssignments } from '../../../store/actions/reviewActions';
import { Link } from 'react-router-dom';
import { checkDueDate, getFormattedDate, getFormattedDateOnly, getStageBadgeClassname, updateObject } from '../../../utils/utility';
import Pagination from '../../UI/Pagination/Pagination';
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
                this.props.getMyReviewerAssignments(page, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, this.state.selectedTypeId);
            }
        } else {
            this.props.getMyReviewerAssignments(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, this.state.selectedTypeId);
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
                this.props.getMyReviewerAssignments(page, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, this.state.selectedTypeId);
            }
        }
    }

    refreshHandler = () => {
        this.init();
        this.props.getMyNotifications();
    }

    searchInputChangeHandler = (event) => {
        const keyword = event.target.value;
        this.setState(updateObject(this.state, { keyword }));
        this.props.getMyReviewerAssignments(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, this.state.selectedTypeId, keyword);
    }

    categoryFilterHandler = (event) => {
        this.setState(updateObject(this.state, { selectedCategoryId: event.target.value }));
        this.props.getMyReviewerAssignments(1, ITEMS_PER_PAGE, event.target.value, this.state.selectedStageId, this.state.selectedTypeId, this.state.keyword);
    }

    stageFilterHandler = (event) => {
        this.setState(updateObject(this.state, { selectedStageId: event.target.value }));
        this.props.getMyReviewerAssignments(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, event.target.value, this.state.selectedTypeId, this.state.keyword);
    }

    typeFilterHandler = (event) => {
        this.setState(updateObject(this.state, { selectedTypeId: event.target.value }));
        this.props.getMyReviewerAssignments(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, this.state.selectedStageId, event.target.value, this.state.keyword);
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader title="Trang thẩm định viên">
                        <li className="breadcrumb-item">Trang thẩm định viên</li>
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
                                {this.props.reviewerAssignments.length > 0 ? (
                                    <Aux>
                                        <table className="table table-hover projects" style={{ borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '1%' }}> #</th>
                                                    <th style={{ width: '35%' }}> Bài Báo</th>
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
                                                                <br />
                                                                <small style={{ fontSize: '13px', color: 'red' }}><b className="text-dark">Thể loại:</b> {ra.submissionId.typeId.name}</small>
                                                            </td>
                                                            <td className="project-state">
                                                                <span className={"badge " + getStageBadgeClassname(ra.submissionId.stageId.value)}>{ra.submissionId.stageId.name}</span>
                                                            </td>
                                                            <td className="text-center">
                                                                <span>{getFormattedDateOnly(ra.dueDate)}</span>
                                                                {!checkDueDate(ra.dueDate) ? (
                                                                    <div className="badge-ol badge-ol-danger mb-1">Hết hạn xử lý</div>
                                                                ) : null}
                                                            </td>
                                                            <td className="text-center">
                                                                {ra.reviewerSubmissionId ? (
                                                                    <span className="badge-ol badge-ol-success badge-outlined pt-2 pb-2 pl-3 pr-3"> Đã nộp ý kiến</span>
                                                                ) : (
                                                                        <span className="badge-ol badge-ol-danger badge-outlined p-2">Chưa nộp ý kiến</span>
                                                                    )}
                                                            </td>
                                                            <td className="project-actions text-center">
                                                                {ra.reviewerSubmissionId ? (
                                                                    <Link to={`/dashboard/reviewer/assignment/${ra.submissionId._id}`} className="btn btn-outline-dark btn-sm mr-1 btn-flat">
                                                                        <i className="fas fa-eye"></i> Xem
                                                                    </Link>
                                                                ) : (
                                                                        <Aux>
                                                                            {!checkDueDate(ra.dueDate) ? (
                                                                                <Link to={`/dashboard/reviewer/assignment/${ra.submissionId._id}`} className="btn btn-outline-dark btn-flat btn-sm mr-1">
                                                                                    <i className="fas fa-eye"></i> Xem
                                                                                </Link>
                                                                            ) : (
                                                                                    <Link to={`/dashboard/reviewer/assignment/${ra.submissionId._id}`} className="btn btn-outline-dark btn-flat btn-sm mr-1">
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
        categories: state.submission.categories,
        types: state.submission.types,
        stages: state.submission.stages,
        reviewerAssignments: state.review.reviewerAssignments,
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
    getMyReviewerAssignments,
    getMyNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);