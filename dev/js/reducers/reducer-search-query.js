/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

const filterCountryCode = (a, b) => {
    if (a.location.countryCode < b.location.countryCode) return -1;
    if (a.location.countryCode > b.location.countryCode) return 1;
    return 0;
};

const filterRocketAssoc = (a, b) => {
    if (a.rocket.agencies.length === 0 && b.rocket.agencies.length === 0) return 0;
    if (a.rocket.agencies.length > 0 && b.rocket.agencies.length === 0) return -1;
    if (a.rocket.agencies.length === 0 && b.rocket.agencies.length > 0) return 1;
    if (a.rocket.agencies[0].abbrev < b.rocket.agencies[0].abbrev) return -1;
    if (a.rocket.agencies[0].abbrev > b.rocket.agencies[0].abbrev) return 1;
    return 0;
};

export default function (state = null, action) {
    const id = action.payload;
    const launches = state;
    switch (action.type) {
        case 'GET_QUERY_SUCCESS': {
            return action.response.data.launches;
        }
        case 'COLOR_HEART': {
            const launchesWithFavs = launches.map(launch => {
                if (launch.id === id) {
                    launch.favorite = true;
                }
                return launch;
            });
            return launchesWithFavs;
        }
        case 'BORDER_HEART': {
            const launchesLessFavs = launches.map(launch => {
                if (launch.id === id) {
                    launch.favorite = false;
                }
                return launch;
            });
            return launchesLessFavs;
        }
        case 'FILTER_BY_COUNTRY_CODE': {
            let contryCode = [];
            contryCode = launches.sort(filterCountryCode);
            return contryCode;
        }
        case 'FILTER_BY_COUNTRY_ASSOC': {
            let contryAssoc = [];
            contryAssoc = launches.sort(filterRocketAssoc);
            return contryAssoc;
        }
        default: {
            return state;
        }
    }
}

