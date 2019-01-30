import { AsyncStorage } from 'react-native'

export async function fetchAllDecks() {
    try {
        return await AsyncStoratge.getItem('decks')
    } catch(error) {
        return error
    }
}





/*

deck object structure:

{
  "deck1": {
    "questions": [
      {
        "questionText": "What is 2+2",
        "answerText": 4
      },
      {
        "questionText": "What is the capital of Texas",
        "answerText": "Austin"
      }
    ]
  },
  "deck2": {
    "questions": [
      {
        "questionText": "What is 2+2",
        "answerText": 4
      },
      {
        "questionText": "What is the capital of Texas",
        "answerText": "Austin"
      }
    ]
  }
}

 */