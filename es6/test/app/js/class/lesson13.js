{
    // 基本定义   回调函数
    let ajax = function (callback) {
        console.log('ajax')
        setTimeout(function () {
            callback && callback.call()
        }, 1000)
    };
    ajax(function () {
        console.log('timeout')
    });
}

{
    let ajax = function () {
        console.log('执行');
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve()
            }, 2000)
        })
    };
    ajax().then(function () {
        console.log('promise', 'timeout2')
    });
}

{
    let ajax = function () {
        console.log('执行2');
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve()
            }, 3000)
        })
    };
    ajax().then(function () {
        return new Promise(function (reslove, reject) {
            setTimeout(function () {
                reslove();
            }, 1000)
        }).then(function () {
            console.log("timeout3")
        })
    });
}

{
    let ajax = function (num) {
        console.log("执行4");
        return new Promise(function (resolve, reject) {
            if (num > 5) {
                resolve()
            } else {
                throw new Error('出错了')
            }
        })
    }

    ajax(6).then(function () {
        console.log('log', 6)
    }).catch(function (err) {
        console.log('catch', err)
    })

    ajax(3).then(function () {
        console.log('log', 3)
    }).catch(function (err) {
        console.log('catch', err)
    })
}

{
    // 所有图片加载完成添加到页面
    function loadImg(src) {
        return new Promise((reslove, reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function () {
                reslove(img)
            }
            img.onerror = function (err) {
                reject(err);
            }
        })
    }

    function showImg(imgs) {
        imgs.forEach((img) => {
            document.body.appendChild(img)
        });
    }

    Promise.all([
        loadImg('http://preview.qiantucdn.com/58pic/34/68/65/91h58PICf05dFUIZyv2bX_PIC2018.jpg!qt324new'),
        loadImg('http://preview.qiantucdn.com/58picmark/original_origin_pic/33/68/40/65658PICJ7cbd1bgn904AMaRk.png!qt324new'),
        loadImg('//preview.qiantucdn.com/58picmark/original_origin_pic/33/68/36/41s58PIC98SaQb2MecK4HMaRk.png!qt324new')
    ]).then(showImg)
}

{
    // 有一个图片加载宛就添加到页面中
    function loadImg(src) {
        return new Promise((reslove, reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function () {
                reslove(img)
            }
            img.onerror = function (err) {
                reject(err);
            }
        })
    }

    function showImgs(img) {
        let p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p)
    }

    Promise.race([
        loadImg('http://preview.qiantucdn.com/58pic/34/68/65/91h58PICf05dFUIZyv2bX_PIC2018.jpg!qt324new'),
        loadImg('http://preview.qiantucdn.com/58picmark/original_origin_pic/33/68/36/39d58PIC5E4Zq8a9Gawa5MaRk.png!qt324new'),
        loadImg('http://preview.qiantucdn.com/58picmark/original_origin_pic/33/72/02/96358PIC65KdMZq558PICaZDfMaRk.png!qt324new')
    ]).then(showImgs)
}