var CKF = require('./CKF.js');
require('../less/render-category.less');
// other dependencies ...

module.exports = (function() {
	var moduleName = 'renderCategory';
	var module = CKF.create(moduleName, true);

	function getSearchCategory(d) {
		$.ajax({
			type: 'GET',
			url: '/cooka-productDetail-web/searchCategory',
			contentType: "application/json; charset=UTF-8",
			data: "searchCategory=" + JSON.stringify(d),
			dataType: "JSON",
			async: true,
			success: function(data) {
				var $categoryId = data.categoryId;
				var $ul = module.find('.render-category-list');
				var $curl = module.find('.render-category-list').data('cturl');
				var $liUrl;
				if ($curl.indexOf('?') !== -1) {
					$liUrl = $curl + '&ct=';
				} else {
					$liUrl = $curl + '?ct=';
				}

				var $searchId = data.searchId;

				CKF.notify({
					type: 'set-bread',
					data: $searchId
				});
				if ($categoryId.length) {
					for (var i = 0; i < $categoryId.length; i++) {
						var $li;
						if ($categoryId[i].selected) {
							$li = '<li class="col-md-10">' +
								'<a href=" ' + $liUrl + $categoryId[i].categoryId + '" class="select-bar-property-v active" title="' + $categoryId[i].category + '" >' +
								'<span class="icons">' +
								'<span class="icon-unchecked">' +
								'<span class="icon-circle-o"></span>' +
								'</span>' +
								'<span class="icon-checked">' +
								'<span class="icon-circle"></span>' +
								'</span>' +
								'</span>' +
								$categoryId[i].category +
								'</a>' +
								'</li>';
						} else {
							$li = '<li class="col-md-10">' +
								'<a href=" ' + $liUrl + $categoryId[i].categoryId + '" class="select-bar-property-v" title="' + $categoryId[i].category + '" >' +
								'<span class="icons">' +
								'<span class="icon-unchecked">' +
								'<span class="icon-circle-o"></span>' +
								'</span>' +
								'<span class="icon-checked">' +
								'<span class="icon-circle"></span>' +
								'</span>' +
								'</span>' +
								$categoryId[i].category +
								'</a>' +
								'</li>';
						}
						$ul.append($li);
					}
				}
				$updateUl = module.find('.render-category-list');
				if ($updateUl.find('li').length === 0) {
					module.closest('.select-bar-property').addClass('hide');
				}
			}
		});
	}
	return {
		init: function() {
			if (module !== null) {
				var $cData = module.find('.render-category-list').data('ct');
				var $sData = module.find('.render-category-list').data('sid');

				var categoryId = [];
				var searchId = [];
				var ajaxData = {};

				for (var i = 0; i < $cData.length; i++) {
					categoryId.push({
						"categoryId": $cData[i]
					});
				}

				for (var m = 0; m < $sData.length; m++) {
					searchId.push({
						"categoryId": $sData[m]
					});
				}


				ajaxData.categoryId = categoryId;
				ajaxData.searchId = searchId;

				CKF.listen({
					'get-search-category': function () {
						getSearchCategory(ajaxData);
					}
				}, moduleName);

			}
		}
	};
})();
