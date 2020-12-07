import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSubmissions } from '../../../store/actions/submissionActions';
import { getMyNotifications } from '../../../store/actions/authActions';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import { STAGE } from '../../../utils/constant';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Pagination from '../../UI/Pagination/Pagination';

const ITEMS_PER_PAGE = 4;
class Home extends Component {

    componentDidMount() {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const page = query.get('page');
            if (page) {
                this.props.getAllSubmissions(page);
            }
        } else {
            this.props.getAllSubmissions(1);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const prevQuery = new URLSearchParams(prevProps.location.search);
            const query = new URLSearchParams(this.props.location.search);
            const prevPage = prevQuery.get('page');
            const page = query.get('page');
            if (page !== prevPage) {
                this.props.getAllSubmissions(page);
            }
        }
    }

    refreshHandler = () => {
        this.props.getAllSubmissions(1);
        this.props.getMyNotifications();
    }

    render() {

        const contentWrapper = (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader title="Trang tổng biên tập" />
                </section>

                {/* <!-- Main content --> */}
                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Quản lý bài báo trên hệ thống</h3>
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                {this.props.submissions.length > 0 ? (
                                    <Aux>
                                        <table className="table table-striped projects">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '1%' }}> #</th>
                                                    <th style={{ width: '25%' }}> Bài Báo</th>
                                                    <th style={{ width: '15%' }} className="text-center"> Tác giả</th>
                                                    <th style={{ width: '15%' }} className="text-center"> Pha</th>
                                                    <th style={{ width: '15%' }} className="text-center"> Trạng thái</th>
                                                    <th style={{ width: '20%' }} className="text-center"> Action</th>
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
                                                                <small><b>Ngày đăng:</b> {getFormattedDate(submission.createdAt)}</small>
                                                            </td>
                                                            <td className="text-center">
                                                                <Link to="#" className="text-primary">{submission.authorId.lastname} {submission.authorId.firstname}</Link>
                                                            </td>
                                                            <td className="project-state">
                                                                <span className={"badge " + getStageBadgeClassname(submission.stageId.value)}>{submission.stageId.name}</span>
                                                            </td>
                                                            <td className="text-center">
                                                                {JSON.stringify(submission.stageId) === JSON.stringify(STAGE.SUBMISSION) ? (
                                                                    <span><i className="fa fa-exclamation-triangle"></i> Chưa có Biên tập viên</span>
                                                                ) : (
                                                                        <span>{submission.submissionLogs[submission.submissionLogs.length - 1].event}</span>
                                                                    )}
                                                            </td>
                                                            <td className="project-actions text-center">
                                                                <Link to={`/dashboard/submission/${submission._id}`} className="btn btn-outline-primary btn-sm mr-1">
                                                                    <i className="fas fa-eye"></i> Xử lý
                                                        </Link>
                                                            </td>
                                                        </tr>
                                                        {/* sub tab */}
                                                        <tr><td colSpan="8" className="hiddenRow">
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
                                ) : (<div className="card-text ml-4">Chưa có bài báo nào được đăng tải lên hệ thống.</div>)}
                            </div>
                        </div>
                    ) : <Spinner />}
                </section>
            </div>
        );

        return (
            <Aux>
                { contentWrapper}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submissions: state.submission.submissions,
        loading: state.submission.loading,
        total: state.submission.total_items,
        currentPage: state.submission.currentPage
    }
};

const mapDispatchToProps = {
    getAllSubmissions,
    getMyNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);