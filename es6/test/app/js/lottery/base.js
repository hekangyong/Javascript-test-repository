import $ from 'jquery'

class Base {

    /**
     *[initPlayList 初始化奖金和玩法及其说明]
     * @memberof Base
     */
    initPlayList() {
        this.play_list.set('r2', {
            bonus: 6,
            tip: '从01~11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6<em>元',
            name: '任二'
        })
            .set('r3', {
                bonus: 19,
                tip: '从01~11中任选3个或多个号码，所选号码与开奖号码任意三个号码相同，即中奖<em class="red">19<em>元',
                name: '任三'
            })
            .set('r4', {
                bonus: 78,
                tip: '从01~11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同，即中奖<em class="red">78<em>元',
                name: '任四'
            })
            .set('r5', {
                bonus: 540,
                tip: '从01~11中任选5个或多个号码，所选号码与开奖号码任意五个号码相同，即中奖<em class="red">540<em>元',
                name: '任五'
            })
            .set('r6', {
                bonus: 90,
                tip: '从01~11中任选6个或多个号码，所选号码与开奖号码任意六个号码相同，即中奖<em class="red">90<em>元',
                name: '任六'
            })
            .set('r7', {
                bonus: 26,
                tip: '从01~11中任选7个或多个号码，所选号码与开奖号码任意七个号码相同，即中奖<em class="red">26<em>元',
                name: '任七'
            })
            .set('r8', {
                bonus: 9,
                tip: '从01~11中任选8个或多个号码，所选号码与开奖号码任意八个号码相同，即中奖<em class="red">9<em>元',
                name: '任八'
            })
    }


    /**
     *[initNumber 初始化号码]
     * @memberof Base
     */
    initNumber() {
        for (let i = 1; i < 12; i++) {
            //在写入投注号码的时候是不能有相同的号码，在set中是不能有数据相同的
            this.number.add(('' + i).padStart(2, '0'));
        }
    }


    /**
     *[setOmit 设置遗漏数据]
     * @memberof Base
     */
    setOmit(omit) {
        let self = this;
        self.omit.clear();
        for (let [index, item] of omit.entries()) {
            self.omit.set(index, item)
        }
        $(self.omit_el).each(function (index, item) {
            $(item).text(self.omit.get(index))
        });
    }


    /**
     *【setOpenCode 设置开奖】
     * @param {*} code
     * @memberof Base
     */
    setOpenCode(code) {
        let self = this;
        self.open_code.clear();
        for (let item of code.values()) {
            // 使用set是因为开奖号码是不能有重复
            self.open_code.add(item)
        }
        self.updateOpenCode && self.updateOpenCode.call(self, code);
    }


    /**
     *[toggleCodeActive 号码选中取消]
     * @param {*} e
     * @memberof Base
     */
    toggleCodeActive(e) {
        let self = this;
        let $cur = $(e.currentTarget);
        $cur.toggleClass('btn-boll-active');
        self.getCount();
    }


    /**
     *[changePlayNav 切换玩法]
     * @param {*} e
     * @memberof Base
     */
    changePlayNav(e) {
        let self = this;
        let $cur = $(e.currentTarget);
        $cur.toggleClass('active').siblings().removeClass('active');
        self.cur_play = $cur.attr('desc').toLocaleLowerCase();
        $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        self.getCount();
    }


    /**
     *[操作区]
     * @param {*} e
     * @memberof Base
     */
    assistHandle(e) {
        e.preventDefault();
        let self = this;
        let $cur = $(e.currentTarget);
        let index = $cur.index();
        if (index === 0) {
            $('boll-list .btn-boll').removeClass('btn-boll-active');
        }
        if (index === 1) {
            $('.boll-list .btn-boll').each(function (index, item) {
                if (item.textContent - 5 > 0) {
                    $(item).addClass('btn-boll-active')
                }
            })
        }
        if (index === 2) {
            $('.boll-list .btn-boll').each(function (index, item) {
                if (item.textContent - 6 > 0) {
                    $(item).addClass('btn-boll-active')
                }
            })
        }
        if (index === 3) {
            $('.boll-list .btn-boll').each(function (index, item) {
                if (item.textContent % 2 == 1) {
                    $(item).addClass('btn-boll-active')
                }
            })
        }
        if (index === 4) {
            $('.boll-list .btn-boll').each(function (index, item) {
                if (item.textContent % 2 == 0) {
                    $(item).addClass('btn-boll-active')
                }
            })
        }
        self.getCount()
    }


