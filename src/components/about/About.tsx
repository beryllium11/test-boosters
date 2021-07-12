import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    paragraph: {
        fontSize: 18,
        textAlign: 'left'
    },
});
const About = () => {
    const classes = useStyles()
    return <div>
        <h1>About</h1>
        <p className={classes.paragraph}>This SPA allows you to track the statistics of COVID19 incidence in real time.</p>
        <p className={classes.paragraph}>In the "Global" tab you can see all live cases by case type over the world between given dates.</p>
        <p className={classes.paragraph}>In the "Countries" tab you can see all live cases by case type for a country after a given date.</p>
    </div>
}
export default About
