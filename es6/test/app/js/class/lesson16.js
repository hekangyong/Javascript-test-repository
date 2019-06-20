{
    let readonly = function (target, name, description) {
        description.writable = false;
        return description
    }

    class Test {
        @readonly       //修饰器 只能读
        time() {
            return '2017-03-11'
        }
    }
    let test = new Test();
    // test.time = function(){
    //     console.log('reset time')
    // }
    console.log(test.time())
}

{
    let typename = function (target, name, descriptor) {
        target.myname = 'hello';
    }
    @typename
    class Test {

    }
    console.log('类的修饰符', Test.myname);
    // 第三方库修饰器的js库: core-decoraors
}

{
    let log = (type) => {
        return function (target, name, description) {
            let src = description.value;
            description.value = (...arg) => {
                src.apply(target, arg);
                console.log(`log${type}`);
            }
        }
    }
    class AD {
        @log('show')
        show() {
            console.log('ad is show');
        }
        @log('click')
        click() {
            console.log('ad is click');
        }
    }
    let ad = new AD();
    ad.show();
    ad.click();
}