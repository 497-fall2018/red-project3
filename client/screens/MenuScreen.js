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
import FoodRow from '../components/foodRow';

var Menus = {
  "Allison": {
    Breakfast: [
      {id: 1, name: "blublublbu", diningHall: "Allison", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "blublbulub", diningHall: "Allison", thumbsUp: 0, thumbsDown: 0}
    ],
    Lunch: [
      {id: 1, name: "blablalbalab", diningHall: "Allison", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "blalbalbalbal", diningHall: "Allison", thumbsUp: 0, thumbsDown: 0}
    ],
    Dinner: [
      {id: 1, name: "Crispy Fish Taco", diningHall: "Allison", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "Carnitas Burrito", diningHall: "Allison", thumbsUp: 0, thumbsDown: 0}
    ],
  },
  "Sargent": {
    Breakfast: [
      {id: 1, name: "aiiiiiiii", diningHall: "Sargent", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "uuooooooo", diningHall: "Sargent", thumbsUp: 0, thumbsDown: 0}
    ],
    Lunch: [
      {id: 1, name: "aaaaaaaaaaa", diningHall: "Sargent", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "uuuuuuuuuuu", diningHall: "Sargent", thumbsUp: 0, thumbsDown: 0}
    ],
    Dinner: [
      {id: 1, name: "Pork Carnitas Tacos", diningHall: "Sargent", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "Potato Salad", diningHall: "Sargent", thumbsUp: 0, thumbsDown: 0}
    ],
  },
  "Plex West": {
    Breakfast: [
      {id: 1, name: "fjaseiojfoiasjefoiasjh", diningHall: "Plex West", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "jfoieasjofijasiodji", diningHall: "Plex West", thumbsUp: 0, thumbsDown: 0}
    ],
    Lunch: [
      {id: 1, name: "111111111", diningHall: "Plex West", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "2222222222", diningHall: "Plex West", thumbsUp: 0, thumbsDown: 0}
    ],
    Dinner: [
      {id: 1, name: "Philly Cheese Steak Sandwich", diningHall: "Plex West", thumbsUp: 0, thumbsDown: 0},
      {id: 2, name: "Hamburger", diningHall: "Plex West", thumbsUp: 0, thumbsDown: 0}
    ],
  }
}

export default class MenuScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMenu: null,
      foodperiod: "Breakfast"
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleSelectedMenu = diningHall => {
    this.setState({selectedMenu: diningHall});
  }

  changePeriod = periodName => {
    this.setState({foodperiod: periodName})
  }

  render() {
    if (this.state.selectedMenu == null) {
      return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.diningHallButton} onPress={() => this.handleSelectedMenu('Allison')}>
              <Text style={styles.diningHallName}>Allison</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.diningHallButton} onPress={() => this.handleSelectedMenu('Sargent')}>
              <Text style={styles.diningHallName}>Sargent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.diningHallButton} onPress={() => this.handleSelectedMenu('Plex West')}>
              <Text style={styles.diningHallName}>Plex West</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => this.setState({selectedMenu: null, foodperiod: "Breakfast"})}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>{this.state.selectedMenu}</Text>
            <View style={styles.top5Container}>
              <View style={styles.periodContainer}>
                <TouchableOpacity style={styles.periodButton} onPress={() => this.changePeriod('Breakfast')}>
                  <Text style={styles.periodName}>Breakfast</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.periodButton} onPress={() => this.changePeriod('Lunch')}>
                  <Text style={styles.periodName}>Lunch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.periodButton} onPress={() => this.changePeriod('Dinner')}>
                  <Text style={styles.periodName}>Dinner</Text>
                </TouchableOpacity>
              </View>
              {Menus[this.state.selectedMenu][this.state.foodperiod].map(f => {
                  return <FoodRow
                      key={f.id}
                      food={f}
                      showButtons={false}
                      />
              })}
            </View>
          </ScrollView>
        </View>
      );
    }
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
  backButton: {
    width: 90,
    borderRadius: 6,
    backgroundColor: "#5879FF",
    margin: 10,
    padding: 5,
    marginTop: 50,
  },
  backText: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white'
  },
  innerContainer: {
    alignItems: 'center',
    marginTop: 300,
  },
  diningHallButton: {
    width: 200,
    borderRadius: 4,
    backgroundColor: "#00A591",
    margin: 10,
    padding: 5
  },
  diningHallName: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  periodName: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white'
  },
  periodButton: {
    alignItems: 'center',
    width: 90,
    borderRadius: 4,
    backgroundColor: "#00A591",
    margin: 10,
    padding: 5
  },
  periodContainer: {
    flexDirection: 'row'
  },
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
