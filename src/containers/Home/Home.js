import React, { Component } from 'react';
import LeftSidebar from './LeftSidebar';
import MainPosts from './MainPosts';
import RightSidebar from './RightSidebar';

class Home extends Component {
    render() {
        return (
            <div>
                <section className="breadcrumb-area bg-img bg-overlay" style={{backgroundImage: `url(${require("../../resources/imgs/40.jpg")})`}}>
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12">
                                <div className="breadcrumb-content">
                                    <h2>Login</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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