{
    let regex = new RegExp('xyz', 'i');
    let regex2 = new RegExp(/xyz/i); //在es5中只能有一个参数
    console.log(regex.test('xyz123'), regex2.test('xyz123'));
    //true true

    //regex3中有两个参数第一个参数中的ig对被后面的i修改，当然也可以是只有一个参数
    let regex3 = new RegExp(/xyz/ig, 'i');
    console.log(regex3.flags);
    //flag 是es6新增的一个对象是用来获取修饰符的操作
    //i
}

{
    let s = 'bbb_bb_b';
    let a1 = /b+/g;
    let a2 = /b+/y;
    console.log('one', a1.exec(s), a2.exec(s));
    console.log('two', a1.exec(s), a2.exec(s));

    console.log(a1.sticky, a2.sticky)
}

{
    //如果在正则表达式中的字符大于两个字节需要在后面加上 u 如果没有加上会出错

    console.log('u', /^\uD83D/.test('\uD83D\uDC2A'));
    console.log('u', /^\uD83D/u.test('\uD83D\uDC2A'));

    console.log(/\u{61}/.test('a'));
    console.log(/\u{61}/u.test('a'));

    console.log(`\u{20BB7}`)

    let s = '𠮷';
    console.log('u', /^.$/.test(s));
    console.log('u', /^.$/u.test(s));

    console.log('test', /𠮷{2}/.test('𠮷𠮷'))
    console.log('test', /𠮷{2}/u.test('𠮷𠮷'))

}