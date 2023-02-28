import { v4 as uuidv4 } from 'uuid';
import { ADD_ITEM, DELETE_ITEM } from "../actionTypes";

const intialState = {
    users: []
}

export const userReducer = (state = intialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            const newUser = action.payload;
            newUser.id = uuidv4();
            state.users.push(newUser);  // FIXME: the bug is here... Uncaught TypeError: Cannot add property 2, object is not extensible at Array.push (<anonymous>)
            console.log('\n [userReducer] User added successfully...!')
            return { ...state }
        case DELETE_ITEM:
            const remainingUsers = state.users.filter(user => user.id !== action.payload.userId);
            state.users.push({ ...remainingUsers });    // FIXME: the bug is here... Uncaught TypeError: Cannot add property 2, object is not extensible at Array.push (<anonymous>)
            console.log('\n [userReducer] User deleted successfully...!')
            return { ...state }
        default:
            return state;
    }
}