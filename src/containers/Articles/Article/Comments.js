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
                                {props.isAuth && (
                                    <div className="d-flex align-items-center">
                                        <div className="like" to="#">Thích</div>
                                        <div className="reply" onClick={() => props.selectCommentToReplyHandler(comment._id)}>Trả lời</div>
                                    </div>
                                )}
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
                                            {props.isAuth && (
                                                <div className="d-flex align-items-center">
                                                    <div className="like" to="#">Thích</div>
                                                    <div className="reply" onClick={() => props.selectCommentToReplyHandler(comment._id)}>Trả lời</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </li>
                            {props.commentToReplyId === comment._id && (
                                <div className="col-12 pl-5 pb-2">
                                    <label>Trả lời bình luận*</label>
                                    <input
                                        name="reply"
                                        className={!props.reply.valid && props.reply.touched ? "form-control-error" : "form-control"}
                                        id="reply"
                                        defaultValue={props.reply.value}
                                        cols="30"
                                        rows="10"
                                        placeholder="Nội dung trả lời bình luận"
                                        onChange={props.replyInputChangeHandler} />
                                    {!props.reply.valid && props.reply.touched ?
                                        <p className="form-control-error-msg">Nội dung phải dài ít nhất 10 ký tự!</p> : null}

                                    <div className="row float-right">
                                        <button
                                            className="btn btn-outline-dark btn-flat mr-1"
                                            disabled={!props.reply.valid}
                                            onClick={() => props.postReplyACommentHandler(comment._id)} >Trả lời</button>
                                        <button
                                            className="btn btn-outline-danger btn-flat mr-1"
                                            onClick={props.cancelReplyHandler}>Hủy</button>
                                    </div>
                                </div>
                            )}
                        </ol>
                    </li>
                ))}

            </ol>
        </Aux>
    );
};

export default Comments;