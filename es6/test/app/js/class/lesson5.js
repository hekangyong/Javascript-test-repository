{
    console.log('2进制', 0b111110111);
    //2进制 503
    console.log('8进制', 0o767);
    //8进制 503
}

{
    console.log('15', Number.isFinite(15));
    //15 true
    console.log('NaN', Number.isFinite(NaN));
    //NaN false
    console.log('1/0', Number.isFinite('true' / 0));
    //1/0 false
    console.log('NaN', Number.isNaN(NaN));
    //NaN true
    console.log('0', Number.isNaN(0));
    //0 false

}

{
    console.log('25', Number.isInteger(25));
    //25 true
    console.log('2.5', Number.isInteger(2.5));
    //2.5 false
    console.log('25.0', Number.isInteger(25.0));
    //25.0 true
    console.log('2.5', Number.isInteger('2.5'));
    //2.5 false
    console.log('25.0', Number.isInteger('25.0'));
    //25.0 false
    console.log('25.0', Number.isInteger('25'));
    //25.0 false
}

{
    console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    //9007199254740991 -9007199254740991
    console.log('10', Number.isSafeInteger(10));
    //10 true
    console.log('a', Number.isSafeInteger('a'));
    //a false
}

{
    console.log('43.1', Math.trunc(43.1));
    //43.1 43
    console.log('43.6', Math.trunc(43.6));
    //43.6 43
    console.log('43.9', Math.trunc(43.9));
    //43.9 43
}

{
    console.log('-5', Math.sign(-5));
    //-5 -1
    console.log('0', Math.sign(0));
    //0 0
    console.log('5', Math.sign(5));
    //5 1
    console.log('50', Math.sign('50'));
    //50 1
    console.log('-50', Math.sign('-50'));
    //-50 -1
    console.log('foo', Math.sign('foo'));
    //foo NaN
}

{
    console.log('-1', Math.cbrt(-1));
    //-1 -1
    console.log('8', Math.cbrt(8));
    //8 2
}