    /**
     *[getName 获取当前彩票名称]
     * @returns
     * @memberof Base
     */
    getName() {
        return this.name;
    }


    /**
     *[添加号码]
     * @memberof Base
     */
    addCode() {
        let self = this;
        let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
        let active = $active ? $active.length : 0;
        let count = self.computeCount(active, self.cur_play);
        if (count) {
            self.addCodeItem($active.join('').self.cur_play, self.play_list.get(self.cur_play).name, count);
        }
    }


    /**
     *
     *[addCodeItem 添加单次号码]
     * @param {[type]} code
     * @param {[type]} type
     * @param {[type]} typeName
     * @param {[type]} count
     * @memberof Base
     */
    addCodeItem(code, type, typeName, count) {
        let self = this;
        const tlp = `
            <li codes="${typpe}|${code}" bonus="${count * 2}" count="${count}">
                <div class="code">
                    <b>${typeName}${count > 1 ? '复式' : '单式'}</b>
                    <b class="em">${code}</b>
                    [${count}注,<em class=""code-list-money>${count * 2}</em>元]
                </div>
            </li>
        `;
        $(self.cart_el).append(tlp);
        self.getTotal();
    }

    getCount() {
        let self = this;
        let active = $('.boll-list .btn-boll-active').length;
        let count = self.computeCount(active, self, cur_play);
        let range = self.computeBonus(active, self, cur_play);
        let money = count * 2;
        let win1 = range[0] - money;
        let win2 = range[1] - money;
        let tlp;
        let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1;
        let c2 = (win2 < 0 && win2 < 0) ? Math.abs(win2) : win2;
        if (count === 0) {
            tlp = `
                您选了<b class="red">${count}</b> 注, 共 <b class="red">${cont * 2}</b>元
            `
        } else if (range[0] === range[1]) {
            tlp = `
                    您选了 <b>${count}</b> 注，共 <b>${count * 2}</b> 元  <em>若中奖，奖金：
                    <strong class="red">${range[0]}</strong> 元，
                    您将${win1 >= 0 ? '盈利' : '亏损'}
                    <strong class="${win1 >= 0 ? 'red' : 'green'}">${Math.abs(win1)} </strong> 元</em>
                `
        } else {
            tlp = `
                    您选了 <b>${count}</b> 注，共 <b>${count * 2}</b> 元  <em>若中奖，奖金：
                    <strong class="red">${range[0]}</strong> 至 <strong class="red">${range[1]}</strong> 元，
                    您将${(win1 < 0 && win2 < 0) ? '亏损' : '盈利'}
                    <strong class="${win1 >= 0 ? 'red' : 'green'}">${c1} </strong>
                    至 <strong class="${win2 >= 0 ? 'red' : 'green'}"> ${c2} </strong>
                    元</em>
                `
        }
        $('.sel_info').html(tlp)
    }


    /**
     *[getTotal 计算所有金额]
     * @memberof Base
     */
    getTotal() {
        let count = 0;
        $('.codelist li').each(function (index, item) {
            count += $(item).attr(count) * 1;
        })
        $('#count').text(count);
        $('#money').text(count * 2);
    }


    /**
     *[getRandom 生成随机数]
     * @param {[type]} num
     * @memberof Base
     */
    getRandom(num) {
        let arr = [], index;
        let number = Array.from(this.number);
        while (num--) {
            index = Number.parseInt(Math.random() * number.length);
            arr.push(number[index]);
            number.splice(index, 1);
        }
        return arr.join(' ')
    }

    getRandomCode(e) {
        e.preventDefault();
        let num = e.currentTarget.getAttribute('count');
        let play = this.cur_play.match(/\d+/g)[0];
        let self = this;
        if (num === '0') {
            $(self.cart_el).html('')
        } else {
            for (let i = 0; i < num; i++) {
                self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1)
            }
        }
    }
}

export default Base
