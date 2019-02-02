import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, InputAccessoryView } from 'react-native'
import {style} from "../components/styles";
import { connect } from 'react-redux'
import { addDeck } from "../actions";


class AddDeck extends React.Component {
    state = {
        deckTitle: '',
    }

    static navigationOptions = {
        title: 'Add Deck',
    };

    handleTitleChange = (text) => {
        this.setState({
            deckTitle: text
        })
    }

    handleSubmit = () => {
        this.props.addDeck(this.state.deckTitle,
            {
                title: this.state.deckTitle,
                questions: [],
            })

        Keyboard.dismiss();
        this.props.navigation.navigate('DeckDetail', {
            key: this.state.deckTitle,
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container} behavior={'padding'}>
                <View style={style.content}>
                    <Text>Enter a Flashcard Deck Title</Text>
                    <TextInput
                        style={{height: 40, width: '90%', borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.handleTitleChange(text)}
                        placeholder={'Geography Flashcards'}
                    />
                    <TouchableOpacity onPress={() => this.handleSubmit()} style={[style.button, {backgroundColor: 'green'}]}>
                        <Text style={{color: 'white'}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDeck: (key, deck) => dispatch(addDeck({[key]: deck}))
    }
}

export default connect(null, mapDispatchToProps)(AddDeck)