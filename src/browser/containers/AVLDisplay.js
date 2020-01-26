import {connect} from 'react-redux';
import React, {useState} from "react";
import Canvas from "../components/Canvas";


class AVLDisplay extends React.Component {
    constructor({avl, insertMethod}) {
        super({avl, insertMethod});
        this.state = {
            width: 0,
            height: 0,
            canvas: {
                radius: 40 ,
                width: Math.pow(2, avl.height) * 40 * 5,
                height: (avl.height + 1) * 100 + (avl.height)*40,
                levelDistance: 100
            }
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }



    updateDimensions() {
        const avl = this.props.avl;
        const wp = window.innerWidth/1200;
        const hp = window.innerHeight/1200;
        const p = Math.sqrt(wp*hp);

        const levelDistance = 150 * hp;
        const radius = 40 * p;
        const width = Math.pow(2, avl.height) * radius * 5;
        const height = ((avl.height + 1) * levelDistance + (avl.height)*radius);

        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
            canvas: {
                radius,
                width,
                height,
                levelDistance
            }
        });
    }



    get value() {
        const value = document.getElementById("my-input").value;
        return parseInt(value);
    }

    render() {
        return (
            <div style={{maxHeight: (this.state.height - 70) + "px", maxWidth: this.state.width + "px", overflow: "auto"}}>
                <Canvas avl={this.props.avl} radius={this.state.canvas.radius} levelDistance={this.state.canvas.levelDistance} width={this.state.canvas.width}
                        height={this.state.canvas.height > this.state.height - 70 ? this.state.canvas.height : this.state.height - 70}/>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {avl: state.avl};
};


export default connect(mapStateToProps)(AVLDisplay);