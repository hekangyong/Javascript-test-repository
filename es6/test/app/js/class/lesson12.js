{
    // 基本定义和生成实例
    class Parent {
        constructor(name = 'Robert') {
            this.name = name;
        }
    }
    let v_parent = new Parent('vvv');
    console.log('构造函数和实例', v_parent)
    // 构造函数和实例 Parent {name: "vvv"}
}

{
    // 继承
    class Parent {
        constructor(name = 'Robert') {
            this.name = name;
        }
    }

    class Child extends Parent {

    }

    console.log('继承', new Child())
    // 继承 Child {name: "Robert"}
}

{
    // 继承传递参数
    class Parent {
        constructor(name = 'Robert') {
            this.name = name;
        }
    }

    class Child extends Parent {
        constructor(type = 'child', name = 'child') {
            super(name);
            this.type = type
        }
    }

    console.log('继承', new Child('hello', 'asd'));
    // 继承 _Child {name: "asd", type: "hello"}
}

{
    class Parent {
        constructor(name = 'Robert') {
            this.name = name;
        }
        get longName() {
            return 'mk' + this.name;
        }
        set longName(value) {
            this.name = value
        }
    }
    let v = new Parent();
    console.log('getter', v.longName);
    // getter mkRobert
    v.longName = 'hello';
    console.log('setter', v.longName);
    // setter mkhello
}

{
    // 静态方法
    class Parent {
        constructor(name = 'Robert') {
            this.name = name;
        }
        static tell() {
            console.log('hello')
        }
    }

    Parent.tell();
    // hello
}

{
    // 静态属性
    class Parent {
        constructor(name = 'Robert') {
            this.name = name;
        }
        static tell() {
            console.log('hello')
        }

    }
    Parent.type = 'test';
    console.log('静态属性', Parent.type);
    // 静态属性 test
}