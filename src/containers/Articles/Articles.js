import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import RouteBreadcrumb from '../../components/Breadcrumb/RouteBreadcrumb';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { getAllArticles } from '../../store/actions/articleActions';
import { getCategories, getStages, getSubmissionTypes } from '../../store/actions/submissionActions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getFormattedDateOnly, getShortArticleAbstract, updateObject } from '../../utils/utility';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import Filter from './Filter/Filter';

const ITEMS_PER_PAGE = 6;
class Articles extends Component {

    state = {
        selectedCategoryId: '',
        selectedTypeId: ''
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getStages();
        this.props.getSubmissionTypes();
        if (this.props.location.search) {
            const query = new URLSearchParams(this.props.location.search);
            const page = query.get('page');
            if (page) {
                this.props.getAllArticles(page, ITEMS_PER_PAGE);
            }
        } else {
            this.props.getAllArticles(1, ITEMS_PER_PAGE);
        }
    }

    componentDidUpdate(prevProps) {
        window.scrollTo(0, 0);
        if (this.props.location.search !== prevProps.location.search) {
            const prevQuery = new URLSearchParams(prevProps.location.search);
            const query = new URLSearchParams(this.props.location.search);
            const prevPage = prevQuery.get('page');
            const page = query.get('page');
            if (page !== prevPage) {
                this.props.getAllArticles(page, ITEMS_PER_PAGE);
            }
        }
    }

    categoryFilterHandler = (event) => {
        this.setState(updateObject(this.state, { selectedCategoryId: event.target.value }));
        this.props.getAllArticles(1, ITEMS_PER_PAGE, event.target.value, this.state.selectedTypeId);
    }

    typeFilterHandler = (event) => {
        this.setState(updateObject(this.state, { selectedTypeId: event.target.value }));
        this.props.getAllArticles(1, ITEMS_PER_PAGE, this.state.selectedCategoryId, event.target.value);
    }

    render() {
        const articles = (
            <Aux>
                <Navigation history={this.props.history} />
                <Breadcrumb
                    title="Tất cả bài báo"
                    imageUrl={`url(${require("../../resources/imgs/40.jpg")})`} />
                <RouteBreadcrumb>
                    <li className="breadcrumb-item active" aria-current="page">Bài báo</li>
                </RouteBreadcrumb>

                <section className="post-details-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            {/* Col */}
                            <div className="col col-9">
                                <div className="archive-posts-area bg-white p-30 mb-30 box-shadow">
                                    {!this.props.loading ? (
                                        <Aux>
                                            <Filter
                                                categories={this.props.categories.length > 0 ? this.props.categories : []}
                                                stages={this.props.stages.length > 0 ? this.props.stages : []}
                                                types={this.props.types.length > 0 ? this.props.types : []}
                                                categoryFilterHandler={this.categoryFilterHandler}
                                                typeFilterHandler={this.typeFilterHandler} />
                                            {this.props.articles.length > 0 ? (
                                                <Aux>
                                                    {this.props.articles.map(article => (
                                                        <div className="single-catagory-post d-flex flex-wrap" key={article._id}>
                                                            <div className="post-content">
                                                                <div className="post-meta">
                                                                    <p>{article.submissionId.typeId.name}</p>
                                                                    <p>{article.submissionId.categoryId.name}</p>
                                                                </div>
                                                                <Link to={`/single-article/${article._id}`} className="post-title">
                                                                    {article.submissionId.title}
                                                                </Link>
                                                                <div className="post-meta-2">
                                                                    <Link to="#" className="text-dark">
                                                                        <i className="fas fa-user"></i>{" "}
                                                                        {article.submissionId.authorId.lastname} {article.submissionId.authorId.firstname}
                                                                    </Link>
                                                                    <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                                                        <i className="fas fa-clock" aria-hidden="true"></i> {getFormattedDateOnly(article.publishedDate)}
                                                                    </Link>
                                                                    <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                                                        <i className="fas fa-eye" aria-hidden="true"></i> {article.views}
                                                                    </Link>
                                                                    <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                                                        <i className="fas fa-download" aria-hidden="true"></i> {article.downloaded}
                                                                    </Link>
                                                                </div>
                                                                <p>{getShortArticleAbstract(article.submissionId.abstract)}</p>
                                                                <div className="badge-ol badge-ol-dark badge-outlined mt-2">{article.submissionId.typeId.name}</div>
                                                                <div className="badge-ol badge-ol-dark badge-outlined ml-1 mt-2">{article.submissionId.categoryId.name}</div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <Pagination
                                                        currentPage={this.props.currentPage}
                                                        hasNextPage={ITEMS_PER_PAGE * this.props.currentPage < this.props.total}
                                                        hasPrevPage={this.props.currentPage > 1}
                                                        nextPage={this.props.currentPage + 1}
                                                        prevPage={this.props.currentPage - 1}
                                                        lastPage={Math.ceil(this.props.total / ITEMS_PER_PAGE)}
                                                        location={this.props.location} />
                                                </Aux>
                                            ) : <div>Không tìm thấy bài báo nào</div>}
                                        </Aux>
                                    ) : (
                                            <Spinner />
                                        )}
                                </div>
                            </div>
                            {/* Col */}
                            <div className="col col-3">
                                {this.props.articles.length > 0 && this.props.categories.length > 0 && (
                                    <Sidebar
                                        articles={this.props.articles}
                                        categories={this.props.categories} />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </Aux>
        );

        return (
            <Aux>
                { articles}
            </Aux>
        );
    }
};


const mapStateToProps = state => {
    return {
        articles: state.article.articles,
        total: state.article.total_items,
        currentPage: state.article.currentPage,
        loading: state.article.loading,
        error: state.article.error,
        categories: state.submission.categories,
        stages: state.submission.stages,
        types: state.submission.types
    };
};

const mapDispatchToProps = {
    getAllArticles,
    getCategories,
    getStages,
    getSubmissionTypes
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);