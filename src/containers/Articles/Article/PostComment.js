import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const PostComment = (props) => {
    return (
        <Aux>
            <div className="section-heading">
                <h5>Để lại bình luận</h5>
            </div>

            <div className="contact-form-area">
                <form>
                    <div className="row">
                        <div className="col-12">
                            <textarea
                                name="comment"
                                className={!props.comment.valid && props.comment.touched ? "form-control-error" : "form-control"}
                                id="comment"
                                defaultValue={props.comment.value}
                                disabled={!props.isAuth}
                                cols="30"
                                rows="10"
                                placeholder={props.isAuth ? "Nội dung bình luận" : "Đăng nhập để bình luận"}
                                onChange={props.commentInputChangeHandler} />
                            {!props.comment.valid && props.comment.touched ?
                                <p className="form-control-error-msg">Bình luận phải dài ít nhất 10 ký tự!</p> : null}
                        </div>
                        <div className="col-12">
                            <button
                                type="button"
                                className="btn mag-btn mt-30"
                                disabled={!props.comment.valid}
                                onClick={props.postCommentHandler}>Bình luận</button>
                        </div>
                    </div>
                </form>
            </div>
        </Aux>
    );
};

export default PostComment;