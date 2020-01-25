import {connect} from 'react-redux';
import React, {useState} from "react";
import Canvas from "../components/Canvas";


class AVLDisplay extends React.Component{
    constructor({avl, insertMethod}) {
        super({avl, insertMethod});
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    avlHeightToWindowHeight(){
        const avlHeight = this.props.avl.height;
    }

    get value(){
        const value = document.getElementById("my-input").value;
        return parseInt(value);
    }

    render() {
        return (
            <div>
                <Canvas avl={this.props.avl} radius={40} levelDistance={100} width={this.state.width} height={600}/>
            </div>
        );
    }
}




const mapStateToProps = state => {
    return {avl: state.avl};
};



export default connect(mapStateToProps)(AVLDisplay);