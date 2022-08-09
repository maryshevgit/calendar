import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        selected: null,
        selectItem: [],
    },
    reducers: {
        selectModal(state, action) {
            state.selected = action.payload
        },
        addSelectItem(state, action) {
            const findItem = state.selectItem.find(item => item.select === action.payload.select)

            if(findItem){
                state.selectItem = state.selectItem.filter(item => item.select !== action.payload.select)
                state.selectItem.push({
                    ...action.payload,
                    info: true
                })
            }else{
                state.selectItem.push(action.payload)
            }
        },
        updateItem(state, action) {
            const findItem = state.selectItem.find(item => item.select === action.payload)
            
            if (findItem) {
                state.selectItem = state.selectItem.filter(item => item.select !== action.payload)
                state.selectItem.push({
                    ...findItem,
                    info: false
                })
            }
        },
        deleteItem(state, action){
            state.selectItem = state.selectItem.filter(item => item.select !== action.payload)
        },
    }
})

export const {selectModal, addSelectItem, deleteItem, updateItem } = modalSlice.actions

export default modalSlice.reducer;