import { user } from "./main-actions";

const initMainState = {
    navbarToggle: false,
    name: ''
};
export function main(state = initMainState, action) {
    switch (action.type) {
        case '@MAIN/TOGGLE_NAVBAR':
            return {
                ...state,
                navbarToggle: !state.navbarToggle
            };
        case '@MAIN/USER_NAME':
            return {
                ...state,
                name: action.name
            };
        default:
            return state;
    }
}
