import { LinkedList } from "./LinkedList";

const linkedList = new LinkedList<number>();

const numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90];
// Construct the linked list from numbers
for (const number of numbers) {
  linkedList.append(number);
}
// Add 0, 1 at begin of the list
linkedList.prepend(0);
// Remove 80 from the list
linkedList.remove(10);
// Get the size of list
console.log(linkedList.size()); // 8
// Get the node at the give index
console.log(linkedList.at(5)); // [50]
// remove the last node in list
linkedList.pop();
// Check if list contains the value of 60
console.log(linkedList.contains(60)); // true
// Get index of node by give the value or null
console.log(linkedList.find(70)); // 6
// Insert a value at specific index
linkedList.insertAt(10, 0);
// Remove a value at specific index
linkedList.removeAt(2);
// Print the data of the linked list
console.log(linkedList.toString());
