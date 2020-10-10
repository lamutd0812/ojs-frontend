import React, { Component } from 'react';
import LeftSidebar from './LeftSidebar';
import MainPosts from './MainPosts';
import RightSidebar from './RightSidebar';

class Home extends Component {
    render() {
        return (
            <div>
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