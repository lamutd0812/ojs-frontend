import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Home from '../../containers/Home/Home';
// import Article from '../../containers/Article/Article';

class Layout extends Component {
    render() {
        let routes = (
            <Switch>
                {/* <Route path="/single-article" component={Article} /> */}
                <Route exact path="/" component={Home} />
            </Switch>
        );
        return (
            <Aux>
                <Navigation />
                <main>
                    {routes}
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        );
    }
}

export default Layout;