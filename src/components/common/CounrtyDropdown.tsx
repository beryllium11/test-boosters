import React, {useState} from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import {useDispatch, useSelector} from "react-redux";
import {setCountryAC} from '../../redux/country-reducer';
import {AppRootStateType} from "../../redux/store";
import {RouteComponentProps, useHistory, withRouter} from "react-router-dom";

type PathParamsType = {
    country: string
    date: string
}
type PropsTypes = RouteComponentProps<PathParamsType>

const CountryDropdownModule = (props: PropsTypes) => {

    const dispatch = useDispatch()
    const date = useSelector<AppRootStateType, string>(state => state.countriesReducer.date)
    const history = useHistory()
    const startCountry =  props.match.params.country ? props.match.params.country : "ukraine"
    const [country, setCountry] = useState(startCountry)
    const selectCountry = (val: string) => {
        setCountry(val)
        sessionStorage.country = val
        props.match.params.country = val
        dispatch(setCountryAC(val))
        history.push(`/country/${val}/date/${date}`)
    }

    return (
        <div>
            <CountryDropdown
                value={country}
                onChange={(val) => selectCountry(val)} />
        </div>
    );
}
export default withRouter(CountryDropdownModule)
