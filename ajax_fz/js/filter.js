const arr1 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
const arr2 = [];
for (var a = 0; a < arr1.length; a++) {
    if (arr1.indexOf(arr1[a]) == a) {
        arr2.push(arr1[a])
    }
}
console.log("filter: " + arr2);
const arr3 = arr1.filter((element, index, self) => {
    return self.indexOf(element) === index;
})
console.log("filter:" + arr3);