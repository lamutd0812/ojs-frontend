import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubmissionsByAuthor } from '../../../store/actions/submissionActions';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';

class Home extends Component {

    componentDidMount() {
        this.props.getSubmissionsByAuthor(this.props.userId);
    }

    // componentDidUpdate() {
    //     if (this.props.submissions.length < 1) {
    //         this.props.getSubmissionsByAuthor(this.props.userId);
    //     }
    // }

    btnNewSubmissonClickHandler = () => {
        this.props.history.push("/dashboard/new-submission");
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader />
                    <button onClick={this.btnNewSubmissonClickHandler} className="btn btn-primary">Submit bài báo </button>
                </section>

                {/* <!-- Main content --> */}
                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Danh mục</h3>
                            </div>
                            <div className="card-body p-0">
                                {this.props.submissions.length > 0 ? (
                                    <table className="table table-striped projects">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '1%' }}> #</th>
                                                <th style={{ width: '30%' }}> Bài Báo</th>
                                                <th style={{ width: '20%' }} className="text-center"> Pha</th>
                                                <th style={{ width: '20%' }} className="text-center"> Trạng thái</th>
                                                <th style={{ width: '30%' }} className="text-center"> Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.submissions.map(submission => (
                                                <tr key={submission._id}>
                                                    <td>#</td>
                                                    <td>
                                                        <Link to={`/dashboard/submission/${submission._id}`}>{submission.title}</Link>
                                                        <br />
                                                        <small><b>Ngày đăng:</b> {getFormattedDate(submission.createdAt)}</small>
                                                    </td>
                                                    <td className="project-state">
                                                        <span className={"badge " + getStageBadgeClassname(submission.submissionStatus.stageId.value)}>{submission.submissionStatus.stageId.name}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span>{submission.submissionStatus.status}</span>
                                                    </td>
                                                    <td className="project-actions text-right">
                                                        <Link to={`/dashboard/submission/${submission._id}`} className="btn btn-primary btn-sm mr-1">
                                                            <i className="fas fa-eye"></i> Xem
                                                    </Link>
                                                        <Link to="#" className="btn btn-info btn-sm mr-1">
                                                            <i className="fas fa-pencil-alt"></i> Sửa
                                                    </Link>
                                                        <Link to="#" className="btn btn-danger btn-sm">
                                                            <i className="fas fa-trash"></i> Xóa
                                                    </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (<div className="card-text ml-4">Bạn chưa có bài báo nào được đăng tải lên hệ thống. Click vào<Link className="shop-now" to="/dashboard/new-submission"> đây</Link> để tiến hành đăng bài.</div>)}
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
        userId: state.auth.userId,
        submissions: state.submission.submissions,
        loading: state.submission.loading
    }
};

const mapDispatchToProps = {
    getSubmissionsByAuthor
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);