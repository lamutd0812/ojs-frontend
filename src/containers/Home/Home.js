import React, { Component } from 'react';
import LeftSidebar from './LeftSidebar';
import MainPosts from './MainPosts';
import RightSidebar from './RightSidebar';
import Breadcumb from '../../components/Breadcrumb/Breadcrumb';
import { connect } from 'react-redux';
import { getLatestArticlesHome, getMostViewedArticlesHome, getMostDownloadedArticlesHome }
    from '../../store/actions/articleActions';
import { getCategories } from '../../store/actions/submissionActions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';
class Home extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.latest_articles.length <= 0) {
            this.props.getLatestArticlesHome(1, 5);
        }
        if (this.props.most_viewed_articles.length <= 0) {
            this.props.getMostViewedArticlesHome(1, 5);
        }
        if (this.props.most_downloaded_articles.length <= 0) {
            this.props.getMostDownloadedArticlesHome(1, 8);
        }
        if (this.props.categories.length <= 0) {
            this.props.getCategories();
        }
    }

    render() {
        return (
            <div>
                <Breadcumb
                    title="Tạp chí truy cập mở VNOJS"
                    imageUrl={`url(${require("../../resources/imgs/40.jpg")})`} />
                <section className="mag-posts-area d-flex flex-wrap mt-3">
                    {!this.props.loading && this.props.latest_articles.length > 0 &&
                        this.props.categories.length > 0 && this.props.most_viewed_articles.length > 0 &&
                        this.props.most_downloaded_articles.length > 0 ? (
                            <Aux>
                                <LeftSidebar
                                    latest_articles={this.props.latest_articles}
                                    most_viewed_articles={this.props.most_viewed_articles} />
                                <MainPosts
                                    latest_articles={this.props.latest_articles}
                                    most_viewed_articles={this.props.most_viewed_articles}
                                    most_downloaded_articles={this.props.most_downloaded_articles} />
                                <RightSidebar
                                    most_downloaded_articles={this.props.most_downloaded_articles}
                                    categories={this.props.categories} />
                            </Aux>
                        ) : (
                            <Spinner />
                        )}
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        latest_articles: state.article.latest_articles,
        most_viewed_articles: state.article.most_viewed_articles,
        most_downloaded_articles: state.article.most_downloaded_articles,
        loading: state.article.loading,
        error: state.article.error,
        categories: state.submission.categories
    };
};

const mapDispatchToProps = {
    getLatestArticlesHome,
    getMostViewedArticlesHome,
    getMostDownloadedArticlesHome,
    getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);