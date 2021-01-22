import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Dashboard/Shared/ContentHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import {
    getMyNotifications
} from '../../../store/actions/authActions';
import { getMyArticles } from '../../../store/actions/articleActions';
import { getFormattedDate, getShortArticleAbstract } from '../../../utils/utility';
import Pagination from '../../UI/Pagination/Pagination';

const ITEMS_PER_PAGE = 8;
class Main extends Component {

    state = {
        submissionId: '',
        checked: false
    }

    init = () => {
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const page = query.get('page');
            if (page) {
                this.props.getMyArticles(page, ITEMS_PER_PAGE);
            }
        } else {
            this.props.getMyArticles(1, ITEMS_PER_PAGE);
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
                this.props.getMyArticles(page, ITEMS_PER_PAGE);
            }
        }
    }

    refreshHandler = () => {
        this.init();
        this.props.getMyNotifications();
    }

    btnNewSubmissonClickHandler = () => {
        this.props.history.push("/dashboard/new-submission");
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
                                <h3 className="card-title">Danh mục bài báo đã được xuất bản trên hệ thống</h3>
                                <div className="float-right mr-5">
                                    <button className="btn btn-tool" onClick={this.refreshHandler}>
                                        <i className="fas fa-sync-alt" style={{ fontSize: '20px' }}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                {this.props.articles.length > 0 ? (
                                    <Aux>
                                        {this.props.articles.map(article => (
                                            <div className="post" key={article._id}>
                                                <div className="user-block">
                                                    <img className="img-circle img-bordered-sm" src={this.props.avatar} alt="avatar" />
                                                    <span className="username">
                                                        <Link to="#">{this.props.fullname}</Link>
                                                    </span>
                                                    <span className="description" style={{ fontSize: '14px' }}>Ngày xuất bản: {getFormattedDate(article.publishedDate)}</span>
                                                </div>
                                                <p className="text-dark font-weight-bold" style={{ fontSize: '16px' }}>{article.title}</p>
                                                <p>{getShortArticleAbstract(article.submission.abstract)}</p>
                                                <div className="badge-ol badge-ol-dark badge-outlined mt-1">{article.type.name}</div>
                                                <div className="badge-ol badge-ol-dark badge-outlined ml-1 mt-1">{article.category.name}</div>

                                                <div className="pt-3">
                                                    <Link to={`/dashboard/submission/${article.submission._id}`} className="text-primary mt-3"><u>Xem chi tiết</u></Link>
                                                </div>
                                            </div>
                                        ))}
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        fullname: state.auth.fullname,
        avatar: state.auth.avatar,
        loading: state.article.loading,
        articles: state.article.my_articles,
        total: state.article.my_articles_total,
        currentPage: state.article.my_articles_cur_page,
    }
};

const mapDispatchToProps = {
    getMyNotifications,
    getMyArticles
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);