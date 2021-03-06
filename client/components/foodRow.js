import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { MonoText } from './StyledText';
import { Icon } from 'react-native-elements'

export default class FoodRow extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    if (this.props.showButtons){
      return (
        <View style={styles.card}>
          <Text style={styles.foodName}>{this.props.food.name}</Text>
          <Text style={styles.foodDiningHall}>{this.props.food.diningHall}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.thumbsUp} onPress={() => this.props.handleThumbsUp(this.props.food.id)}>
              <View style={styles.iconContainer}>
                <Icon
                  name='thumb-up'
                  color="#00A591"
                />
                <Text style={styles.thumbsUpText}>{this.props.food.thumbsUp}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.thumbsDown} onPress={() => this.props.handleThumbsDown(this.props.food.id)}>
              <View style={styles.iconContainer}>
                <Icon
                  name='thumb-down'
                  color="#E94B3C"
                />
                <Text style={styles.thumbsDownText}>{this.props.food.thumbsDown}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
  else {
    return (
      <View style={styles.card}>
        <Text style={styles.foodName}>{this.props.food.name}</Text>
        <Text style={styles.foodDiningHall}>{this.props.food.diningHall}</Text>
      </View>
    )
  }

  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#BBC6C7',
    borderRadius: 5,
    width: '80%',
    padding: 10,
    paddingLeft: 5,
    marginTop: 5,
  },
  foodName: {
    fontSize: 18,
  },
  foodDiningHall: {
    fontSize: 14,
    marginBottom:10
  },
  buttonContainer: {
    flexDirection:'row',
  },
  thumbsUp: {
    width: '40%',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#00A591',
    flexDirection:'row',
    alignItems: 'center',
    textAlign: 'center',
    marginRight:20,
    marginLeft:20
  },
  thumbsUpText: {
    color: '#00A591',
    fontSize: 14,
    marginLeft: 5,
    textAlign: 'center',
  },
  thumbsDown: {
    width: '40%',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#E94B3C',
    flexDirection:'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  thumbsDownText: {
    color: '#E94B3C',
    fontSize: 14,
    marginLeft: 5,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection:'row',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 45,
  },
});
