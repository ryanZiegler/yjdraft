const arr1 = [7, 11, 2, 4, null, null, null, 5, null, 13, null, 8, null, 4, 1];
const arr2 = [7, 11, 2, 4, null, null, null, 5, null, 13, null, 8, 5, 4, 1];

// 构造一个树节点
function Node(nodeData, leftData, rightData) {
    this.nodeData = nodeData;
    this.leftData = leftData;
    this.rightData = rightData;
}

// 中序遍历 每次取中点为根节点,向左右递归
function createTree(array) {
    if (array.length <= 0) {
        return null;
    } else {
        const mid = parseInt(array.length / 2)
        if (!array[mid]) return null;
        let node = new Node(array[mid], null, null);
        node.leftData = createTree(array.slice(0, mid));   
        node.rightData = createTree(array.slice(mid+1));
        return node;
    }
}

// Path Sum 1 给出一个 sum, 判断该二叉数中是否存在一条 sum 头尾路径
function pathSum1(node, sum) {
    // console.log("传入node为>>>>>>>>>", node);
    if (node === null) return false;
    if (node.leftData === null && node.rightData === null && node.nodeData === sum) return true;        
    return (pathSum1(node.leftData, sum - node.nodeData) || pathSum1(node.rightData, sum - node.nodeData));
}

const tree1 = createTree(arr1);
console.log("生成二叉树为>>>>>>>>>", tree1);
console.log("该二叉树是否存在sum 路径>>>>>>>", pathSum1(tree1, 22));

// Path Sum 2 找到所有满足题目1的路径并且返回
let pathList = [];
let path = [];

function pathSum2(node, sum, path) {
    let pathArr = path.slice(0);
    
    if (node === null) return pathList;
    pathArr.push(node.nodeData);
    if (node.leftData === null && node.rightData === null && node.nodeData === sum) {
        pathList.push(pathArr);
    }
    pathSum2(node.leftData, sum - node.nodeData, pathArr);
    pathSum2(node.rightData, sum - node.nodeData, pathArr);
    return pathList;
}

const tree2 = createTree(arr2);
console.log("生成二叉树为>>>>>>>>>", tree2);
console.log("该二叉树 sum 路径为>>>>>>>", pathSum2(tree2, 22, path));