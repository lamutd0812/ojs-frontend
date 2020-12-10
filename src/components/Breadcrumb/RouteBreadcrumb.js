import React from 'react';
import { Link } from 'react-router-dom';

const RouteBreadcrumb = (props) => {
    return (
        <div className="mag-breadcrumb py-5">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                            {props.children}
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    );
};

export default RouteBreadcrumb;