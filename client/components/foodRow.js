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

export default class FoodRow extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.foodName}>{this.props.food.name}</Text>
        <Text style={styles.foodDiningHall}>{this.props.food.diningHall}</Text>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.thumbsUp}
            onPress={() => this.props.handleThumbsUp(this.props.food.id)}
            title="Thumbs Up"
            color="#32EB4A"
          />
          <Button
            style={styles.thumbsDown}
            onPress={() => this.props.handleThumbsDown(this.props.food.id)}
            title="Thumbs Down"
            color="#eb2f39"
          />
        </View>
      </View>
    );
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
  },
  buttonContainer: {
    flexDirection:'row',
  },
  thumbsUp: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'green',
    color: 'green',
  },
  thumbsDown: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'red',
    color: 'red',
  },
});
