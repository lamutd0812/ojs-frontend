import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import DeleteSubmission from '../Author/DeleteSubmission';
import Spinner from '../../UI/Spinner/Spinner';
import { toast } from 'react-toastify';
import {
    getSubmissionsByAuthor,
    deleteSubmission,
    resetDeleteSubmissionState
} from '../../../store/actions/submissionActions';
import {
    getMyNotifications
} from '../../../store/actions/authActions';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import { updateObject } from '../../../utils/utility';
import Pagination from '../../UI/Pagination/Pagination';

const ITEMS_PER_PAGE = 8;
class Home extends Component {

    state = {
        submissionId: '',
        deletionConfirmed: false,
        checked: false
    }

    init = () => {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const page = query.get('page');
            if (page) {
                this.props.getSubmissionsByAuthor(this.props.userId, page, ITEMS_PER_PAGE);
            }
        } else {
            this.props.getSubmissionsByAuthor(this.props.userId, 1, ITEMS_PER_PAGE);
        }
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const prevQuery = new URLSearchParams(prevProps.location.search);
            const query = new URLSearchParams(this.props.location.search);
            const prevPage = prevQuery.get('page');
            const page = query.get('page');
            if (page !== prevPage) {
                this.props.getSubmissionsByAuthor(this.props.userId, page, ITEMS_PER_PAGE);
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isSubmissionDeleted) {
            this.props.resetDeleteSubmissionState();
            toast.success("Xóa bài báo khỏi hệ thống thành công!");
            this.refreshHandler();
        }
    }

    refreshHandler = () => {
        this.init();
        this.props.getMyNotifications();
    }

    selectSubmissionHandler = (submissionId) => {
        this.setState(updateObject(this.state, { submissionId: submissionId }));
    }

    btnNewSubmissonClickHandler = () => {
        this.props.history.push("/dashboard/new-submission");
    }

    uncheckedHandler = () => {
        this.setState(updateObject(this.state, { deletionConfirmed: false, checked: false }));
    }

    confirmDeleteHandler = (event) => {
        if (event.target.checked) {
            this.setState(updateObject(this.state, { deletionConfirmed: true, checked: true }));
        } else {
            this.setState(updateObject(this.state, { deletionConfirmed: false, checked: false }));
        }
    }

    deleteSubmissionHandler = (event, submissionId) => {
        event.preventDefault();
        this.props.deleteSubmission(submissionId);
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader title="Trang tác giả">
                        <li className="breadcrumb-item">Trang tác giả</li>
                    </ContentHeader>
                    <button onClick={this.btnNewSubmissonClickHandler} className="btn btn-outline-dark btn-flat">
                        <i className="fas fa-upload"></i> Đăng tải bài báo
                    </button>
                </section>

                {/* <!-- Main content --> */}
                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Bài báo của tôi</h3>
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                {this.props.submissions.length > 0 ? (
                                    <Aux>
                                        <table className="table table-hover projects">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '1%' }}> #</th>
                                                    <th style={{ width: '29%' }}> Bài Báo</th>
                                                    <th style={{ width: '15%' }}> Thể loại</th>
                                                    <th style={{ width: '20%' }} className="text-center"> Pha</th>
                                                    <th style={{ width: '15%' }} className="text-center"> Trạng thái</th>
                                                    <th style={{ width: '20%' }} className="text-center"> Chi tiết</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.submissions.map(submission => (
                                                    <Aux key={submission._id}>
                                                        <tr data-toggle="collapse" data-target={`#aaa${submission._id}`} className="accordion-toggle" aria-expanded="true" aria-controls="collapseOne">
                                                            <td style={{ cursor: 'pointer' }}><i className="fas fa-caret-down"></i></td>
                                                            <td>
                                                                <Link to="#">{submission.title}</Link>
                                                                <br />
                                                                <small style={{ fontSize: '12px' }}><b>Ngày đăng:</b> {getFormattedDate(submission.createdAt)}</small>
                                                            </td>
                                                            <td className="text-danger">
                                                                {submission.typeId.name}
                                                            </td>
                                                            <td className="project-state text-center">
                                                                <span className={"badge " + getStageBadgeClassname(submission.stageId.value)}>{submission.stageId.name}</span>
                                                            </td>
                                                            <td className="text-center">
                                                                <span>{submission.submissionLogs[submission.submissionLogs.length - 1].event}</span>
                                                            </td>
                                                            <td className="project-actions text-center">
                                                                <Link to={`/dashboard/submission/${submission._id}`} className="btn btn-outline-dark btn-sm mr-1 btn-flat">
                                                                    <i className="fas fa-eye"></i> Xem chi tiết
                                                            </Link>
                                                            </td>
                                                        </tr>
                                                        <tr><td colSpan="6" className="hiddenRow">
                                                            <div id={`aaa${submission._id}`} className="accordian-body collapse">
                                                                <div className="col-lg-12">
                                                                    <div className="row pl-5">
                                                                        <div className="col-lg-4 pt-2">

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
                                ) : (<div className="card-text ml-4">Bạn chưa có bài báo nào được đăng tải lên hệ thống. Click vào<Link className="shop-now" to="/dashboard/new-submission"> đây</Link> để tiến hành đăng bài.</div>)}
                            </div>
                        </div>
                    ) : <Spinner />}
                </section>
                <DeleteSubmission
                    checked={this.state.checked}
                    uncheckedHandler={this.uncheckedHandler}
                    confirmDelete={this.confirmDeleteHandler}
                    deletionConfirmed={this.state.deletionConfirmed}
                    deleteSubmission={(event) => this.deleteSubmissionHandler(event, this.state.submissionId)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        submissions: state.submission.submissions,
        loading: state.submission.loading,
        isSubmissionDeleted: state.submission.isSubmissionDeleted,
        total: state.submission.total_items,
        currentPage: state.submission.currentPage
    }
};

const mapDispatchToProps = {
    getSubmissionsByAuthor,
    deleteSubmission,
    resetDeleteSubmissionState,
    getMyNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);