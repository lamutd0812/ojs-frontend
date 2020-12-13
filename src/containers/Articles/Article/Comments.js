import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Comments = () => {
    return (
        <Aux>
            <div className="section-heading">
                <h5>Bình Luận</h5>
            </div>

            <ol>
                <li className="single_comment_area">
                    <div className="comment-content d-flex">
                        <div className="comment-author">
                            <img src="img/bg-img/53.jpg" alt="author" />
                        </div>
                        <div className="comment-meta">
                            <a href="a" className="comment-date">27 Aug 2019</a>
                            <h6>Tomas Mandy</h6>
                            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius</p>
                            <div className="d-flex align-items-center">
                                <a href="a" className="like">like</a>
                                <a href="a" className="reply">Reply</a>
                            </div>
                        </div>
                    </div>

                    <ol className="children">
                        <li className="single_comment_area">
                            <div className="comment-content d-flex">
                                <div className="comment-author">
                                    <img src="img/bg-img/54.jpg" alt="author" />
                                </div>
                                <div className="comment-meta">
                                    <a href="a" className="comment-date">27 Aug 2019</a>
                                    <h6>Britney Millner</h6>
                                    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius</p>
                                    <div className="d-flex align-items-center">
                                        <a href="a" className="like">like</a>
                                        <a href="a" className="reply">Reply</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ol>
                </li>

                <li className="single_comment_area">
                    <div className="comment-content d-flex">
                        <div className="comment-author">
                            <img src="img/bg-img/55.jpg" alt="author" />
                        </div>
                        <div className="comment-meta">
                            <a href="a" className="comment-date">27 Aug 2019</a>
                            <h6>Simon Downey</h6>
                            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius</p>
                            <div className="d-flex align-items-center">
                                <a href="a" className="like">like</a>
                                <a href="a" className="reply">Reply</a>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
        </Aux>
    );
};

export default Comments;