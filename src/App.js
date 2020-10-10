import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path="/home" component={Home} />
            </Switch>
        )
        return (
            <div>
                <Layout>
                   {routes}
                </Layout>
            </div>
        );
    }
}

export default App;