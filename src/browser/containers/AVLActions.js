import React from "react";
import {fade, InputBase, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

import DeviceHubSharpIcon from '@material-ui/icons/DeviceHubSharp';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';


import IconButton from "@material-ui/core/IconButton";
import {deleteNode, insertNode} from "../../actions";
import {connect} from "react-redux";

const styles = (theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: '40%',
        marginLeft: '0%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
});

class AVLActions extends React.Component{
    get value(){
        return parseInt(document.getElementById("nodeValue").value)
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <DeviceHubSharpIcon />
                </div>
                <InputBase
                    id={"nodeValue"}
                    type={"number"}
                    placeholder="Valor do Nó"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => this.props.insertMethod(this.value)}
                >
                    <AddCircleOutlineSharpIcon />
                </IconButton>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => this.props.deleteMethod(this.value)}
                >
                    <RemoveCircleOutlineSharpIcon/>
                </IconButton>

            </div>
        );
    }
}

AVLActions.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => ({
    insertMethod: value => dispatch(insertNode(value)),
    deleteMethod: value => dispatch(deleteNode(value))
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AVLActions));