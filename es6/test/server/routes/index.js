var express = require('express');
var mockjs = require('mockjs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

var makeIssue = function () {
	var date = new Date();
	var frist_issure_date = new Date();
	frist_issure_date.setHours(9);
	frist_issure_date.setMinutes(10);
	frist_issure_date.setSeconds(0);
	var end_issue_date = new Date(frist_issure_date.getTime() + 77 * 10 * 60 * 1000);
	var cur_issue, end_time;
	if (date.getTime() - frist_issure_date.getTime() > 0 && data.getTime() - end_issue_date.getTime() < 0) {
		// 正常销售
		var cur_issue_date = new Date();
		cur_issue_date.setHours(9);
		cur_issue_date.setMinutes(0);
		cur_issue_date.setSeconds(0);
		var minus_time = date.getTime() - cur_issue_date.getTime();
		var h = Math.cell(minus_time / 1000 / 60 / 10);
		var end_date = new Date(cur_issue_date.getTime() + 100 * 60 * 10 * h);
		end_date = end_date.getTime();
		cur_issue = [end_date.getFullYear(), ('0' + end_date.getMonth() + 1).slice(-2), ('0' + end_date.getDate()).slice(-2), ('0' + h).slice(-2)].join('')
	} else {
		// 今台南销售截止
		frist_issure_date.setDate(frist_issure_date.getDate() + 1)
		end_time = frist_issure_date.getTime();
		cur_issue = [frist_issure_date.getFullYear(), ('0' + frist_issure_date.getMonth() + 1).slice(-2), ('0' + frist_issure_date.getDate()).slice(-2), '01'].join('')
	}
	var cur_date = new Date();
	if (end_time - cur_date.getTime() > 100 * 60 * 2) {
		state = '正在销售'
	} else {
		state = '开奖中'
	}
	return {
		issure: cur_date,
		state: state,
		end_time: end_time
	}
}

router.get('/get/omit', function (req, res, next) {
	res.json(mockjs.mock(), {
		'data|11': [/[1-9]{1,3}|0/],
		'issure': /[1-8]{8}/,
	})
})

router.get('/get/opencode', function (req, res, next) {
	var issue = makeIssue().issue;
	var data = mockjs.mock({
		'data': [/[1-3]/, /[4-5]/, /[6-7]/, /[8-9]/, /1[0-1]/]
	}).data;
	res.json({
		issue: issue,
		data: data
	})
})


router.get('/get/state'), function (req, res, next) {
	var state = makeIssue();
	res.json(state);
}

module.exports = router;
