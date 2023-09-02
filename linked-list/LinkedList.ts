import { ListNode } from "./ListNode";
export class LinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data: T): void {
    const newNode = new ListNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(data: T): void {
    const newNode = new ListNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  remove(data: T): void {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        if (!current.next) {
          this.tail = current;
        }
        return;
      }
      current = current.next;
    }
  }

  size(): number {
    const nodes = this.toArray();
    return nodes.length;
  }

  at(index: number): ListNode<T> | null {
    const nodes = this.toArray();
    return nodes[index];
  }

  pop(): void {
    let current = this.head;
    while (current) {
      if (current.next === this.tail) {
        current.next = null;
        this.tail = current;
      }
      current = current.next;
    }
  }

  contains(data: T): boolean {
    if (!this.head) return false;
    let current = this.head;
    while (current.next) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  find(data: T): number | null {
    const nodes = this.toArray();
    const index = nodes.findIndex((node: ListNode<T>) => node.data === data);
    return index > 0 ? index : null;
  }

  insertAt(data: T, index: number): void {
    const nodes = this.toArray();
    const newNode = new ListNode<T>(data);
    const currentNode = nodes[index];
    const previousNode = nodes[index - 1];
    if (!previousNode) {
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    } else {
      previousNode.next = newNode;
      newNode.next = currentNode;
    }
  }

  removeAt(index: number): void {
    const nodes = this.toArray();
    const currentNode = nodes[index];
    const previousNode = nodes[index - 1];
    const nextNode = currentNode.next;
    previousNode.next = nextNode;
  }

  toString(): string {
    let s: string = "";
    let current = this.head;
    while (current) {
      s += `[ ${current.data} ] -> `;
      current = current.next;
    }
    s += current;
    return s;
  }

  toArray(): ListNode<T>[] {
    if (!this.head) return [];
    const nodes: ListNode<T>[] = [];
    let current = this.head;
    while (current.next) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }
}
