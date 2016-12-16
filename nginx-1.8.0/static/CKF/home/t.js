// var d = require('./database.json');
// var fs = require('fs');
// var _ = require('lodash');

// function buildF1() {
// 	fs.readdir('./f1/raw/', function(err, files) {
// 		files = files.map(function(file) {
// 			var pNum = file.slice(0, -4).replace(/@/, '#');
// 			d[pNum].pnum = pNum;
// 			d[pNum].src = '/CKF/home/f1/raw/' + file;
// 			return d[pNum];
// 		});

// 		console.log(JSON.stringify(_.chunk(files, 5)));
// 	});
// }

// var big, small;

// var arr = [];

// fs.readdir('./f2/raw/big/', function(err, files) {
// 	files = files.map(function(file) {
// 		var pNum = file.slice(0, -4).replace(/@/, '#');
// 		d[pNum].src = '/CKF/home/f2/raw/big/' + file;
// 		return d[pNum];
// 	});

// 	big = files;

// 	fs.readdir('./f2/raw/small/', function(err, files) {
// 		files = files.map(function(file) {
// 			var pNum = file.slice(0, -4).replace(/@/, '#');
// 			d[pNum].src = '/CKF/home/f2/raw/small/' + file;
// 			return d[pNum];
// 		});

// 		small = files;

// 		for (var i = 0; i < small.length; i++) {
// 			if (i == 0 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9) {
// 				arr.push([big[i], small[i]]);
// 			}
// 			else {
// 				arr.push([small[i], big[i]]);	
// 			}
// 		}

// 		console.log(JSON.stringify(_.chunk(arr, 5)));
// 	});
// });

// fs.readdir('./f7/raw/', function(err, files) {

// 	files = files.filter(function(file) {
// 		return file.indexOf('hero.jpg') === -1;
// 	});

// 	files = files.map(function(file) {
// 		var pNum = file.slice(0, -4).replace(/@/, '#');
// 		console.log(pNum, d[pNum])
// 		d[pNum].src = '/CKF/home/f7/raw/' + file;
// 		return d[pNum];
// 	});

// 	files = _.chunk(files, 5)
// 	console.log(JSON.stringify(files));
// });


// var d = require('./f7/data.json');

// function cao(str) {
// 	return Math.ceil(parseInt(str.slice(3)) / 1000) + '.000 VND';
// }

// d.f7.forEach(function(i) {
// 	i.forEach(function(j) {
// 		// j.forEach(function(v) {
// 			j.price = cao(j.price);
// 		// });
// 	});
// });

// console.log(JSON.stringify(d));

var fs = require('fs');
var request = require('superagent');
var async = require('async');
var _ = require('lodash');

fs.readdir('E:/app-parent/nginx-1.8.0/static/CKF/images/home/f7', function(err, files) {
	console.log(files);
});

var arr = [
	'4419.jpg',
	'4455.jpg',
	'4456.jpg',
	'4462.jpg',
	'4481.jpg',
	'4487.jpg',
	'4493.jpg',
	'4495.jpg',
	'4517.jpg',
	'4554.jpg'
];

var ss = [];

var after = [];

arr.forEach(function(item) {
	var id = item.slice(0, -4);

	ss.push(function(cb) {
		request
			.get('http://www.cookabuy.com/cooka-productDetail-web/getProductInfo')
			.set('Cookie', 'language="vi_VN"')
			.query({
				productId: id
			})
			.end(function(err, res) {
				if (err) {
					return err;
				}

				var pro = JSON.parse(res.text);
				pro.id = id;
				pro.price = pro.price + ' VND';
				pro.src = '/CKF/images/home/f7/' + id + '.jpg';
				delete pro.imageUrl;

				after.push(pro);

				cb(null);
			});
	});
});


async.series(ss.concat(function() {
	// console.log(JSON.stringify(_.chunk(_.chunk(after, 2), 4)));
	console.log(JSON.stringify(_.chunk(after, 5)));
// console.log(JSON.stringify(after));
}));
