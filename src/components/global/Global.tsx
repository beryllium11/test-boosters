import React, {useState} from "react";
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend, LineChart } from 'recharts';
import DatePicker from "../common/datePicker";
import {GetWorldWipParamsType, GetWorldWipResponseType} from "../../api/api";
import Button from "@material-ui/core/Button";

type PropsType = {
    data: GetWorldWipResponseType
    setGlobalData: (getParams: GetWorldWipParamsType) => void
}

const Global = React.memo(function ({...props}: PropsType) {

    const [newCases, setNewCases] = useState(true)
    const [totalCases, setTotalCases] = useState(false)

    const newCasesHandler = () => {
        setNewCases(true)
        setTotalCases(false)
    }
    const totalCasesHandler = () => {
        setNewCases(false)
        setTotalCases(true)
    }

    return (
        <div>
            <DatePicker/>
            <div>
                <p>Filter</p>
                <Button variant="outlined" style={{marginRight: 15}} onClick={newCasesHandler}>Show new cases</Button>
                <Button variant="outlined" onClick={totalCasesHandler}>Show total cases</Button>
            </div>
            <LineChart
                width={1000}
                height={600}
                data={props.data}

                margin={{
                    top: 100,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {newCases ? <Line connectNulls type="monotone" dataKey="NewConfirmed" stroke="#8884d8" /> : false}
                {newCases ? <Line connectNulls type="monotone" dataKey="NewDeaths" stroke="#ffc658" /> : false}
                {newCases ? <Line connectNulls type="monotone" dataKey="NewRecovered" stroke="#62d07f" /> : false}
                {totalCases ? <Line connectNulls type="monotone" dataKey="TotalConfirmed" stroke="#82ca9d" /> : false}
                {totalCases ? <Line connectNulls type="monotone" dataKey="TotalDeaths" stroke="#bf81b2" /> : false}
                {totalCases ? <Line connectNulls type="monotone" dataKey="TotalRecovered" stroke="#62d07f" /> : false}

            </LineChart>
        </div>

    );
})
export default Global
