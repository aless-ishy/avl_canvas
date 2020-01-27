import React from 'react';
import {fade, InputBase, withStyles} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MenuIcon from '@material-ui/icons/Menu';
import DeviceHubSharpIcon from '@material-ui/icons/DeviceHubSharp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import MoreIcon from '@material-ui/icons/MoreVert';
import {deleteNode, insertNode} from "../../actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const styles =  (theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    deviceHubSharpIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class Header  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            isMenuOpen: false,
            isMobileMenuOpen: false
        };

        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
        this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    }

    get value(){
        return parseInt(document.getElementById("nodeValue").value)
    }

    handleProfileMenuOpen (event){
        this.setState({anchorEl: event.currentTarget, isMenuOpen: true});
    };

    handleMobileMenuClose(){
        this.setState({mobileMoreAnchorEl: null, isMobileMenuOpen: false});
    };

    handleMenuClose(){
        this.setState({anchorEl: null, isMenuOpen: false});
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen(event){
        this.setState({mobileMoreAnchorEl: event.currentTarget, isMobileMenuOpen: true});
    };

    render() {
        const {classes} = this.props;

        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={this.state.isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
        );

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={this.state.isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={() => this.props.insertMethod(this.value)}>
                    <IconButton aria-label="show 4 new mails" color="inherit" >
                        <AddCircleOutlineSharpIcon/>
                    </IconButton>
                    <p>Inserir</p>
                </MenuItem>
                <MenuItem onClick={() => this.props.deleteMethod(this.value)}>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <RemoveCircleOutlineSharpIcon/>
                    </IconButton>
                    <p>Deletar</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            AVL
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.deviceHubSharpIcon}>
                                <DeviceHubSharpIcon/>
                            </div>
                            <InputBase
                                placeholder="Valor do Nó"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                                id={"nodeValue"}
                            />
                        </div>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => this.props.insertMethod(this.value)}>
                                <AddCircleOutlineSharpIcon/>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={() => this.props.deleteMethod(this.value)}>
                                <RemoveCircleOutlineSharpIcon/>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => ({
    insertMethod: value => dispatch(insertNode(value)),
    deleteMethod: value => dispatch(deleteNode(value))
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));