import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import DeleteSubmission from '../Author/DeleteSubmission';
import Spinner from '../../UI/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSubmissionsByAuthor, deleteSubmission, resetDeleteSubmissionState } from '../../../store/actions/submissionActions';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';
import { updateObject } from '../../../utils/utility';
import { STAGE } from '../../../utils/constant';

class Home extends Component {

    state = {
        submissionId: '',
        deletionConfirmed: false,
        checked: false
    }

    componentDidMount() {
        this.props.getSubmissionsByAuthor(this.props.userId);
    }

    // componentDidUpdate() {
    //     if (this.props.submissions.length < 1) {
    //         this.props.getSubmissionsByAuthor(this.props.userId);
    //     }
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isSubmissionDeleted) {
            this.props.resetDeleteSubmissionState();
            toast.success("Xóa bài báo khỏi hệ thống thành công!");
            this.refreshHandler();
        }
    }

    refreshHandler = () => {
        this.props.getSubmissionsByAuthor(this.props.userId);
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
        let stt = 1;

        return (
            <div className="content-wrapper">
                {/* <!-- Content Header (Page header) --> */}
                <section className="content-header">
                    <ContentHeader title="Author Dashboard" />
                    <button onClick={this.btnNewSubmissonClickHandler} className="btn btn-primary">Submit bài báo </button>
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
                                                <th style={{ width: '30%' }}> Bài Báo</th>
                                                <th style={{ width: '20%' }} className="text-center"> Pha</th>
                                                <th style={{ width: '20%' }} className="text-center"> Trạng thái</th>
                                                <th style={{ width: '30%' }} className="text-center"> Action</th>
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

                                                        {submission.submissionStatus.stageId.value === STAGE.SUBMISSION.value ? (
                                                            <Aux>
                                                                <Link to={`/dashboard/edit-submission/${submission._id}`} className="btn btn-info btn-sm mr-1">
                                                                    <i className="fas fa-pencil-alt"></i> Sửa
                                                                </Link>
                                                                <button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteSubmissionModal"
                                                                    onClick={() => this.selectSubmissionHandler(submission._id)}>
                                                                    <i className="fas fa-trash"></i> Xóa
                                                                </button>
                                                            </Aux>
                                                        ) : (
                                                                <Aux>
                                                                    <button className="btn btn-info btn-sm mr-1 disabled">
                                                                        <i className="fas fa-pencil-alt"></i> Sửa
                                                                    </button>
                                                                    <button className="btn btn-danger btn-sm disabled">
                                                                        <i className="fas fa-trash"></i> Xóa
                                                                    </button>
                                                                </Aux>
                                                            )}
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
                <DeleteSubmission
                    checked={this.state.checked}
                    uncheckedHandler={this.uncheckedHandler}
                    confirmDelete={this.confirmDeleteHandler}
                    deletionConfirmed={this.state.deletionConfirmed}
                    deleteSubmission={(event) => this.deleteSubmissionHandler(event, this.state.submissionId)} />
                <ToastContainer autoClose={2000} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        submissions: state.submission.submissions,
        loading: state.submission.loading,
        isSubmissionDeleted: state.submission.isSubmissionDeleted
    }
};

const mapDispatchToProps = {
    getSubmissionsByAuthor,
    deleteSubmission,
    resetDeleteSubmissionState
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);