import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../components/Footer/Footer';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import RouteBreadcrumb from '../../../components/Breadcrumb/RouteBreadcrumb';
import Author from './Author';
import Comments from './Comments';
import PostComment from './PostComment';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import {
    getSingleArticle,
    getRelatedArticles,
    getMostViewedArticlesHome,
    updateDownloadedCount,
    getCommentsOfArticle,
    postCommentOfArticle,
    replyACommentOfArticle,
    resetPostCommentState,
    resetReplyACommentState
}
    from '../../../store/actions/articleActions';
import { getCategories } from '../../../store/actions/submissionActions';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { checkValidity, getFormattedDateOnly, updateObject } from '../../../utils/utility';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { commentAndReplyInput } from '../../../utils/input-controls';

class Article extends Component {

    state = commentAndReplyInput;

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.match.params.id) {
            this.props.getSingleArticle(this.props.match.params.id);
            this.props.getCommentsOfArticle(this.props.match.params.id);
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isCommentPosted && !nextProps.error) {
            this.props.resetPostCommentState();
            toast.success("Đăng tải bình luận thành công!");
            this.props.getCommentsOfArticle(this.props.match.params.id);
        }
        if (nextProps.isReplyPosted && !nextProps.error) {
            this.props.resetReplyACommentState();
            toast.success("Trả lời bình luận thành công!");
            this.props.getCommentsOfArticle(this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.getSingleArticle(this.props.match.params.id);
            this.props.getCommentsOfArticle(this.props.match.params.id);
            this.props.getRelatedArticles(this.props.match.params.id, 1, 5);
        }
    }

    updateDownloadedTimes = () => {
        if (this.props.match.params.id) {
            this.props.updateDownloadedCount(this.props.match.params.id);
        }
    }

    commentInputChangeHandler = (event) => {
        const updatedComment = updateObject(this.state.comment, {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.comment.validation),
            touched: true
        })
        this.setState(updateObject(this.state, { comment: updatedComment }));
    }

    postCommentHandler = () => {
        if (this.props.match.params.id) {
            this.props.postCommentOfArticle(this.props.match.params.id, this.state.comment.value);
        }
        this.setState(updateObject(this.state, commentAndReplyInput));
    }

    selectCommentToReplyHandler = (commentId) => {
        this.setState(updateObject(this.state, { commentToReplyId: commentId }));
    }

    replyInputChangeHandler = (event) => {
        const updatedReply = updateObject(this.state.reply, {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.reply.validation),
            touched: true
        })
        this.setState(updateObject(this.state, { reply: updatedReply }));
    }

    postReplyACommentHandler = (commentId) => {
        this.props.replyACommentOfArticle(commentId, this.state.reply.value);
        this.setState(updateObject(this.state, commentAndReplyInput));
    }

    cancelReplyHandler = () => {
        this.setState(updateObject(this.state, { commentToReplyId: "" }));
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
                                                <p>{this.props.article.submissionId.typeId.name}</p>
                                                <p>{this.props.article.submissionId.categoryId.name}</p>
                                            </div>
                                            <h4 className="post-title">{this.props.article.submissionId.title}</h4>
                                            <div className="post-meta-2">
                                                <Link to="#" className="text-dark" style={{ fontWeight: '400' }}>
                                                    <i className="fas fa-user"></i>{" "}
                                                    {this.props.article.submissionId.authorId.lastname} {this.props.article.submissionId.authorId.firstname}
                                                </Link>
                                                <Link to="#" className="text-dark ml-1" style={{ fontWeight: '400' }}>
                                                    <i className="fas fa-clock" aria-hidden="true"></i> {getFormattedDateOnly(this.props.article.publishedDate)}
                                                </Link>
                                                <Link to="#" className="text-dark ml-1" style={{ fontWeight: '400' }}>
                                                    <i className="fas fa-eye" aria-hidden="true"></i> {this.props.article.views}
                                                </Link>
                                                <Link to="#" className="text-dark ml-1" style={{ fontWeight: '400' }}>
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
                                            <div className="row mt-4">
                                                <div><b>Tag: </b></div>
                                                <div className="badge-ol badge-ol-dark badge-outlined ml-2">{this.props.article.submissionId.typeId.name}</div>
                                                <div className="badge-ol badge-ol-dark badge-outlined ml-1">{this.props.article.submissionId.categoryId.name}</div>
                                            </div>
                                            <Author author={this.props.article.submissionId.authorId} />
                                        </div>
                                    ) : <Spinner />}
                                </div>
                                {/* <RelatedPost /> */}
                                <div className="comment_area clearfix bg-white mb-30 p-30 box-shadow">
                                    {this.props.comments.length > 0 ? (
                                        <Comments
                                            isAuth={this.props.isAuth}
                                            comments={this.props.comments}
                                            reply={this.state.reply}
                                            commentToReplyId={this.state.commentToReplyId}
                                            selectCommentToReplyHandler={this.selectCommentToReplyHandler}
                                            replyInputChangeHandler={this.replyInputChangeHandler}
                                            postReplyACommentHandler={this.postReplyACommentHandler}
                                            cancelReplyHandler={this.cancelReplyHandler}
                                        />
                                    ) : (
                                            <Aux>
                                                <div className="section-heading">
                                                    <h5>Bình Luận</h5>
                                                </div>
                                                <div>Chưa có bình luận nào</div>
                                            </Aux>
                                        )}
                                </div>
                                <div className="post-a-comment-area bg-white mb-30 p-30 box-shadow clearfix">
                                    <PostComment
                                        isAuth={this.props.isAuth}
                                        comment={this.state.comment}
                                        commentInputChangeHandler={this.commentInputChangeHandler}
                                        postCommentHandler={this.postCommentHandler}
                                    />
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
                <ToastContainer autoClose={2000} />
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
        article: state.article.article,
        comments: state.article.comments,
        related_articles: state.article.related_articles,
        most_viewed_articles: state.article.most_viewed_articles,
        loading: state.article.loading,
        error: state.article.error,
        categories: state.submission.categories,
        isCommentPosted: state.article.isCommentPosted,
        isReplyPosted: state.article.isReplyPosted
    };
};

const mapDispatchToProps = {
    getSingleArticle,
    getCommentsOfArticle,
    getRelatedArticles,
    getMostViewedArticlesHome,
    getCategories,
    updateDownloadedCount,
    postCommentOfArticle,
    replyACommentOfArticle,
    resetPostCommentState,
    resetReplyACommentState
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);