/**
 *  Binary Search Tree 
 *  二叉查找树
 * 
 */ 

class Node {
    constructor(num) {
        this.num = num;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    // 插入节点
    insert(num) {
        const node = new Node(num);
        if (this.root === null) {
            this.root = node;
        } else {
            let current = this.root;
            while(true) {
                if (num < current.num) {
                    if (current.left) {
                        current = current.left;
                    } else {
                        current.left = node;
                        break;
                    }
                } else {
                    if (current.right) {
                        current = current.right;
                    } else {
                        current.right = node;
                        break;
                    }
                }
            }
        }
    }
}

const bst = new BinaryTree();
bst.insert(50);
bst.insert(95);
bst.insert(11);
bst.insert(26);
bst.insert(15);
bst.insert(2019);
bst.insert(100);

console.log(bst);