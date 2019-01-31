import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import {style} from "../components/styles";
import { connect } from 'react-redux'
import { addCard } from "../actions";


class Quiz extends React.Component {
    state = ({
        correctAnswers: 0,
        currentQuestion: 0,
        shouldEnd: false,
        shouldShowAnswer: false,
        questions: this.props.decks[this.props.navigation.getParam('key')].questions,
        answer: '',
    });

    handleAnswerChange = (answer) => {
        this.setState({
            answer: answer,
        })
    }

    handleShowAnswer = () => {
        this.setState({
            shouldShowAnswer: true,
        })
    }

    handleAnswerQuestion = () => {
        this.setState({
            shouldShowAnswer: false,
            answer: '',
        })

        if (this.state.currentQuestion + 1 < this.state.questions.length) {
            this.setState((prevState) => ({
                currentQuestion: prevState.currentQuestion + 1,
            }))

        } else {
            this.setState((prevState) => ({
                shouldEnd: true,
            }))
        }

        if (this.state.answer === this.state.questions[this.state.currentQuestion].answer) {
            this.setState((prevState) => ({
                correctAnswers: prevState.correctAnswers + 1,
            }))
        }




    }

    handleRestartQuiz = () => {
        this.setState({
            shouldEnd: false,
            correctAnswers: 0,
            currentQuestion: 0,
            shouldShowAnswer: false,
            answer: '',
        })
    }


    componentDidMount() {

    }



    render() {
        let question = this.state.questions[this.state.currentQuestion].question;
        let answer = this.state.questions[this.state.currentQuestion].answer;

        return (
            <KeyboardAvoidingView style={style.container} behavior={'padding'}>
                    {this.state.shouldEnd === true
                        ?
                        <View style={style.content}>
                            <Text style={{fontWeight: 'bold'}}>You answered {this.state.correctAnswers} out of {this.state.questions.length} questions correctly.</Text>
                            <TouchableOpacity onPress={() => this.handleRestartQuiz()} style={[style.button, {backgroundColor: 'green'}]}>
                                <Text style={{color: 'white'}}>Restart Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[style.button, {backgroundColor: 'blue'}]}>
                                <Text style={{color: 'white'}}>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={style.content}>
                            <Text style={{fontWeight: 'bold'}}>{question}</Text>
                            <TextInput
                            style={{height: 40, width: '90%', borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.handleAnswerChange(text)}
                            placeholder={'blue'}
                            value={this.state.answer}
                            />
                            {this.state.shouldShowAnswer === true
                                ?
                                <Text>Answer: {answer}</Text>
                                :
                                null
                            }
                            <TouchableOpacity onPress={() => this.handleAnswerQuestion()} style={[style.button, {backgroundColor: 'green'}]}>
                                <Text style={{color: 'white'}}>Submit Answer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleShowAnswer()} style={[style.button, {backgroundColor: 'blue'}]}>
                                <Text style={{color: 'white'}}>Show Answer</Text>
                            </TouchableOpacity>
                        </View>
                    }
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (decks) => {
    return {
        decks,
    }
}

export default connect(mapStateToProps)(Quiz)