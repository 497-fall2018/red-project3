import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements'

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const THUMBS_UP = gql`
  mutation THUMBS_UP($foodId: ID!) {
    thumbsUp(id: $foodId) {
      id
      thumbsUp
    }
  }
`;

const THUMBS_DOWN = gql`
  mutation THUMBS_DOWN($foodId : ID!) {
    thumbsDown(id: $foodId) {
      id
      thumbsDown
    }
  }
`;

export default class FoodRow extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    if (this.props.showButtons){
      return (
        <View style={styles.card}>
          <Text style={styles.foodName}>{this.props.food.name}</Text>
          <Text style={styles.foodDiningHall}>{this.props.food.dining.name}</Text>
          <View style={styles.buttonContainer}>
            <Mutation mutation={THUMBS_UP}
                      variables={{ foodId: this.props.food.id }}>
            {
              (thumbsUp, { data }) =>
                <TouchableOpacity style={styles.thumbsUp}
                                  onPress={() => thumbsUp()}>
                <View style={styles.iconContainer}>
                  <Icon
                    name='thumb-up'
                    color="#00A591"
                  />
                  <Text style={styles.thumbsUpText}>{this.props.food.thumbsUp}</Text>
                </View>
              </TouchableOpacity>
            }
            </Mutation>
            <Mutation mutation={THUMBS_DOWN}
                      variables={{ foodId : this.props.food.id }}>
              {
                (thumbsDown, { data }) => (
                <TouchableOpacity style={styles.thumbsDown} 
                                  onPress={() => thumbsDown()}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name='thumb-down'
                      color="#00A591"
                    />
                    <Text style={styles.thumbsDownText}>{this.props.food.thumbsDown}</Text>
                  </View>
                </TouchableOpacity>
                )
              }
            </Mutation>
          </View>
        </View>
      );
  }
  else {
    return (
      <View style={styles.card}>
        <Text style={styles.foodName}>{this.props.food.name}</Text>
        <Text style={styles.foodDiningHall}>{this.props.food.dining.name}</Text>
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
  },
  buttonContainer: {
    flexDirection:'row',
  },
  thumbsUp: {
    width: '50%',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#00A591',
    flexDirection:'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  thumbsUpText: {
    color: '#00A591',
    fontSize: 14,
    marginLeft: 5,
  },
  thumbsDown: {
    width: '50%',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#E94B3C',
  },
  thumbsDownText: {
    color: '#E94B3C',
    fontSize: 14,
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection:'row',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 45,
  },
});
