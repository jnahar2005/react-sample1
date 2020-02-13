import {CATEGORY_LIST} from '../actions/actionTypes';
const initState = []

//Define Actions
const characterReducer = (state = initState, action) => {
    switch (action.type) {
        case CATEGORY_LIST:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state
    }
}

export default characterReducer;