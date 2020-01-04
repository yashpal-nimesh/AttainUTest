BinarySearchTree.prototype = {
    
    remove: function(key) {
      
        if(x.root === null) {
            return false;
        }

        var currentNode = this.find(x.root, key);
        var nodeParent = this.findNodeParent(key);

        if(currentNode.right === null) {
            if(nodeParent === null) {
                this.root = currentNode.left;
            } else {
                if(currentNode.keyValue < nodeParent.keyValue) {
                    nodeParent.left = currentNode.left;
                } else if(currentNode.keyValue > nodeParent.keyValue) {
                    nodeParent.right = currentNode.left;
                }
            }
        } else if (currentNode.right.left === null) {
            currentNode.right.left = currentNode.left;
            if(nodeParent === null) {
                this.root = currentNode.right;
            } else {
                if(currentNode.keyValue < nodeParent.keyValue) {
                    nodeParent.left = currentNode.right;
                } else if(currentNode.keyValue > nodeParent.keyValue) {
                    nodeParent.right = currentNode.right;
                }
            }
      
        } else {
            var leftmost = currentNode.right.left;
            var leftmostParent = currentNode.right;

            while(leftmost.left !== null) {
                leftmostParent = leftmost;
                leftmost = leftmost.left;
            }
            leftmostParent.left = leftmost.right;
            leftmost.left = currentNode.left;
            leftmost.right = currentNode.right;

            if(nodeParent === null) {
                this.root = leftmost;
            } else {
                if(currentNode.keyValue < nodeParent.keyValue) {
                    nodeParent.left = leftmost;
                } else if(currentNode.keyValue > nodeParent.keyValue) {
                    nodeParent.right = leftmost;
                }
            }
        }
        this.count--;

        return true;
    }
    
}

var x = new BinarySearchTree();

x.insert(4);
x.insert(2);
x.insert(8);
x.insert(1);
x.insert(3);
x.insert(6);
x.insert(7);
x.insert(5);