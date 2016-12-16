console.log('home compiling...');
var fs = require('fs');
var async = require('async');
var Hbs = require('handlebars');
var data;

function makeData(callack) {
	var misc = require('./misc/data.json');
	var channel = require('./channel/data.json');
	var f1 = require('./f1/data.json');
	var f2 = require('./f2/data.json');
	var f3 = require('./f3/data.json');
	var f4 = require('./f4/data.json');
	var f5 = require('./f5/data.json');
	var f6 = require('./f6/data.json');
	var f7 = require('./f7/data.json');

	data = Object.assign({},misc,channel,f1,f2,f3,f4,f5,f6,f7);
	// console.log(JSON.stringify(data));
	callack(null);
}

function registerHeader(callack) {
	fs.readFile('./header.handlebars', 'utf-8', function(err, header) {
		Hbs.registerPartial('header', header);

		callack(null);
	});
}

function registerMisc(callack) {
	fs.readFile('./misc/template.handlebars', 'utf-8', function(err, misc) {
		Hbs.registerPartial('misc', misc);

		callack(null);
	});
}

function registerChannel(callack) {
	fs.readFile('./channel/template.handlebars', 'utf-8', function(err, channel) {
		Hbs.registerPartial('channel', channel);

		callack(null);
	});
}

function registerF1(callack) {
	fs.readFile('./f1/template.handlebars', 'utf-8', function(err, f1) {
		Hbs.registerPartial('f1', f1);

		callack(null);
	});
}

function registerF2(callack) {
	fs.readFile('./f2/template.handlebars', 'utf-8', function(err, f2) {
		Hbs.registerPartial('f2', f2);

		callack(null);
	});
}

function registerF3(callack) {
	fs.readFile('./f3/template.handlebars', 'utf-8', function(err, f3) {
		Hbs.registerPartial('f3', f3);

		callack(null);
	});
}

function registerF4(callack) {
	fs.readFile('./f4/template.handlebars', 'utf-8', function(err, f4) {
		Hbs.registerPartial('f4', f4);

		callack(null);
	});
}

function registerF5(callack) {
	fs.readFile('./f5/template.handlebars', 'utf-8', function(err, f5) {
		Hbs.registerPartial('f5', f5);

		callack(null);
	});
}

function registerF6(callack) {
	fs.readFile('./f6/template.handlebars', 'utf-8', function(err, f6) {
		Hbs.registerPartial('f6', f6);

		callack(null);
	});
}

function registerF7(callack) {
	fs.readFile('./f7/template.handlebars', 'utf-8', function(err, f7) {
		Hbs.registerPartial('f7', f7);

		callack(null);
	});
}

function registerFooter(callack) {
	fs.readFile('./footer.handlebars', 'utf-8', function(err, footer) {
		Hbs.registerPartial('footer', footer);

		callack(null);
	});
}

function renderHtml(callack) {
	fs.readFile('./home.handlebars', 'utf-8', function(err, content) {
		var template = Hbs.compile(content);
		var html = template(data);
		fs.writeFile('../../index.html', html, function(err) {
			if (err) {
				return err;
			}
			console.log('home compiled');
			callack(null);
		});
	});
}

Hbs.registerHelper('ifEq', function(a, b, options) {
	if (a === b) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Hbs.registerHelper('encodeUri', function(str) {
	return encodeURIComponent(str);
});

Hbs.registerHelper('vnum', function() {
	return new Date().getTime();
});

async.series([
	makeData,
	registerHeader,
	registerMisc,
	registerChannel,
	registerF1,
	registerF2,
	registerF3,
	registerF4,
	registerF5,
	registerF6,
	registerF7,
	registerFooter,
	renderHtml
]);
