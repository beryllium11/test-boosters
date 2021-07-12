import React, {useState} from "react";
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart, LineChart} from 'recharts';
import CountryDropdownModule from "../common/CounrtyDropdown";
import {GetCountryDataResponseItemType, GetDataByCountryType} from "../../api/api";
import DatePickerForCountries from "../common/datePickerForCountries";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

type PropsType = {
    setDataByCountry: (getParams: GetDataByCountryType) => void
    data: Array<GetCountryDataResponseItemType>
    country: string
}
const useStyles = makeStyles({
    buttonCase: {
        marginRight: 15
    },
});

const Countries = React.memo(function ({...props}: PropsType) {
    const classes = useStyles()
    const [confirmed, setConfirmed] = useState(true)
    const [recovered, setRecovered] = useState(true)
    const [deaths, setDeaths] = useState(true)
    const [active, setActive] = useState(true)

    const confirmedHandler = () => {
        setConfirmed(true)
        setRecovered(false)
        setDeaths(false)
        setActive(false)
    }
    const recoveredHandler = () => {
        setConfirmed(false)
        setRecovered(true)
        setDeaths(false)
        setActive(false)
    }
    const deathHandler = () => {
        setConfirmed(false)
        setRecovered(false)
        setDeaths(true)
        setActive(false)
    }
    const activesHandler = () => {
        setConfirmed(false)
        setRecovered(false)
        setDeaths(false)
        setActive(true)
    }
    const allHandler = () => {
        setConfirmed(true)
        setRecovered(true)
        setDeaths(true)
        setActive(true)
    }
    //debugger
    return <div>
        <CountryDropdownModule/>
        <DatePickerForCountries/>
        <Box component="h3" m={1}>
            {props.country}
        </Box>
        <div>
            <p>Filter</p>
            <Button variant="outlined" className={classes.buttonCase} onClick={confirmedHandler}>Show confirmed</Button>
            <Button variant="outlined" className={classes.buttonCase} onClick={recoveredHandler}>Show recovered</Button>
            <Button variant="outlined" className={classes.buttonCase} onClick={deathHandler}>Show deaths</Button>
            <Button variant="outlined" className={classes.buttonCase} onClick={activesHandler}>Show actives</Button>
            <Button variant="outlined" className={classes.buttonCase} onClick={allHandler}>Show all cases</Button>
        </div>
        <BarChart
            width={1000}
            height={600}
            data={props.data}
            margin={{
                top: 100,
                right: 30,
                left: 0,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Province" stackId="a" fill="#b4d9f3de"/>
            {confirmed ? <Bar dataKey="Confirmed" stackId="a" fill="#888480"/> : false}
            {recovered ? <Bar dataKey="Recovered" stackId="a" fill="#82ca9d"/> : false}
            {deaths ? <Bar dataKey="Deaths" stackId="a" fill="#82ca11"/> : false}
            {active ? <Bar dataKey="Active" stackId="a" fill="#8884d8"/> : false}
        </BarChart>
    </div>
})
export default Countries
