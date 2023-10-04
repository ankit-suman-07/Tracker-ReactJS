import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isAuth: false,
        username: "",

        object: {
            items: [],
            amounts: [],
            category: [],
            date: [],
            total: 0,
        }
    }
}

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action) => {

            return {
                value: {
                    isAuth: true,
                    username: action.payload.username,
                }
            }
        },
        addData: (state, action) => {
            const { expense, cost, category, date, total } = action.payload;
            return {
                ...state,
                value: {
                    ...state.value,
                    object: {
                        items: expense,
                        amounts: cost,
                        category: category,
                        date: date,
                        total: total,
                    }
                }
            };
        }

    }
})

export const { logIn, logOut, addData, username } = auth.actions;
export default auth.reducer;