/**
 *  Binary Search Tree 
 *  二叉查找树
 * 
 */ 

 class Node {
    constructor(num, left, right) {
        this.num = num;
        this.left = left || null;
        this.right = right || null;
    }

    show() {
        console.log(this.num);
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    insert(num) {
        const node = new Node(num);
        if (this.root === null) {
            this.root = node;
            return;
        }

        let current = this.root,
            parent = null;
        while(current) {
            parent = current;
            if (num < parent.num) {
                current = current.left;
                if (!current) {
                    parent.left = node;
                    return;
                }
            } else {
                current = current.right;
                if (!current) {
                    parent.right = node;
                    return;
                }
            }
        }
    }

    preOrder(node) {
        if (node) {
            node.show();
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    middleOrder(node) {
        if (node) {
            this.middleOrder(node.left);
            node.show();
            this.middleOrder(node.right);
        }
    }

    laterOrder(node) {
        if (node) {
            this.laterOrder(node.left);
            this.laterOrder(node.right);
            node.show();
        }
    }

    getMin() {
        let current = this.root;
        while(current) {
            if (!current.left) {
                return current;
            }
            current = current.left;
        }
    }

    getMax() {
        let current = this.root;
        while(current) {
            if (!current.right) {
                return current;
            }
            current = current.right;
        }
    }

    getDeep(node, deep) {
        deep = deep || 0;
        if (node === null) {
            return deep;
        }
        deep++;
        const dleft = this.getDeep(node.left, deep);
        const dright = this.getDeep(node.right, deep);
        return Math.max(dleft, dright);
    }
}

const bst = new Tree();
bst.insert(50);
bst.insert(95);
bst.insert(11);
bst.insert(26);
bst.insert(15);
bst.insert(2019);
bst.insert(100);
console.log(bst)
// const node = new Node(10);
// node.show();
console.log('deep:', bst.getDeep(bst.root));

// 重建二叉树   
// 输入前序遍历序列 [1,2,4,7,3,5,6,8] 和中序遍历序列 [4,7,2,1,5,3,8,6]，则重建二叉树并返回
function reconstructBinaryTree(pre, vin) {
    if (pre.length === 0) {
        return null;
    }
    if (pre.length === 1) {
        return new Node(pre[0]);
    }
    const value = pre[0];
    const index = vin.indexOf(value);
    const vinLeft = vin.slice(0, index);  
    const vinRight = vin.slice(index + 1);
    const preLeft = pre.slice(1, index + 1);
    const preRight = pre.slice(index + 1);
    const node = new Node(value);
    node.left = reconstructBinaryTree(preLeft, vinLeft);
    node.right = reconstructBinaryTree(preRight, vinRight);
    return node;
}
console.log(reconstructBinaryTree([1,2,4,7,3,5,6,8], [4,7,2,1,5,3,8,6]));

// 给定一棵二叉树的前序遍历和中序遍历，求其后序遍历
function getLaterOrder(pre, vin) {
    if (pre.length === 0) {
        return null;
    }
    if (pre.length === 1) {
        return pre;
    }
    const value = pre[0];
    const index = vin.indexOf(value);
    const vinLeft = vin.slice(0, index);  
    const vinRight = vin.slice(index + 1);
    const preLeft = pre.slice(1, index + 1);
    const preRight = pre.slice(index + 1);
    return getLaterOrder(preLeft, vinLeft) + getLaterOrder(preRight, vinRight) + value;
}

console.log(getLaterOrder([1,2,4,7,3,5,6,8], [4,7,2,1,5,3,8,6]));

// 镜像二叉树
function mirror(root) {
    if (root) {
        const temp = root.right;
        root.right = root.left;
        root.left = temp;
        mirror(root.right);
        mirror(root.left);
    }
    return root;
}
// console.log(mirror(bst.root));

// 二叉搜索树找出第k小的节点
function KthNode(root, k) {
    const arr = [];
    getMiddleOrder(root, arr);
    if (k > 0 && k <= arr.length) {
        return arr[k - 1];
    }
    return null;
}
// 递归
function getMiddleOrder(root, arr) {
    if (root) {
        getMiddleOrder(root.left, arr);
        arr.push(root.num);
        getMiddleOrder(root.right, arr);
    }
}
// 迭代
function KthNode(root, k) {
    const arr = [],
        stack = [];
    
    while(stack.length || root) {
        while(root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        arr.push(root.num);
        root = root.right;
    }

    if (k > 0 && k <= arr.length) {
        return arr[k - 1];
    }
    return null;
}
console.log(KthNode(bst.root, 2));