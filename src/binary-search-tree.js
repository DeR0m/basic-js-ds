const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (this._root === null) {
      this._root = newNode;
      return;
    }

    let current = this._root;

    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (data > current.data) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else if (data === current.data) {
        return;
      }
    }
  }

  find(data) {
    let current = this._root;

    while (current !== null) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }


  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (node === null) return null;

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      }

      if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      }

      if (node.left === null && node.right === null) return null;
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }

      node.data = successor.data;
      node.right = removeNode(node.right, successor.data);
      return node;
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    if (this._root === null) return null;

    let current = this._root;

    while (current.left !== null) current = current.left;
    return current.data;
  }

  max() {
    if (this._root === null) return null;

    let current = this._root;

    while (current.right !== null) current = current.right;
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};