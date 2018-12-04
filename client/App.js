import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { ApolloProvider, Query, withApollo } from "react-apollo";
import client from "./index"

import gql from 'graphql-tag'

const TOP_FOODS_OVERALL = gql`
query {topFoodsOverall(num: 5, isHall: true, date: "2018-11-15", timeOfDay: "Lunch") {
  id
  name
  thumbsUp
  thumbsDown
  dining {
      name
  }
}
}
`

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  // render() {
  //   if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
  //     return (
  //       <ApolloProvider client={client}>
  //         <Query query={TOP_FOODS_OVERALL}>{
  //           ({ data }) => {
  //             console.log(data)
  //           }
  //         }</Query>
  //         <AppLoading
  //         startAsync={this._loadResourcesAsync}
  //         onError={this._handleLoadingError}
  //         onFinish={this._handleFinishLoading}
  //         />
  //       </ApolloProvider>
  //     );
  //   } else {
  //     return (
  //       <ApolloProvider client={client}>
  //         <View style={styles.container}>
  //           {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
  //           <AppNavigator/>
  //         </View>
  //       </ApolloProvider>
  //     );
  //   }
  // }

  render() {
    return(
          <ApolloProvider client={client}>
            <Query query={TOP_FOODS_OVERALL}>{
              ({ data }) => {
                console.log(data)
                return null;
              }
            }</Query>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator/>
            </View>
          </ApolloProvider>
    );
  
      };

  // componentWillMount = () => {
  //   client
  // .query({
  //   query: gql`
  //     query {topFoodsOverall(num: 5, isHall: true, date: "2018-11-15", timeOfDay: "Lunch") {
  //       id
  //       name
  //       thumbsUp
  //       thumbsDown
  //       dining {
  //           name
  //       }
  //   }
  // }
  //   `
  // })
  // .then(result => console.log(result));
  // }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default withApollo(App)