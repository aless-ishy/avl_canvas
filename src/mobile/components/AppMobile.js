import React from "react";
import AVLDisplay from "../containers/AVLDisplay";
import Header from "./Header";

class AppMobile extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <AVLDisplay/>
            </div>
        )
    }
}

export default AppMobile;