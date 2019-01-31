import React from 'react';
import {fetchAllDecks} from "../util/store";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {style} from "../components/styles";
import { connect } from 'react-redux'
class DeckDetail extends React.Component {
    state = ({

        key: this.props.navigation.getParam('key'),

    });
    static navigationOptions = {
        title: 'Flashcard Quiz',
    };
    componentDidMount() {
    }

    _handleAddCard = () => {
        this.props.navigation.navigate('AddCard', {
            key: this.state.key,
        });
    };

    _handleStartQuiz = () => {
        this.props.navigation.navigate('StartQuiz', {
            key: this.state.key,
        });
    }

    render() {
        const key = this.state.key;
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>{this.props.decks[key]['title']}</Text>
                    <Text>{this.props.decks[key]['questions'].length} cards</Text>
                </View>
                <View style={style.content}>
                    <TouchableOpacity onPress={() => this._handleAddCard()} style={[style.button, {backgroundColor: 'green'}]}>
                        <Text style={{color: 'white'}}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._handleStartQuiz()} style={[style.button, {backgroundColor: 'blue'}]}>
                        <Text style={{color: 'white'}}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )
    }

}

const mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckDetail)
