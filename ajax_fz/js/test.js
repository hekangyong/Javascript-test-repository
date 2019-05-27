//  Array.proyotype.map
window.onload = () => {
    const { log } = console;
    const arr1 = [1, 2, 3, 4];
    const arr2 = [];
    for (var a = 0; a < arr1.length; a++) {
        arr2.push(arr1[a] * 2);
    }
    log(arr1)
    log(arr2);
    const arr3 = arr1.map(item => item * 2)
    log(arr3);

    // Array.prototype.filter
}