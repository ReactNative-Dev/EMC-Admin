import React, {Component} from "react";
import Router from "./Router";
import {Provider} from "react-redux";
import store from "./common/store";
import NavigatorService from "./modules/common/navigatorService";
import {Font} from 'expo';


class App extends Component {

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'proxima-nova-semibold': require('./assets/fonts/Proxima-Nova-Semibold.ttf'),
            'proxima-nova-regular': require('./assets/fonts/Proxima-Nova-Regular.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    render() {
        return (
            this.state.fontLoaded ?
                <Provider store={store}>
                    <Router
                        ref={navigatorRef => {
                            setTimeout(() => {
                                NavigatorService.setContainer(navigatorRef);
                            }, 2000);
                        }}/>
                </Provider>
                : null
        );
    }
}

export default App;
