export class TreeNode<T> {
  constructor(
    public data: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}
