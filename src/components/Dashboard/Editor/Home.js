import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import { getMyEditorAssignments } from '../../../store/actions/reviewActions';
import { Link } from 'react-router-dom';
import { getFormattedDate, getStageBadgeClassname } from '../../../utils/utility';

class Home extends Component {

    componentDidMount() {
        this.props.getMyEditorAssignments();
    }

    refreshHandler = () => {
        this.props.getMyEditorAssignments();
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
                                {this.props.editorAssignments ? (
                                    <table className="table table-striped projects" style={{ borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '1%' }}> #</th>
                                                <th style={{ width: '35%' }}> Bài Báo</th>
                                                <th style={{ width: '20%' }} className="text-center"> Pha</th>
                                                <th style={{ width: '20%' }} className="text-center"> Trạng thái</th>
                                                <th style={{ width: '10%' }} className="text-center"> Hạn xử lý</th>
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
                                                            <small><b>Ngày giao:</b> {getFormattedDate(ea.createdAt)}</small>
                                                        </td>
                                                        <td className="project-state">
                                                            <span className={"badge " + getStageBadgeClassname(ea.submissionId.submissionStatus.stageId.value)}>{ea.submissionId.submissionStatus.stageId.name}</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <span>{ea.submissionId.submissionStatus.status}</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <span>{getFormattedDate(ea.dueDate)}</span>
                                                        </td>
                                                        <td className="project-actions text-center">
                                                            <Link to={`/dashboard/submission/${ea.submissionId._id}`} className="btn btn-primary btn-sm mr-1">
                                                                <i className="fas fa-eye"></i> Xem
                                                        </Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="6" className="hiddenRow">
                                                            <div id={`aaa${ea._id}`} className="accordian-body collapse">Xem chi tiết phân công</div>
                                                        </td>
                                                    </tr>
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
        editorAssignments: state.review.editorAssignments,
        loading: state.review.loading,
        error: state.review.error
    }
};

const mapDispatchToProps = {
    getMyEditorAssignments
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);