{
    let arr = Array.of(3, 4, 7, 9, 32, 23);
    console.log('arr=', arr);
    //arr= [3, 4, 7, 9, 32, 23]

    let empty = Array.of();
    console.log('empty', empty);
    //empty []
}

{
    let p = document.querySelectorAll('p');
    let pArr = Array.from(p);
    pArr.forEach(function (item) {
        console.log(item.textContent);
        // 打印出所有 p 标签中的内容
    });

    console.log(Array.from([1, 3, 5, 7, 9], function (item) { console.log(item); return item * 2 }));
    /*
      1
      3
      5
      7
      9
    */
    //[2, 6, 10, 14, 18]
}

{
    console.log('fill-7', [1, 'a', undefined].fill(7));                     //将数组中的所有值替换为 7
    //fill-7  [7, 7, 7]
    console.log('fill,pos', ['a', 'b', 'c', 'd', 'e'].fill(7, 1, 3));       //开始从长度为 1 的数组开始 一直到长度为 3 的值都进行 替换 替换为 7
    //fill,pos ["a", 7, 7, "d", "e"]
}

{
    for (let index of ['1', 'c', 'ks'].keys()) {                            // 遍历数组中的下标
        console.log('keys', index)
        /*
            keys 0
            keys 1
            keys 2
        */
    }
    for (let value of ['1', 'c', 'ks'].values()) {                          // 遍历出数组中的所有值
        console.log('values', value)
        /*
            values 1
            values c
            values ks
        */
    }
    for (let [index, values] of ['1', 'c', 'ks'].entries()) {               // 遍历出数组中的下标和值 index为下标  values 为值
        console.log('values', index, values);
        /*
            values 0 1
            values 1 c
            values 2 ks
        */
    }
}

{
    console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
    //4, 2, 3, 4, 5]
}

{
    console.log([1, 2, 3, 4, 5, 6].find(function (item) { return item > 3 }))               //返回数组中大与 3 的值   只会返回第一个大于三的值
    //4
    console.log([1, 2, 3, 4, 5, 6].findIndex(function (item) { return item > 3 }))          //查找数组中大与 3 的下标
    //3
}

{
    console.log('number', [1, 2, NaN].includes(1))          //在数组中查是否包含有 1 这个值
    //number true
    console.log('number', [1, 2, NaN].includes(NaN))          //在数组中查是否包含有 1 这个值
    //number true

}