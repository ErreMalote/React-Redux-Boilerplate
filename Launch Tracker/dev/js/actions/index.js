import axios from 'axios';

export const selectTab = (event, tab) => ({
        type: 'TAB_SELECTED',
        payload: tab,
    });

export const sendQuery = (startDate, endDate) => {
    const url = `https://launchlibrary.net/1.2/launch?startdate=${startDate}&enddate=${endDate}&mode=verbose`;
    return dispatch => {
        axios
        .get(url)
            .then(
                response => {
                    dispatch({ type: 'GET_QUERY_SUCCESS', response });
                },
                error => {
                    // Reducers may handle this to reset isFetching
                    dispatch({ type: 'GET_USER_FAILURE', error });
                    // Rethrow so returned Promise is rejected
                    throw error;
                },
            );
        };
};
export const addFavorite = (launch) => ({
        type: 'ADD_FAVORITE',
        payload: launch,
    });
export const colorHeart = (id) => ({
        type: 'COLOR_HEART',
        payload: id,
    });
export const borderHeart = (id) => ({
        type: 'BORDER_HEART',
        payload: id,
    });
export const removeFavorite = (id) => ({
        type: 'REMOVE_FAVORITE',
        payload: id,
    });

export const filterByCountry = () => ({
        type: 'FILTER_BY_COUNTRY_CODE',
    });

export const filterByRocketASSOC = () => ({
        type: 'FILTER_BY_COUNTRY_ASSOC',
    });

