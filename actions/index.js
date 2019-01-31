import { RECEIVE_DECKS, ADD_CARD, ADD_DECK } from "./types";


export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addCard (card) {
    return {
        type: ADD_CARD,
        card
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}
