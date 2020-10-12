import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Home from '../../containers/Home/Home';

class Layout extends Component {
    render() {
        return (
            <div>
                <Aux>
                    <Navigation />
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                        {this.props.children}
                    </main>
                    <Footer />
                </Aux>
            </div>
        );
    }
}

export default Layout;