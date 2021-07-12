import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import GlobalContainer from '../global/GlobalContainer';
import {Routes} from '../router/Routes';
import { NavLink } from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `100%`,
            marginLeft: 0,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            top: `65px`
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

export default function CovidSidebar() {
    const classes = useStyles();
    const country = useSelector<AppRootStateType, string>(state => state.countriesReducer.country)
    const date = useSelector<AppRootStateType, string>(state => state.countriesReducer.date)
    const dateFrom = useSelector<AppRootStateType, string>(state => state.globalReducer.from)
    const dateTo = useSelector<AppRootStateType, string>(state => state.globalReducer.to)


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        COVID19 Info
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >

                <List>
                    <ListItem button>
                        <NavLink to={"/global/from/"+dateFrom+"/to/"+dateTo}>Global</NavLink>
                    </ListItem>
                    <ListItem button>
                        <NavLink to={"/country/"+country+"/date/"+date}>Countries</NavLink>
                    </ListItem>
                    <ListItem button>
                        <NavLink to={"/about"}>About</NavLink>
                    </ListItem>
                </List>
            </Drawer>
            <Routes/>
        </div>

    );
}
