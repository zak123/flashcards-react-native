import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { initialData } from "../util/data";
import {connect} from 'react-redux'
import {receiveDecks} from "../actions";
import {getiOSNotificationPermission, scheduleNotification} from "../util/notification";


class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.props.dispatch(receiveDecks(initialData))
    getiOSNotificationPermission();
    scheduleNotification();
  }

  _handleDeckPress = (deck) => {
      this.props.navigation.navigate('DeckDetail', {
        key: deck.title,
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>Get studying by tapping a deck!</Text>

          </View>

          <View style={styles.helpContainer}>
              {Object.keys(this.props.decks).map((key) =>
                  <TouchableOpacity onPress={() => this._handleDeckPress(this.props.decks[key])} style={styles.helpLink} key={key}>
                      <Text style={styles.helpLinkText}>{key}</Text>
                      <Text style={styles.helpLinkText}>{this.props.decks[key]['questions'].length} questions</Text>
                  </TouchableOpacity>
              )}

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }


}

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
