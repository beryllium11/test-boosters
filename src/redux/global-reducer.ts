import {Dispatch} from 'redux'
import {GetWorldWipParamsType, GetWorldWipResponseType, WorldWipAPI} from '../api/api'

type InitialStateType = {
    data: GetWorldWipResponseType
    from: string
    to: string
}
const initialState = {
    data: [],
    from: '2021-06-18T21:11:54',
    to: '2021-07-11T21:11:54'
}

export const globalReducer  = (state: InitialStateType = initialState, action: ActionsGlobalType): InitialStateType => {
    switch (action.type) {
        case "GET_GLOBAL_DATA_ALL": {
            let newData = [...action.data].sort((a, b) => {
                if (a.Date < b.Date) {return -1}
                if (a.Date > b.Date) {return 1}
                return 0
            } ).map((nd) => {
                return {...nd, Date: nd.Date.slice(0, 10) }
            })
            console.log(newData)
            return {...state, data: [...newData]}
        }
        case "SET_DATE_FROM": {
            return {...state, from: action.dateFrom}
        }
        case "SET_DATE_TO": {
            return {...state, to: action.dateTo}
        }
    }
    return state
}
const getGlobalDataAC = (data: GetWorldWipResponseType) => ({type: "GET_GLOBAL_DATA_ALL", data} as const)
export const setDateFromAC = (dateFrom: string) => ({type: "SET_DATE_FROM", dateFrom} as const)
export const setDateToAC = (dateTo: string) => ({type: "SET_DATE_TO", dateTo} as const)

type GetGlobalDataActionType = ReturnType<typeof getGlobalDataAC>
type SetDateFromActionType = ReturnType<typeof setDateFromAC>
type SetDateToActionType = ReturnType<typeof setDateToAC>
export type ActionsGlobalType = GetGlobalDataActionType | SetDateFromActionType | SetDateToActionType

export const getGlobalDataTC = (getParams: GetWorldWipParamsType) => (dispatch: Dispatch) => {
    WorldWipAPI.getWorldWip(getParams).then(res => {
        dispatch(getGlobalDataAC(res.data))
    })
}
