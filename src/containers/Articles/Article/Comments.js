import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { getFormattedDate } from '../../../utils/utility';

const Comments = (props) => {
    return (
        <Aux>
            <div className="section-heading">
                <h5>Bình Luận</h5>
            </div>

            <ol>
                {props.comments.map(comment => (
                    <li className="single_comment_area" key={comment._id}>
                        <div className="comment-content d-flex">
                            <div className="comment-author">
                                <img src={comment.user.avatar} alt="author" />
                            </div>
                            <div className="comment-meta">
                                <a href="a" className="comment-date">{getFormattedDate(comment.createdAt)}</a>
                                <h6>{comment.user.lastname} {comment.user.firstname}</h6>
                                <p>{comment.content}</p>
                                <div className="d-flex align-items-center">
                                    <a href="a" className="like">Thích</a>
                                    <a href="a" className="reply">Trả lời</a>
                                </div>
                            </div>
                        </div>

                        <ol className="children">
                            <li className="single_comment_area">
                                {comment.replies.length > 0 && comment.replies.map(reply => (
                                    <div className="comment-content d-flex" key={reply._id}>
                                        <div className="comment-author">
                                            <img src={reply.user.avatar} alt="author" />
                                        </div>
                                        <div className="comment-meta">
                                            <a href="a" className="comment-date">{getFormattedDate(reply.createdAt)}</a>
                                            <h6>{reply.user.lastname} {reply.user.firstname}</h6>
                                            <p>{reply.content}</p>
                                            <div className="d-flex align-items-center">
                                                <a href="a" className="like">like</a>
                                                <a href="a" className="reply">Reply</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </li>
                        </ol>
                    </li>
                ))}

            </ol>
        </Aux>
    );
};

export default Comments;