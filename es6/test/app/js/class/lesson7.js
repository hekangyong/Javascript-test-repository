{
    function test(x, y = 'world') {
        console.log('默认值', x, y)
    }
    test('hello');
    // 默认值 hello world
    test('hello', 'kill')
    // 默认值 hello kill
}

{
    let a = 'test';
    function test2(x, y = x) {
        console.log('作用域', x, y)
    }
    test2('kill');
    // 作用域 kill kill
    test2();
    // 作用域 undefined undefined

    // function test3(c, y = x) {
    //     console.log('作用域', c, y)
    // }
    // test3('kill');
    //Uncaught ReferesnceError: x is not defined
}

{
    function test4(...arg) {
        for (let v of arg) {
            console.log('rest', v);
        }
    }
    test4(1, 2, 3, 4, 5, 'a');
    /*
        rest 1
        rest 2
        rest 3
        rest 4
        rest 5
        rest a
    */
}

{
    console.log(...[1, 2, 4]);
    // 1 2 4
    console.log('a', ...[1, 2, 4])
    // a 1 2 4
}

{
    let arrow = v => v * 2;
    let arrow2 = () => 5;
    console.log('arrow', arrow(3));
    // arrow 6
    console.log('arrow2', arrow2());
    // arrow2 5
}

{
    function tail(x) {
        console.log('tail', x);
    }
    function fx(x) {
        return tail(x);
    }
    fx(123);
    // tail 123
}