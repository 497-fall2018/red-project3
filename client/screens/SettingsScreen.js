import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
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
  "Bread"
];

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      checkedPreferences: new Array(preferences.length).fill(false)
    };
  }

  checkPreference = name => {
    var clonedArray = JSON.parse(JSON.stringify(this.state.checkedPreferences));
    var findex = preferences.findIndex(pref => pref === name);
    clonedArray[findex] = !clonedArray[findex];
    this.setState({checkedPreferences: clonedArray});
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
                <Text style={styles.userInfo}>michaelborn@mail.com </Text>
            </View>
            <Text style={styles.headerText}>List your preferences</Text>
          </View>

          <ScrollView>
            {preferences.map(p => {
                key++;
                return <CheckBox
                  key={key}
                  center
                  title={p}
                  iconRight
                  iconType='material'
                  checkedIcon='clear'
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
  }
});
