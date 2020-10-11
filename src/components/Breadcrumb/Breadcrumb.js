import React from 'react';

const Breadcrumb = (props) => {
    return (
        <div>
            <section className="breadcrumb-area bg-img bg-overlay"
                style={{ backgroundImage: props.imageUrl }}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2>{props.title}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Breadcrumb;