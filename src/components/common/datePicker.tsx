import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import {useDispatch} from "react-redux";
import { getGlobalDataTC } from '../../redux/global-reducer';
import { useHistory } from 'react-router-dom';


export default function DatePicker() {
    // The first commit of Material-UI
    const currentDateFrom = sessionStorage.countryFrom ? new Date(sessionStorage.countryFrom) : new Date('2021-05-18T21:11:54')
    const currentDateTo = sessionStorage.countryTo ? new Date(sessionStorage.countryTo) : new Date('2021-06-18T21:11:54')
    const [selectedFromDate, setSelectedFromDate] = React.useState<Date | null>(currentDateFrom);
    const [selectedToDate, setSelectedToDate] = React.useState<Date | null>(currentDateTo)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDateFromChange = (date: Date | null) => {
        setSelectedFromDate(date);

    };
    const handleDateToChange = (date: Date | null) => {
        setSelectedToDate(date);
    };
    const setDataHandler = () => {
        let getParamsForGlobal = {
            from: selectedFromDate?.toISOString(),
            to: selectedToDate?.toISOString()
        }
        if  (selectedFromDate && selectedToDate) {
            sessionStorage.countryFrom = getParamsForGlobal.from
            sessionStorage.countryTo = getParamsForGlobal.to
            selectedFromDate > selectedToDate ? alert('please, choose correct date') : history.push(`/global/from/${sessionStorage.countryFrom}/to/${sessionStorage.countryTo}`)
        }
    }

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
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date to"
                    format="MM/dd/yyyy"
                    value={selectedToDate}
                    onChange={handleDateToChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <Button onClick={setDataHandler} variant="contained" color="primary">Draw chart</Button>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
