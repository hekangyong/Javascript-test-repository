import $ from 'jquery';

class Interface {
    /**
     *获取遗落数据
     * @param {string} issuse   [当前期号]
     * @return {[type]}         [description]
     */
    getOmit(issue) {
        let self = this;
        return new Promise((reslove, reject) => {
            $.ajax({
                url: '/get/omit',
                data: {
                    issue: issue
                },
                dataType: 'json',
                success: function (res) {
                    self.setOmit(res.data);
                    reslove.call(self, res);
                },
                error: function (err) {
                    reject.call(err)
                }
            })
        })
    }

    /**
     *[getOpenCode 获取开奖号码]
     * @param {string} issuse   [期号]
     * @return {[type]}         [description]
     */
    getOpenCode(issue) {
        let self = this;
        return new Promise((reslove, reject) => {
            $.ajax({
                url: '/get/opencode',
                data: {
                    issue: issue
                },
                dataType: 'json',
                success: function (res) {
                    self.setOpenCode(res.data);
                    reslove.call(self, res);
                },
                error: function (err) {
                    reject.call(err)
                }
            })
        })
    }

    /**
     *[getState 获取当前状态]
     * @param {string} issuse   [当前期号]
     * @return {[type]}         [description]
     */
    getState(issue) {
        let self = this;
        return new Promise((reslove, reject) => {
            $.ajax({
                url: '/get/opencode',
                data: {
                    issue: issue
                },
                dataType: 'json',
                success: function (res) {
                    reslove.call(self, res);
                },
                error: function (err) {
                    reject.call(err)
                }
            })
        })
    }
}

export default Interface