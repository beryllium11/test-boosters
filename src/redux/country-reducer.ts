import {Dispatch} from 'redux'
import {
    CountriesAPI, GetCountryDataResponseItemType,
    GetCountryDataResponseType, GetDataByCountryType
} from '../api/api'

type InitialStateType = {
    data: Array<GetCountryDataResponseItemType>
    date: string
    country: string
}

const initialState: InitialStateType = {
    data: [],
    date: new Date('2021-06-18T21:11:54').toISOString(),
    country: 'ukraine'
}

export const countriesReducer  = (state: InitialStateType = initialState, action: ActionsGlobalType): InitialStateType => {
    switch (action.type) {
        case "GET_DATA_BY_COUNTRY": {
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
        case "SET_COUNTRY": {
            return {...state, country: action.country}
        }
        case "SET_DATE": {
            return {...state, date: action.date}
        }
    }
    return state
}
export const setDataByCountryAC = (data: GetCountryDataResponseType) => ({type: "GET_DATA_BY_COUNTRY", data} as const)
export const setDateAC = (date: string) => ({type: "SET_DATE", date} as const)
export const setCountryAC = (country: string) => ({type: "SET_COUNTRY", country} as const)

type GetDataByCountryActionType = ReturnType<typeof setDataByCountryAC>
type SetDateActionType = ReturnType<typeof setDateAC>
type SetCountryActionType = ReturnType<typeof setCountryAC>
export type ActionsGlobalType = GetDataByCountryActionType | SetDateActionType | SetCountryActionType

export const getDataByCountryTC = (getParams: GetDataByCountryType) => (dispatch: Dispatch) => {
    CountriesAPI.getDataByCountry(getParams).then(res => {
        dispatch(setDataByCountryAC(res.data))
        }
    )
}
