{
    let obj = {
        time: '2017-03-11',
        name: 'net',
        _r: 123
    }

    let monitor = new Proxy(obj, {
        // 拦截对象属性的读取
        get(target, key) {
            return target[key].replace('2017', '2018');
        },
        // 拦截对象设置属性
        set(target, key, value) {
            if (key === 'name') {
                return target[key] = value;
            } else {
                return target[key];
            }
        },
        // 拦截key in object 操作
        has(target, key) {
            if (key === 'name') {
                return target[key];
            } else {
                return false;
            }
        },
        // 拦截delete
        deleteProperty(target, key) {
            if (key.indexOf('_') > -1) {
                delete target[key];
                return true
            } else {
                return target[key]
            }
        },
        // 拦截Object.keys,Object.getOwnPropertySymbols, Object.getOwnPropertyNames
        ownKeys(target) {
            return Object.keys(target).filter(item => item != 'time')
        }
    })
    console.log('get', monitor.time);
    // get 2018-03-11
    monitor.time = '2018';
    monitor.name = 'Robert'
    console.log('set', monitor.time);
    // set 2018-03-11
    console.log('set', monitor.name);
    // set Robert
    console.log('set', monitor)
    // set Proxy {time: "2017-03-11", name: "Robert", _r: 123}
    console.log('has', 'name' in monitor, 'time' in monitor)
    // has true false
    // delete monitor.time;
    // console.log('delete', monitor);
    // delete monitor._r;
    // console.log('delete', monitor);
    console.log('ownkeys', Object.keys(monitor))
    // ownkeys (2) ["name", "_r"]
}

{
    let obj = {
        time: '2017-03-11',
        name: 'net',
        _r: 123
    };

    console.log('Reflect get', Reflect.get(obj, 'time'));
    // Reflect get 2017-03-11
    Reflect.set(obj, 'name', 'Robert');
    console.log(obj);
    // {time: "2017-03-11", name: "Robert", _r: 123}
    console.log('has', Reflect.has(obj, 'name'));
    // has true
}

{
    function validator(target, validator) {
        return new Proxy(target, {
            _validator: validator,
            set(target, key, value, proxy) {
                if (target.hasOwnProperty(key)) {
                    let va = this._validator[key];
                    if (!!va(value)) {
                        return Reflect.set(target, key, value, proxy)
                    } else {
                        throw Error(`不能设置${key} 到 ${value}`)
                    }
                } else {
                    throw Error(`${key} 不存在`)
                }
            }
        })
    }

    const personValidators = {
        name(val) {
            return typeof val === 'string'
        },
        age(val) {
            return typeof val === 'number' && val > 18
        },
        mobile(val) {

        }
    }

    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            this.mobile = '1111';
            return validator(this, personValidators)
        }
    }

    const person = new Person('lilei', 30);
    console.log(person);
    // Proxy {name: "lilei", age: 30, mobile: "1111"}
    // person.name = 474;
    person.name = 'Han Mei Mei'
    console.log(person);
    // Proxy {name: "Han Mei Mei", age: 30, mobile: "1111"}
}