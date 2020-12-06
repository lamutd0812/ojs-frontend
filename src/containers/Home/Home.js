import React, { Component } from 'react';
import LeftSidebar from './LeftSidebar';
import MainPosts from './MainPosts';
import RightSidebar from './RightSidebar';
import Breadcumb from '../../components/Breadcrumb/Breadcrumb';

class Home extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Breadcumb
                    title="Tạp chí truy cập mở VNOJS"
                    imageUrl={`url(${require("../../resources/imgs/40.jpg")})`} />
                <section className="mag-posts-area d-flex flex-wrap">
                    {/* Post Left Sidebar Area */}
                    <LeftSidebar />

                    {/* Main Posts Area */}
                    <MainPosts />

                    {/* Post Right Sidebar Area */}
                    <RightSidebar />
                </section>
            </div>
        );
    }
}

export default Home;