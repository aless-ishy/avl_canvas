import {combineReducers} from 'redux';
import {INSERT, DELETE} from "../actions";
import Tree from "../util/Tree";

function changeAVL(state = null, action) {
    switch (action.type) {
        case INSERT:
            if(isNaN(action.value))
                return state;
            else if (state === null)
                return new Tree(action.value);
            else{
                let clone = Tree.clone(state);
                clone.insert(action.value);
                clone = clone.getHeader();
                return clone;
            }
        case DELETE:
            if(isNaN(action.value) || state === null)
            return state;
            else{
                let clone = Tree.clone(state);
                let header = clone;

                if(action.value === clone.value)
                    if(clone.numberOfChildren === 0)
                        return null;
                    else
                        if(clone.left != null)
                            header = clone.left;
                        else
                            header = clone.right;

                clone.searchAndDelete(action.value);

                return header.getHeader();
            }

        default:
            return state;

    }
}

function name(state = '', action){
    return state;
}

const avlApp = combineReducers({avl: changeAVL, name});

export default avlApp;