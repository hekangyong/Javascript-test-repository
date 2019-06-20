{
    let list = new Set();
    list.add(5);
    list.add(7)
    console.log('size', list.size)
    // size 2
}

{
    let arr = [1, 2, 3, 4, 5];
    let list = new Set(arr);
    console.log('size', list.size);
    // size 5
}

{
    let list = new Set();
    list.add(1);
    list.add(2);
    list.add(1);
    list.add(3);
    console.log('list', list);
    // list Set(3) {1, 2, 3}
    let arr = [1, 2, 3, 4, 1, 2, '2'];
    let list2 = new Set(arr);
    console.log('unique', list2);
    // unique Set(5) {1, 2, 3, 4, "2"}
}

{
    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);
    console.log('has', list.has('add'));
    // has true
    console.log('delete', list.delete('add'), list);
    // delete true Set(3) {"delete", "clear", "has"}
    list.clear();
    console.log('list', list)
    // list Set(0) {}
}

{
    let arr = ['add', 'delete', 'clear', 'has'];
    let list = new Set(arr);
    for (let key of list.keys()) {
        console.log('keys', key);
        /*
            keys add
            keys delete
            keys clear
            keys has
        */
    }
    for (let values of list.values()) {
        console.log('values', values)
        /*
            values add
            values delete
            values clear
            values has
        */
    }
    for (let values of list) {
        console.log('value', values)
        /*
            value add
            value delete
            value clear
            value has
        */
    }
    for (let [key, value] of list.entries()) {
        console.log('value', key, value)
        /*
            value add add
            value delete delete
            value clear clear
            value has has
        */
    }

    list.forEach(function (item) { console.log(item) })
    /*
        add
        delete
        clear
        has
    */
}

{
    let weakList = new WeakSet();
    let arg = {};
    weakList.add(arg);
    console.log('weakList', weakList);
    // weakList WeakSet {{…}}
}

{

    let map = new Map();
    let arr = ['1234'];
    map.set(arr, 345);
    console.log('map', map, map.get(arr));
    // map Map(1) {Array(1) => 345} 345
}

{
    let map = new Map([['a', 123], ['b', 456]]);
    console.log('map args', map);
    // map args Map(2) {"a" => 123, "b" => 456}
    console.log('size', map.size);
    // size 2
    console.log('delete', map.delete('a'), map);
    // delete true Map(1) {"b" => 456}
    console.log('clear', map.clear(), map)
    // clear undefined Map(0) {}
}

{
    let weamap = new WeakMap();
    let o = {};
    weamap.set(o, 123);
    console.log(weamap.get(o));
    // 123
}

{
    // 数据结构横向对比，增删改查
    let map = new Map();
    let array = [];
    // 增
    map.set('t', 1);
    array.push({ t: 1 });
    console.info('map-array', map, array);
    // map-array Map(1) {"t" => 1} [{…}]
    // 查
    let map_exist = map.has('t');
    let arrat_exist = array.find(item => item.t);
    console.info('map-exist', map_exist, arrat_exist);
    // map-exist true {t: 1}
    // 改
    map.set('t', 2);
    array.forEach(item => item.t ? item.t = 2 : '');
    console.info('map-array-modify', map, array);
    // map-array-modify Map(1) {"t" => 2} [{…}]
    // 删除
    map.delete('t');
    let index = array.findIndex(item => item.t);
    array.splice(index, 1);
    console.info('map-array-empty', map, array);
    // map-array-empty Map(0) {} []
}

{
    // set和array的对比
    let set = new Set();
    let array = [];
    // 增
    set.add({ t: 1 });
    array.push({ t: 1 });
    console.info('set-array', set, array);
    // set-array Set(1) {{…}} [{…}]
    // 查
    let set_exist = set.has({ t: 1 });
    let array_exist = array.find(item => item.t);
    console.info('set-array-find', set_exist, array_exist);
    // set-array-find false {t: 1}
    // 改
    set.forEach(item => item.t ? item.t = 2 : '');
    array.forEach(item => item.t ? item.t = 2 : '');
    console.info('set-array-modify', set, array);
    // set-array-modify Set(1) {{…}} [{…}]
    // 删
    set.forEach(item => item.t ? set.delete(item) : '');
    let index = array.findIndex(item => item.t);
    array.splice(index, 1);
    console.info('set-array-empty', set, array);
    // set-array-empty Set(0) {} []
}

{
    // map,set,object 对比
    let item = { t: 1 };
    let map = new Map();
    let set = new Set();
    let obj = new Object();
    // 增
    map.set('t', 1);
    set.add(item);
    obj['t'] = 1;
    console.log('map-set-obj', obj, map, set);
    // map-set-obj {t: 1} Map(1) {"t" => 1} Set(1) {{…}}
    // 查
    console.info({
        map_exist: map.has('t'),
        set_exist: set.has(item),
        obj_exist: 't' in obj
    })
    // {map_exist: true, set_exist: true, obj_exist: true}
    // 改
    map.set('t', 2);
    item.t = 2;
    obj['t'] = 2;
    console.info('map-set-obj-modify', obj, map, set);
    // map-set-obj-modify {t: 2} Map(1) {"t" => 2} Set(1) {{…}}
    // 删
    map.delete('t');
    set.delete(item);
    delete obj['t'];
    console.info('map-set-obj-delete', obj, map, set);
    // map-set-obj-delete {} Map(0) {} Set(0) {}
}