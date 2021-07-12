import React, {useCallback, useEffect} from "react";
import Countries from "./Countries";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {GetCountryDataResponseItemType, GetDataByCountryType, GetWorldWipParamsType} from "../../api/api";
import {getDataByCountryTC, setCountryAC} from "../../redux/country-reducer";
import {RouteComponentProps, withRouter } from "react-router-dom";

type PathParamsType = {
    country: string
    date: string
}
type PropsTypes = RouteComponentProps<PathParamsType>

const CountriesContainer = (props: PropsTypes) => {

    const dispatch = useDispatch()
    const data = useSelector<AppRootStateType, Array<GetCountryDataResponseItemType>>(state => state.countriesReducer.data)
    const defaultDateFrom = props.match.params.date ? props.match.params.date : new Date('2021-06-18T21:11:54').toISOString()
    const defaultCountry = props.match.params.country ?  props.match.params.country : sessionStorage.country

    const getDefaultParamsForCountry = {
        country: defaultCountry ? defaultCountry : "ukraine",
        date: defaultDateFrom ? defaultDateFrom : new Date('2021-06-18T21:11:54').toISOString()
    }
    const country = useSelector<AppRootStateType, string>(state => state.countriesReducer.country)
    useEffect(() => {
        dispatch(setCountryAC(getDefaultParamsForCountry.country))
        dispatch(getDataByCountryTC(getDefaultParamsForCountry))
    }, [country, props.match.params.date, sessionStorage.country])

    const setDataByCountry = useCallback(function (getParams: GetDataByCountryType) {
        const thunk = getDataByCountryTC(getParams)
        dispatch(thunk)
    }, [])
    return <div>
       <Countries data={data} country={country} setDataByCountry={setDataByCountry}/>
    </div>
}
export default withRouter(CountriesContainer)
