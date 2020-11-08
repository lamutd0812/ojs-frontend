import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyEditorAssignments } from '../../../store/actions/reviewActions';

class Home extends Component {

    componentDidMount(){
        this.props.getMyEditorAssignments();
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editorAssignments: state.review.editorAssignments,
        error: state.review.error
    }
};

const mapDispatchToProps = {
    getMyEditorAssignments
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);