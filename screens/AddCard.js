import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import {style} from "../components/styles";
import { connect } from 'react-redux'
import { addCard } from "../actions";

class AddCard extends React.Component {
    state = ({

        key: this.props.navigation.getParam('key'),
        question: '',
        answer: '',

    });
    static navigationOptions = {
        title: 'Add Card',
    };

    handleAddCard = () => {
        this.props.addCard(this.state.key, [{question: this.state.question, answer: this.state.answer }]);
        this.props.navigation.goBack();
    }

    handleQuestionChange = (question) => {
        this.setState({
            question: question,
        })
    }
    handleAnswerChange = (answer) => {
        this.setState({
            answer: answer,
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={style.container} behavior={'padding'}>
                <View style={style.content}>
                    <Text style={{padding: 10}}>
                        Enter a question
                    </Text>
                    <TextInput
                        style={{height: 40, width: '90%', borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.handleQuestionChange(text)}
                        placeholder={'What color is the sky?'}
                        />
                    <Text style={{padding: 10}}>
                        Enter an answer
                    </Text>
                    <TextInput
                        style={{height: 40, width: '90%', borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.handleAnswerChange(text)}
                        placeholder={'blue'}
                    />
                    <TouchableOpacity onPress={() => this.handleAddCard()} style={[style.button, {backgroundColor: 'green'}]}>
                        <Text style={{color: 'white'}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )

    }
}
const mapStateToProps = (decks) => {
    return {
        decks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (key, questions) => dispatch(addCard({title: key, questions}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)