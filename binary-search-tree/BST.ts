import { TreeNode } from "./TreeNode";
export class BinarySearchTree<T> {
  private root: TreeNode<T> | null;

  constructor(array: T[]) {
    this.root = this.buildTree(array);
  }

  insert(data: T): void {
    this.root = this.insertRecursive(this.root, data);
  }

  private insertRecursive(node: TreeNode<T> | null, data: T): TreeNode<T> {
    if (node === null) return new TreeNode<T>(data);

    if (data < node.data) {
      node.left = this.insertRecursive(node.left, data);
    } else if (data > node.data) {
      node.right = this.insertRecursive(node.right, data);
    }
    return node;
  }

  delete(data: T) {
    this.root = this.deleteRecursive(this.root, data);
  }

  private deleteRecursive(
    node: TreeNode<T> | null,
    data: T
  ): TreeNode<T> | null {
    if (node === null) return null;
    if (data < node.data) {
      node.left = this.deleteRecursive(node.left, data);
    } else if (data > node.data) {
      node.right = this.deleteRecursive(node.right, data);
    } else {
      if (node.right === null && node.left === null) {
        node = null;
      } else if (node.right === null) {
        return node.left;
      } else if (node.left === null) {
        return node.right;
      } else {
        const successor = this.findMin(node.right);
        node.data = successor.data;
        node.right = this.deleteRecursive(node.right, successor.data);
      }
    }

    return node;
  }

  private findMin(node: TreeNode<T>): TreeNode<T> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  private buildTree(array: T[]): TreeNode<T> | null {
    if (array.length === 0) return null;
    array = [...new Set(array)];
    const mid = Math.floor(array.length / 2);
    const root = new TreeNode<T>(array[mid]);
    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));
    return root;
  }

  find(data: T): TreeNode<T> | null {
    return this.findRecursive(this.root, data);
  }

  private findRecursive(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      return this.findRecursive(node.left, data);
    } else if (data > node.data) {
      return this.findRecursive(node.right, data);
    }
    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  levelOrder(): T[] | null {
    if (this.root === null) return null;
    const queue: TreeNode<T>[] = [];
    const data: T[] = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const current = queue[0];
      data.push(current.data);
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      queue.shift();
    }
    return data;
  }

  inOrder(node: TreeNode<T> | null = this.root, arr: T[] = []): T[] {
    if (node == null) return [];
    this.inOrder(node.left, arr);
    arr.push(node.data);
    this.inOrder(node.right, arr);
    return arr;
  }

  preOrder(node: TreeNode<T> | null = this.root, arr: T[] = []): T[] {
    if (node == null) return [];
    arr.push(node.data);
    this.preOrder(node.left, arr);
    this.preOrder(node.right, arr);
    return arr;
  }

  postOrder(node: TreeNode<T> | null = this.root, arr: T[] = []): T[] {
    if (node == null) return [];
    this.postOrder(node.left, arr);
    this.postOrder(node.right, arr);
    arr.push(node.data);
    return arr;
  }

  height(node: TreeNode<T> | null): number {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node: TreeNode<T> | null): number {
    return this.depthRecursive(this.root, node);
  }

  private depthRecursive(
    current: TreeNode<T> | null,
    node: TreeNode<T> | null
  ): number {
    if (current === null) {
      return 0;
    }
    if (current!.data < node!.data) {
      return 1 + this.depthRecursive(current!.left, node);
    } else if (current!.data > node!.data) {
      return 1 + this.depthRecursive(current!.right, node);
    }
    return 1;
  }

  isBalanced(node: TreeNode<T> | null = this.root): boolean {
    if (node === null) return true;
    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      return false;
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  reBalance() {
    if (!this.isBalanced()) {
      const data = this.inOrder();
      this.root = this.buildTree(data);
    }
  }
}
