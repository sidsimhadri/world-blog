import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchSubmitClicked: false,
    coordinates: {lat: -1, long: -1},
    radius: -1,
};
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchSubmitClicked: (state, action) => {
            state.searchSubmitClicked = action.payload;
        },
        setSearchCoordinates: (state, action) => {
            state.coordinates = (action.payload);
        },
        setSearchRadius: (state, action) => {
            state.radius = action.payload;
        }
    },

});

export const { setSearchSubmitClicked, setSearchCoordinates, setSearchRadius } = searchSlice.actions;

export default searchSlice.reducer;
