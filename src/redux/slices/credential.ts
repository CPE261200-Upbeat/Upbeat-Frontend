import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import { Credential } from "model/credential.ts";


const initialState: Credential = {
    username: '',
    password: '',
};

export const credentialSlice = createSlice({
    name: 'credential',
    initialState,
    reducers: {
        setCredential: (state, action: PayloadAction<Credential>) => {
            state = action.payload;
        },
    },
});

export const {setCredential} = credentialSlice.actions;
export default credentialSlice.reducer;
export const selectCredential = (state: RootState) => state.credential;