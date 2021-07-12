import React, {useCallback, useEffect} from "react";
import Global from "./Global";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {GetWorldWipParamsType, GetWorldWipResponseType} from "../../api/api";
import { getGlobalDataTC, setDateFromAC, setDateToAC } from "../../redux/global-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    from: string
    to: string
}
type PropsTypes = RouteComponentProps<PathParamsType>

const GlobalContainer = (props: PropsTypes) => {

    const dispatch = useDispatch()
    let data = useSelector<AppRootStateType, GetWorldWipResponseType>(state => state.globalReducer.data)


    let defaultDateFrom =  props.match.params.from ? props.match.params.from : sessionStorage.countryFrom
    let defaultDateTo = props.match.params.to ? props.match.params.to : sessionStorage.countryTo
    let getDefaultParamsForGlobal = {
        from: defaultDateFrom ? defaultDateFrom : new Date('2021-06-10T21:11:54').toISOString(),
        to: defaultDateTo ? defaultDateTo : new Date('2021-07-10T21:11:54').toISOString()
    }
    useEffect(() => {
        sessionStorage.countryFrom = getDefaultParamsForGlobal.from
        sessionStorage.countryTo = getDefaultParamsForGlobal.to
        dispatch(setDateFromAC(sessionStorage.countryFrom))
        dispatch(setDateToAC(sessionStorage.countryTo))
        dispatch(getGlobalDataTC(getDefaultParamsForGlobal))
    }, [props.match.params.from, props.match.params.to])

    const setGlobalData = useCallback(function (getParams: GetWorldWipParamsType) {
        const thunk = getGlobalDataTC(getParams)
        dispatch(thunk)
    }, [])

    return <Global data={data} setGlobalData={setGlobalData}/>
}
export default withRouter(GlobalContainer)


