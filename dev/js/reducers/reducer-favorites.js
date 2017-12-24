export default function (state = {}, action) {
    switch (action.type) {
        case 'ADD_FAVORITE':
            const launch = action.payload;
            state[launch.id] = launch;
            return { ...state };
        case 'REMOVE_FAVORITE':
            const id = action.payload;
            delete state[id];
            return { ...state };
        default:
            return state;
    }
}
