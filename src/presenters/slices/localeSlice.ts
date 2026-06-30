import { createSlice, type PayloadAction} from '@reduxjs/toolkit'


interface LanguageState {
    language: 'VIE' | 'ENG';
}


const initialState: LanguageState = {
    language: 'VIE'
}


const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<'VIE' | 'ENG'>) {
            state.language = action.payload
        }
    }
})

export const {setLanguage} = localeSlice.actions
export default localeSlice.reducer