import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../components/Footer/Footer';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import RouteBreadcrumb from '../../../components/Breadcrumb/RouteBreadcrumb';
import Author from './Author';
// import RelatedPost from './RelatedPost';
import Comments from './Comments';
import Reply from './Reply';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { getSingleArticle, getRelatedArticles, getMostViewedArticlesHome, updateDownloadedCount } 
from '../../../store/actions/articleActions';
import { getCategories } from '../../../store/actions/submissionActions';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { getFormattedDateOnly } from '../../../utils/utility';
import { Link } from 'react-router-dom';

class Article extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.match.params.id) {
            this.props.getSingleArticle(this.props.match.params.id);
            if (this.props.related_articles.length <= 0) {
                this.props.getRelatedArticles(this.props.match.params.id, 1, 5);
            }
        }
        if (this.props.categories.length <= 0) {
            this.props.getCategories();
        }
        if (this.props.most_viewed_articles.length <= 0) {
            this.props.getMostViewedArticlesHome(1, 4);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.getSingleArticle(this.props.match.params.id);
            this.props.getRelatedArticles(this.props.match.params.id, 1, 5);
        }
    }

    updateDownloadedTimes = () => {
        if (this.props.match.params.id) {
            this.props.updateDownloadedCount(this.props.match.params.id);
        }
    }

    render() {
        return (
            <Aux>
                <Navigation history={this.props.history} />
                <Breadcrumb
                    title="Chi tiết bài báo"
                    imageUrl={`url(${require("../../../resources/imgs/40.jpg")})`} />
                <RouteBreadcrumb>
                    <li className="breadcrumb-item active" aria-current="page"><Link to="/articles">Bái báo</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Chi tiết bài báo</li>
                </RouteBreadcrumb>

                <section className="post-details-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col col-9">
                                <div className="post-details-content bg-white mb-30 p-30 box-shadow">
                                    {!this.props.loading && this.props.article ? (
                                        <div className="blog-content">
                                            <div className="post-meta">
                                                <p>{getFormattedDateOnly(this.props.article.publishedDate)}</p>
                                                <p>{this.props.article.categoryId.name}</p>
                                            </div>
                                            <h4 className="post-title">{this.props.article.submissionId.title}</h4>
                                            <div className="post-meta-2">
                                                <Link to="#" className="text-secondary" style={{ fontWeight: '400' }}>
                                                    <i className="fas fa-user"></i>{" "}
                                                    {this.props.article.submissionId.authorId.lastname} {this.props.article.submissionId.authorId.firstname}
                                                </Link>
                                                <Link to="#" className="text-secondary ml-2" style={{ fontWeight: '400' }}>
                                                    <i className="fas fa-eye" aria-hidden="true"></i> {this.props.article.views}
                                                </Link>
                                                <Link to="#" className="text-secondary ml-2" style={{ fontWeight: '400' }}>
                                                    <i className="fas fa-download" aria-hidden="true"></i> {this.props.article.downloaded}
                                                </Link>
                                            </div>
                                            <div className="border border-dark">
                                                <embed
                                                    src={this.props.article.submissionId.attachmentUrl}
                                                    type="application/pdf"
                                                    frameBorder="0"
                                                    scrolling="auto"
                                                    height="800px"
                                                    width="100%"
                                                />
                                            </div>
                                            <Author author={this.props.article.submissionId.authorId} />
                                        </div>
                                    ) : <Spinner />}
                                </div>
                                {/* <RelatedPost /> */}
                                <div className="comment_area clearfix bg-white mb-30 p-30 box-shadow">
                                    <Comments />
                                </div>
                                <div className="post-a-comment-area bg-white mb-30 p-30 box-shadow clearfix">
                                    <Reply />
                                </div>
                            </div>

                            <div className="col col-3">
                                {this.props.article && (
                                    <Sidebar
                                        articleUrl={this.props.article.submissionId.attachmentUrl}
                                        related_articles={this.props.related_articles}
                                        most_viewed_articles={this.props.most_viewed_articles}
                                        categories={this.props.categories}
                                        updateDownloadedTimes={this.updateDownloadedTimes} />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        article: state.article.article,
        related_articles: state.article.related_articles,
        most_viewed_articles: state.article.most_viewed_articles,
        loading: state.article.loading,
        error: state.article.error,
        categories: state.submission.categories
    };
};

const mapDispatchToProps = {
    getSingleArticle,
    getRelatedArticles,
    getMostViewedArticlesHome,
    getCategories,
    updateDownloadedCount
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);