import {combineReducers} from 'redux';
import category from './Category.reducer';

//Combine all the sub reducers
const rootReducer = combineReducers({
   category: category,
})

export default rootReducer