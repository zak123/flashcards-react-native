import React from 'react';
import {Text, View} from 'react-native';
import {fetchAllDecks} from "../util/store";


export class QuestionList extends React.Component {
    state = ({

        deck: this.props.navigation.getParam('deck'),

    });

    componentDidMount() {
        console.log('here', this.state.deck);
    }

    refreshDeck() {
        // Refresh the questions from the selected deck
        fetchAllDecks((deck) => {
            this.setState({
                deck: deck[this.state.deck],
            })
        })
    }

    render() {
        return (
            <View>
                {this.state.deck.questions.map((obj) =>
                        <Text key={obj.questionText}>{obj.questionText}</Text>
                    )}
            </View>
            )
    }

}