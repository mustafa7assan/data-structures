import { BinarySearchTree } from "./BST";

const bst = new BinarySearchTree<number>([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);
bst.prettyPrint();
console.log(bst.isBalanced());
