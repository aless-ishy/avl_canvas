export const RIGHT = 0;
export const LEFT = 1;

class Tree {
    parent = null;
    left = null;
    right = null;
    height = 0;

    constructor(value) {
        this.value = value;
    }

    get balanceFactor() {
        const leftHeight = this.left == null ? -1 : this.left.height;
        const rightHeight = this.right == null ? -1 : this.right.height;

        return rightHeight - leftHeight;
    }

    get numberOfChildren() {
        let number = 0;

        if (this.left != null)
            number++;
        if (this.right != null)
            number++;

        return number;
    }

    get greaterFromLeft() {
        let greater = this.left;
        while (greater.right != null)
            greater = greater.right;
        return greater;
    }

    changeParent(parent) {
        if (this.parent != null) {
            const exParent = this.parent;
            if (this.value > exParent.value)
                exParent.right = null;
            else
                exParent.left = null
        }

        this.parent = parent;

        if (parent != null)
            if (this.value > parent.value)
                parent.right = this;
            else
                parent.left = this;
    }

    insert(value) {
        if (value < this.value) {
            if (this.left != null)
                this.left.insert(value);
            else {
                this.left = new Tree(value);
                this.left.parent = this;
            }
        } else if (value > this.value) {
            if (this.right != null)
                this.right.insert(value);
            else {
                this.right = new Tree(value);
                this.right.parent = this;
            }
        }

        this.updateHeight();

        this.treatBalance();
    }

    searchAndDelete(value) {
        if (value < this.value) {
            if (this.left != null)
                this.left.searchAndDelete(value);
        } else if (value > this.value) {
            if (this.right != null)
                this.right.searchAndDelete(value);
        } else
            this.delete();

        this.updateHeight();

        this.treatBalance();
    }


    delete() {
        let substitute;
        let previousParent;
        switch (this.numberOfChildren) {
            case 0:
                if (this.value > this.parent.value)
                    this.parent.right = null;
                else
                    this.parent.left = null;
                break;
            case 1:
                substitute = this.left != null ? this.left : this.right;
                substitute.changeParent(this.parent);
                break;
            case 2:
                substitute = this.greaterFromLeft;
                previousParent = substitute.parent;
                substitute.delete();

                substitute.changeParent(this.parent);

                if (this.left != null)
                    this.left.changeParent(substitute);
                if (this.right != null)
                    this.right.changeParent(substitute);

                previousParent.updateHeight();

                previousParent.treatBalance();

                break;
            default:
                return;
        }
        this.parent = null;
        if (substitute != null)
            substitute.treatBalance();
    }


    treatBalance() {
        const balance = this.balanceFactor;

        if (balance > 1) {
            if (this.right.balanceFactor < 0)
                this.right.rotation(LEFT);
            this.rotation(RIGHT);
        } else if (balance < -1) {
            if (this.left.balanceFactor > 0)
                this.left.rotation(RIGHT);
            this.rotation(LEFT);
        }

        if (this.parent != null)
            this.parent.updateHeight();
    }

    // leftRotation() {
    //     if (this.left == null)
    //         return;
    //
    //     const leftNode = this.left;
    //     let beta = this.right;
    //
    //     if (this.parent == null)
    //         leftNode.parent = null;
    //     else if (this.parent.left === this)
    //         this.parent.left = leftNode;
    //     else
    //         this.parent.right = leftNode;
    //
    //     leftNode.right = this;
    //     this.parent = leftNode;
    //
    //     this.left = beta;
    //     if(beta != null)
    //         beta.parent = this;
    // }
    //
    //
    //
    //
    // rightRotation(){
    //     if (this.right == null)
    //         return;
    //
    //     const rightNode = this.right;
    //     let beta = this.left;
    //
    //     if (this.parent == null)
    //         rightNode.parent = null;
    //     else if (this.parent.left === this)
    //         this.parent.left = rightNode;
    //     else
    //         this.parent.right = rightNode;
    //
    //     rightNode.left = this;
    //     this.parent = rightNode;
    //
    //     this.right = beta;
    //     if(beta != null)
    //         beta.parent = this;
    // }

    rotation(direction) {
        direction = direction === LEFT ? RIGHT : LEFT;
        const alpha = direction === LEFT ? this.right : this.left;
        const beta = direction === LEFT ? alpha.left : alpha.right;

        if (this.parent == null)
            alpha.parent = null;
        else if (this.parent.left === this)
            this.parent.left = alpha;
        else
            this.parent.right = alpha;

        if (direction === LEFT) {
            alpha.left = this;
            this.right = beta;
        } else {
            alpha.right = this;
            this.left = beta;
        }

        this.parent = alpha;

        if (beta != null)
            beta.parent = this;


        alpha.updateHeight();
        this.updateHeight();
    }


    updateHeight() {
        const leftHeight = this.left == null ? -1 : this.left.height;
        const rightHeight = this.right == null ? -1 : this.right.height;

        this.height = (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
    }

    getHeader() {
        if (this.parent === null)
            return this;
        else
            return this.parent;
    }

    static clone(tree) {

        let clone = new Tree(tree.value);
        clone.height = tree.height;
        if (tree.left != null) {
            clone.left = Tree.clone(tree.left);
            clone.left.parent = clone;
        }
        if (tree.right != null) {
            clone.right = Tree.clone(tree.right);
            clone.right.parent = clone;
        }

        return clone;

    }


}

export default Tree;