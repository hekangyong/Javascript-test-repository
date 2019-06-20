{
    let a, b, rest;
    [a, b] = [11, 55];
    console.log(a, b);
    //11,55
}

{
    let a, b, rest;
    [a, b, ...rest] = [1, 2, 3, 4, 5, 6];
    console.log(a, b, rest)
    //1,2,[3,4,5,6]
}

{
    let a, b;
    ({ a, b } = { a: 1, b: 2 })
    console.log(a, b)
    //1,2
}

{
    let a, b, c, rest;
    [a, b, c = 3] = [11, 55];
    console.log(a, b, c);
    //11,55,3

    // [a, b, c = 3] = [11, 55];
    // console.log(a, b, c);
    //11,55,underfined
}

//如果解构赋值没有成功的配对其赋值为 underfined
//解构赋值适用于变量交换
//对象的解构赋值都是要是对象的才能钩进行结构赋值

{
    let a = 1;
    let b = 2;
    [a, b] = [b, a];
    console.log(a, b)
    //2,1
}

{
    function f() {
        return [1, 2]
    }
    let a, b;
    [a, b] = f();
    console.log(a, b);
    //1,2
}

{
    function f() {
        return [1, 2, 3, 4, 5];
    }
    let a, b, c;
    [a, , , b] = f()   //[a,,,b] = [1,2,3,4,5]  
    console.log(a, b)
    //1,4
}

{
    function f() {
        return [1, 2, 3, 4, 5];
    }
    let a, b, c;
    [a, , ...b] = f()
    console.log(a, b)
    //1,[3,4,5]
}

{
    let o = { p: 42, q: true };
    let { p, q } = o;
    console.log(p, q);
    //42,true
}

{
    let { a = 10, b = 5 } = { a: 3 };
    console.log(a, b)
    //a在没有赋值之前是10 ，之后对其进行了重新赋值后面才变成了3
    //3,5
}

{
    //这一块是对json对象进行的解构赋值
    let metaData = {
        title: 'abc',
        test: [
            {
                title: 'test',
                desc: 'descrption'
            },
            {
                title: 'aasdad',
                desc: 'asdadasdasdasd'
            }
        ]
    }
    let { title: exTitle, test: [{ title: cnTitle }] } = metaData;
    console.log(exTitle, cnTitle);
    //abc, test
}