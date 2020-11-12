import React from 'react';
import { Link } from 'react-router-dom';

const ContentHeader = (props) => {
    return (
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h3>{props.title}</h3>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item">Submissions</li>
                        {props.children}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;