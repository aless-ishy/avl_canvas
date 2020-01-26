import React from 'react';

class Canvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate(prevProps) {
        this.updateCanvas();
    }


    drawNode(ctx, px = this.props.height * 0.5, py = 100, radius = this.props.radius) {
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, 2 * Math.PI, true);
        ctx.stroke();
    }

    writeInfo(ctx, balanceFactor, value, px, py, radius = this.props.radius) {
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        ctx.fillText(value, px, py);

        ctx.fillText(balanceFactor, px - Math.sqrt(2) * 0.5 * radius - 0.3 * radius, py - Math.sqrt(2) * 0.5 * radius);


    }

    drawLink(ctx, p0x, p0y, p1x, p1y, radius = this.props.radius) {
        ctx.beginPath();
        ctx.moveTo(p0x, p0y + radius);
        ctx.lineTo(p1x, p1y - radius);
        ctx.stroke();
    }

    drawTree(ctx, tree, px, py, level, levelDistance = this.props.levelDistance, radius = this.props.radius, w = this.props.width*0.5) {
        this.drawNode(ctx, px, py, radius);
        this.writeInfo(ctx, tree.balanceFactor, tree.value, px, py);

        if(tree.left != null ){
            let p1x = px - w*Math.pow(2,-(level+1));
            let p1y = py + levelDistance;

            this.drawTree(ctx, tree.left, p1x, p1y, level + 1 );
            this.drawLink(ctx, px, py, p1x, p1y);
        }

        if(tree.right != null){
            let p1x = px + w*Math.pow(2,-(level+1));
            let p1y = py + levelDistance;

            this.drawTree(ctx, tree.right, p1x, p1y, level + 1 );
            this.drawLink(ctx, px, py, p1x, p1y);
        }
    }

    updateCanvas() {
        const tree = this.props.avl;
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0,this.props.width, this.props.height);

        if(tree != null)
            this.drawTree(ctx, tree, this.props.width*0.5, this.props.radius*2, 1);

    }

    render() {
        return (
            <div align={"center"}>
                <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
            </div>
        );
    }
}

export default Canvas