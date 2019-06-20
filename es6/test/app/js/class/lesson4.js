{
    console.log('a', `\u0061`);
    //a a
    console.log('s', `\u20BB7`);
    //s ₻7
    console.log('s', `\u{20BB7}`);
    //s 𠮷
}

{
    let s = '𠮷';
    console.log('length', s.length);
    //length 2
    console.log('0', s.charAt(0));
    //0 �
    console.log('0', s.charAt(1));
    //0 �
    console.log('0', s.charCodeAt(0));
    //0 55362
    console.log('0', s.charCodeAt(1));
    //0 57271

    let s1 = '𠮷a';
    console.log('length', s1.length);
    //length 3
    console.log('code0', s1.codePointAt(0));
    //code0 134071
    console.log('code0', s1.codePointAt(0).toString(16));
    //code0 20bb7
    console.log('code0', s1.codePointAt(1));
    //code0 57271
    console.log('code0', s1.codePointAt(2));
    //code0 97

}

{
    console.log(String.fromCharCode("0x20bb7"));
    //ஷ
    console.log(String.fromCodePoint("0x20bb7"));
    //𠮷
}

{
    let str = '\u{20bb7}abc';
    for (let i = 0; i < str.length; i++) {
        console.log('es5', str[i])
    }
    /*
        *es5 �
        *es5 �
        *es5 a
        *es5 b
        *es5 c
    */

    for (let code of str) {
        console.log('es6', code);
    }
    /*
        *es6 𠮷
        *es5 a
        *es5 b
        *es5 c
    */
}

{
    let str = "string";
    console.log('includes', str.includes("r"));
    //includes true
    console.log('includes', str.includes("f"));
    //includes false
    console.log('start', str.startsWith('str'));
    //start true
    console.log('start', str.startsWith('ing'));
    //start false
    console.log('start', str.endsWith('ing'));
    //start true
}

{
    let str = "abc";
    console.log(str.repeat(2));
    //abcabc
}

{
    let name = "List";
    let info = "Hello world";
    let m = `i am ${name}.${info}`;
    console.log(m);
    //i am List.Hello world
}

{
    console.log('0'.padStart(2, '0'));
    //00
    console.log('1'.padStart(2, '0'));
    //01
    console.log('11'.padStart(2, '0'));
    //11
    console.log('1'.padEnd(2, '0'));;
    //10
}

{
    let user = {
        name: 'list',
        info: 'hello world'
    };
    console.log(abc`i am ${user.name}, ${user.info}`);
    /*
    * ["i am", ",", "", raw:{"i am ", ", ", ""}] "list" "hello world"
    * i am ,, ,listhello world
    */
    function abc(s,v1,v2){
        console.log(s,v1,v2)
        return s+v1+v2;
    }
}

{
    console.log(String.raw`Hi\n${1+2}`);
    //Hi\n3
    console.log(`Hi\n${1+2}`);
    //Hi
    //3
    
}