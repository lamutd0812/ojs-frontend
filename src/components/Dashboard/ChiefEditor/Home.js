import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSubmissions } from '../../../store/actions/submissionActions';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import Spinner from '../../UI/Spinner/Spinner';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';

let stt = 1;

class Home extends Component {

    componentDidMount() {
        this.props.getAllSubmissions();
    }

    refreshHandler = () => {
        this.props.getAllSubmissions();
    }

    render() {
        return (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader title="Chief Editor Dashboard" />
                </section>

                {/* <!-- Main content --> */}
                <section className="content">
                    {!this.props.loading ? (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Danh mục</h3>
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                {this.props.submissions.length > 0 ? (
                                    <table className="table table-striped projects">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '1%' }}> #</th>
                                                <th style={{ width: '25%' }}> Bài Báo</th>
                                                <th style={{ width: '15%' }} className="text-center"> Tác giả</th>
                                                <th style={{ width: '20%' }} className="text-center"> Pha</th>
                                                <th style={{ width: '15%' }} className="text-center"> Trạng thái</th>
                                                <th style={{ width: '25%' }} className="text-center"> Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.submissions.map(submission => (
                                                <tr key={submission._id}>
                                                    <td>{stt++}</td>
                                                    <td>
                                                        <Link to={`/dashboard/submission/${submission._id}`}>{submission.title}</Link>
                                                        <br />
                                                        <small><b>Ngày đăng:</b> {getFormattedDate(submission.createdAt)}</small>
                                                    </td>
                                                    <td className="text-center">
                                                        <Link to="#" className="text-primary">{submission.authorId.firstname} {submission.authorId.lastname}</Link>
                                                    </td>
                                                    <td className="project-state">
                                                        <span className={"badge " + getStageBadgeClassname(submission.submissionStatus.stageId.value)}>{submission.submissionStatus.stageId.name}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        {!submission.editorId ? <span><i className="fa fa-exclamation-triangle"></i> Chưa có Biên tập viên</span> :
                                                            <span>{submission.submissionStatus.status}</span>}
                                                    </td>
                                                    <td className="project-actions text-center">
                                                        <Link to={`/dashboard/submission/${submission._id}`} className="btn btn-primary btn-sm mr-1">
                                                            <i className="fas fa-eye"></i> Xem
                                                        </Link>
                                                        <Link to="#" className="btn btn-danger btn-sm">
                                                            <i className="fas fa-ban"></i> Từ chối
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (<div className="card-text ml-4">Chưa có bài báo nào được đăng tải lên hệ thống.</div>)}
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
        submissions: state.submission.submissions,
        loading: state.submission.loading
    }
};

const mapDispatchToProps = {
    getAllSubmissions
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);