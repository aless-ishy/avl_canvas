import {connect} from 'react-redux';
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Canvas from "../components/Canvas";
import {insertNode} from "../actions";
import {TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";


class AVLDisplay extends React.Component{
    constructor({avl, insertMethod}) {
        super({avl, insertMethod});
    }

    get value(){
        const value = document.getElementById("my-input").value;
        return parseInt(value);
    }

    render() {
        return (
            <div>
                <Canvas avl={this.props.avl} radius={40} levelDistance={100} width={1280} height={600}/>
            </div>
        );
    }
}




const mapStateToProps = state => {
    return {avl: state.avl};
};



export default connect(mapStateToProps)(AVLDisplay);