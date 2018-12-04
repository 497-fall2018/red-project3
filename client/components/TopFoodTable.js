import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import FoodRow from './foodRow';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

//        topFoodsOverall(num: Int!, isHall: Boolean!, date: String!, timeOfDay: String!): [Food!]!

const TOP_FOODS_OVERALL =  gql`
    query TOP_FOODS_OVERALL($date : String, $timeOfDay : String) {
        topFoodsOverall(num: 5, isHall: true, date: $date, timeOfDay: $timeOfDay) {
            id
            name
            thumbsUp
            thumbsDown
            dining {
                name
            }
        }
    }
`;


export default class Top5Page extends React.Component {

  static navigationOptions = {
    header: null,
  };
  // props
  // date
  // timeOfDay
  // showButtons

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.top5Container}>
            <Query query={TOP_FOODS_OVERALL}
                    variables= {{ date: this.props.date, timeOfDay: this.props.timeOfDay }}>
                    {
                        ({ data }) => {
                          // console.log(data);
                          data.topFoodsOverall.map(food => (
                                <FoodRow key={food.id}
                                         food={food}
                                         showButtons={this.props.showButtons}
                                />
                            ))
                          }
                    }
            </Query>
          </View>
        </ScrollView>

        {/*<View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Current Menu:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>Lunch</MonoText>
          </View>
        </View>*/}
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  timeOfDayContainer: {
    alignItems: 'center',
    width: '30%',
    backgroundColor: "#00A591",
    marginBottom: 5
  },
  timeOfDay: {
    fontSize: 20,
    marginTop: 0,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top5Container: {
    alignItems: 'center',
    marginTop: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
    flexDirection:'row',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});