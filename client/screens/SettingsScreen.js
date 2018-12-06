import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

const preferences = [
  "Chicken",
  "Hamburger",
  "Salad",
  "Pizza",
  "Pasta",
  "Stir fry",
  "Fries",
  "Bread",
  "Rice"
];

const dietaryRestrictions = [
  "Vegan",
  "Vegetarian",
  "Balanced",
  "Avoiding Gluten"
]

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      checkedPreferences: new Array(preferences.length).fill(false),
      checkedRestrictions: new Array(dietaryRestrictions.length).fill(false),
      dietOptions: false
    };
  }

  checkPreference = name => {
    var clonedArray = JSON.parse(JSON.stringify(this.state.checkedPreferences));
    var findex = preferences.findIndex(pref => pref === name);
    clonedArray[findex] = !clonedArray[findex];
    this.setState({checkedPreferences: clonedArray});
  }

  checkRestrictions = name => {
    var clonedArray = JSON.parse(JSON.stringify(this.state.checkedRestrictions));
    var findex = dietaryRestrictions.findIndex(pref => pref === name);
    clonedArray[findex] = !clonedArray[findex];
    this.setState({checkedRestrictions: clonedArray});
  }

  changePrefTab = pref => {
    this.setState({dietOptions: pref})
  }

  render() {
    var key = -1;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                  <Image style={styles.avatar}
                    source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                  <Text style={styles.name}>Michael Born</Text>
                  <Text style={styles.userInfo}>michaelborn@u.northwestern.edu </Text>
              </View>
              <View style={styles.preftabContainer}>
                <TouchableOpacity style={styles.prefTabButton} onPress={() => this.changePrefTab(false)}>
                    <Text style={styles.prefTabName}> Your Food Preferences </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.prefTabButton} onPress={() => this.changePrefTab(true)}>
                    <Text style={styles.prefTabName}> Dietary Restrictions </Text>
                </TouchableOpacity>
              </View>
            </View>

              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.state.dietOptions ? dietaryRestrictions.map(p => {
                    key++;
                    return <CheckBox
                      key={key}
                      center
                      title={p}
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon='add'
                      checkedColor='red'
                      checked={this.state.checkedRestrictions[key]}
                      onPress={() => this.checkRestrictions(p)}
                    />
                }) : preferences.map(p => {
                    key++;
                    return <CheckBox
                      key={key}
                      center
                      title={p}
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon='add'
                      checkedColor='red'
                      checked={this.state.checkedPreferences[key]}
                      onPress={() => this.checkPreference(p)}
                    />
                })}
              </ScrollView>
          </View>
        );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerText: {
    fontSize:18,
    color:"#000000",
    fontWeight:'600',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  prefTabButton: {
    alignItems: 'center',
    width: 190,
    borderRadius: 4,
    backgroundColor: "#00A591",
    margin: 7.5,
    padding: 5,
    marginBottom:20,
  },
  prefTabName: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight:'600',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  preftabContainer: {
    flexDirection: 'row',
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#778899",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  preferencesScrollView: {

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
