import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import {style} from "../components/styles";
import { connect } from 'react-redux'
import { addCard } from "../actions";
import { scheduleNotification } from "../util/notification";

class Quiz extends React.Component {
    state = ({
        correctAnswers: 0,
        currentQuestion: 0,
        shouldEnd: false,
        shouldShowAnswer: false,
        questions: this.props.decks[this.props.navigation.getParam('key')].questions,
        answer: '',
    });

    static navigationOptions = {
        title: 'Pop Quiz!',
    };

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

    handleAnswerQuestion = (correct) => {
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

            if (this.state.correctAnswers + 1 < this.state.questions.length) {
                Alert.alert('You need to study.', 'Keep studying until you can get all the answers right! We will remind you tomorrow to study.');
                scheduleNotification()
            }
        }

        if (this.state.answer === this.state.questions[this.state.currentQuestion].answer || correct) {
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
                        {this.state.shouldShowAnswer ?
                            <View style={{flex: 1, flexDirection: 'row',}}>
                                <TouchableOpacity onPress={() => this.handleAnswerQuestion(true)} style={[style.button, {backgroundColor: 'green'}]}>
                                    <Text style={{color: 'white'}}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleAnswerQuestion(false)} style={[style.button, {backgroundColor: 'red'}]}>
                                    <Text style={{color: 'white'}}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null}
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