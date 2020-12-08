import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const MetaData = (props) => {
    return (
        <Aux>
            {/* <!-- Like Dislike Share --> */}
            <div className="like-dislike-share my-3">
                
            </div>
            {/* <!-- Post Author --> */}
            <div className="post-author d-flex align-items-center">
                <div className="post-author-thumb">
                    <img src={props.author.avatar} alt="" />
                </div>
                <div className="post-author-desc pl-4">
                    <Link to="#" className="author-name">{props.author.lastname} {props.author.firstname}</Link>
                    <p>{props.author.biography}</p>
                </div>
            </div>
        </Aux>

    );
};

export default MetaData;