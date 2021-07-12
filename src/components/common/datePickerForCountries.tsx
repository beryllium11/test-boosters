import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {getDataByCountryTC, setDateAC} from "../../redux/country-reducer";
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom';

type PathParamsType = {
    country: string
    date: string
}
type PropsTypes = RouteComponentProps<PathParamsType>


const DatePickerForCountries = (props: PropsTypes) => {

    const cutedDate = props.match.params.date.slice(0,19)
    const urlDate = new Date(cutedDate)
    const startDate = urlDate ? urlDate : new Date('2021-05-18T21:11:54')

    const history = useHistory()

    const [selectedFromDate, setSelectedFromDate] = React.useState<Date | null>(startDate);

    const dispatch = useDispatch()
    const country = useSelector<AppRootStateType, string>(state => state.countriesReducer.country)


    const handleDateFromChange = (date: Date | null) => {
            setSelectedFromDate(date)

        if (date) {
            props.match.params.date = date?.toISOString()
            console.log(props.match.params.date)
            let newDate = date.toISOString()
            dispatch(setDateAC(newDate))
            history.push(`/country/${country}/date/${newDate}`)
        }
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date from"
                    value={selectedFromDate}
                    onChange={handleDateFromChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
export default withRouter(DatePickerForCountries)
