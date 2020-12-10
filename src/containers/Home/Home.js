import React, { Component } from 'react';
import LeftSidebar from './LeftSidebar';
import MainPosts from './MainPosts';
import RightSidebar from './RightSidebar';
import Breadcumb from '../../components/Breadcrumb/Breadcrumb';
import { connect } from 'react-redux';
import { getAllArticles } from '../../store/actions/articleActions';
import { getCategories } from '../../store/actions/submissionActions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';
class Home extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.articles.length <= 0) {
            this.props.getAllArticles(1);
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
                    {!this.props.loading && this.props.articles.length > 0 && this.props.categories.length > 0 ? (
                        <Aux>
                            <LeftSidebar articles={this.props.articles} />
                            <MainPosts articles={this.props.articles} />
                            <RightSidebar
                                articles={this.props.articles}
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
        articles: state.article.articles,
        loading: state.article.loading,
        error: state.article.error,
        categories: state.submission.categories
    };
};

const mapDispatchToProps = {
    getAllArticles,
    getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);