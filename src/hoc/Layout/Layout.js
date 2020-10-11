import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
    render() {
        return (
            <div>
                <Aux>
                    <Navigation />
                    <main>
                        {this.props.children}
                    </main>
                    <Footer />
                </Aux>
            </div>
        );
    }
}

export default Layout;