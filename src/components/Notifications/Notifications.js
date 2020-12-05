import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ContentHeader from '../Dashboard/Shared/ContentHeader';
import Spinner from '../UI/Spinner/Spinner';
import { getAllMyNotifications } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '../../utils/utility';
import Pagination from '../UI/Pagination/Pagination';
import { ITEMS_PER_PAGE } from '../../utils/constant';

class Notifications extends Component {

    componentDidMount() {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const page = query.get('page');
            if (page) {
                this.props.getAllMyNotifications(page);
            }
        } else {
            this.props.getAllMyNotifications(1);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            const prevQuery = new URLSearchParams(prevProps.location.search);
            const query = new URLSearchParams(this.props.location.search);
            const prevPage = prevQuery.get('page');
            const page = query.get('page');
            if (page !== prevPage) {
                this.props.getAllMyNotifications(page);
            }
        }
    }

    refreshHandler = () => {
        const query = new URLSearchParams(this.props.location.search);
        const page = query.get('page') || 1;
        this.props.getAllMyNotifications(page);
    }

    render() {
        const contentWrapper = (
            <div className="content-wrapper">
                <section className="content-header">
                    <ContentHeader title="Thông báo của bạn">
                        <li className="breadcrumb-item active">Thông báo</li>
                    </ContentHeader>
                </section>

                <section className="content">
                    {!this.props.loading ? (
                        <div className="card card-primary card-outline">
                            <div className="card-header">
                                <h3 className="card-title">Tất cả thông báo</h3>
                                <div className="float-right mr-1">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>

                            {this.props.notifications ? (
                                <div className="card-body">
                                    {this.props.notifications.map(noti => (
                                        <Aux key={noti._id}>
                                            <Link to={noti.link}>
                                                <div className="media">
                                                    <img src={noti.senderAvatar} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                                    <div className="media-body">
                                                        <h3 className="dropdown-item-title">
                                                            {noti.title}
                                                            <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                                        </h3>
                                                        <p className="text-sm">{noti.content}</p>
                                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i>{getFormattedDate(noti.createdAt)}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                        </Aux>
                                    ))}
                                </div>
                            ) : (
                                    <div className="card-text p-4">Bạn chưa có thông báo nào.</div>
                                )}
                        </div>
                    ) : <Spinner />}

                    <Pagination
                        currentPage={this.props.currentPage}
                        hasNextPage={ITEMS_PER_PAGE * this.props.currentPage < this.props.total}
                        hasPrevPage={this.props.currentPage > 1}
                        nextPage={this.props.currentPage + 1}
                        prevPage={this.props.currentPage - 1}
                        lastPage={Math.ceil(this.props.total / ITEMS_PER_PAGE)}
                        location={this.props.location} />
                </section>
            </div >
        );

        return (
            <Aux>
                {contentWrapper}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        notifications: state.auth.all_notifications,
        total: state.auth.total_items,
        currentPage: state.auth.currentPage
    }
};

const mapDispatchToProps = {
    getAllMyNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
