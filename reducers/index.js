import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions/types";

function decks (state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            console.log('CALLED RECEIVE DECKS', action)
            return {
                ...state, ...action.decks
            };
        case ADD_CARD:
            console.log('CALLED ADD CARD', action)
            return {
                ...state,
                [action.card.title]: {
                    title: action.card.title,
                    questions: [
                        ...state[action.card.title].questions,
                        ...action.card.questions
                    ]
                }
            };
        case ADD_DECK:
            console.log('CALLED ADD DECK', action)
            return {
                ...state, ...action.deck
            };

        default:
            return state
    }


}

export default decks