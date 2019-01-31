import React from 'react';
import {fetchAllDecks} from "../util/store";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'


export class DeckDetail extends React.Component {
    state = ({

        deck: this.props.navigation.getParam('deck'),

    });
    static navigationOptions = {
        title: 'Flashcard Quiz',
    };
    componentDidMount() {
    }

    refreshDeck() {
        // Refresh the questions from the selected deck
        fetchAllDecks((deck) => {
            this.setState({
                deck: deck[this.state.deck],
            })
        })
    }

    _handleAddCard = () => {
        this.props.navigation.navigate('AddCard');
    };

    render() {
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>{this.state.deck['title']}</Text>
                    <Text>{this.state.deck['questions'].length} cards</Text>
                </View>
                <View style={style.content}>
                    <TouchableOpacity onPress={() => this._handleAddCard()} style={[style.button, {backgroundColor: 'green'}]}>
                        <Text style={{color: 'white'}}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('start')} style={[style.button, {backgroundColor: 'blue'}]}>
                        <Text style={{color: 'white'}}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )
    }

}

