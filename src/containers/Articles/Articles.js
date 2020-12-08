import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import RouteBreadcrumb from '../../components/Breadcrumb/RouteBreadcrumb';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { getAllArticles } from '../../store/actions/articleActions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getFormattedDateOnly, getShortArticleAbstract } from '../../utils/utility';
import { Link } from 'react-router-dom';

class Articles extends Component {

    componentDidMount() {
        this.props.getAllArticles(1);
    }

    render() {
        const articles = (
            <Aux>
                <Navigation />
                <Breadcrumb
                    title="Articles"
                    imageUrl={`url(${require("../../resources/imgs/40.jpg")})`} />
                <RouteBreadcrumb />

                <section className="post-details-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            {/* Col */}
                            <div className="col col-9">
                                <div className="archive-posts-area bg-white p-30 mb-30 box-shadow">
                                    {!this.props.loading && this.props.articles.length > 0 ? (
                                        <Aux>
                                            {this.props.articles.map(article => (
                                                <div className="single-catagory-post d-flex flex-wrap" key={article._id}>
                                                    <div className="post-content">
                                                        <div className="post-meta">
                                                            <p>{getFormattedDateOnly(article.publishedDate)}</p>
                                                            <p>{article.submissionId.categoryId.name}</p>
                                                        </div>
                                                        <Link to={`/single-article/${article._id}`} className="post-title">
                                                            {article.submissionId.title}
                                                        </Link>
                                                        <div className="post-meta-2">
                                                            <a href="a"><i className="fa fa-eye" aria-hidden="true"></i> 1034</a>
                                                            <a href="a"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> 834</a>
                                                            <a href="a"><i className="fa fa-comments-o" aria-hidden="true"></i> 234</a>
                                                        </div>
                                                        <p>{getShortArticleAbstract(article.submissionId.abstract)}</p>
                                                        <Link to={`/single-article/${article._id}`} className="text-dark"><u>Xem chi tiết</u></Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </Aux>
                                    ) : (
                                        <Spinner />
                                    )}
                                </div>
                            </div>
                            {/* Col */}
                            <div className="col col-3">
                                <Sidebar />
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
        loading: state.article.loading,
        error: state.article.error
    };
};

const mapDispatchToProps = {
    getAllArticles
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);