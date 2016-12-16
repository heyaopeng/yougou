var CKF = require('./CKF.js');

module.exports = (function() {
    var moduleName = 'addressGroup';
    var module = CKF.create(moduleName);

    function buildAddr($elem) {

    	var $select = $elem.find('select.address-select');
        var MAX_LEVEL = $select.length - 1;
        $select.off('change').on('change', function() {

            var $this = $(this);
            var level = $this.data('level');
            var value = $this.val();
            if (level < MAX_LEVEL && value !== '') {
                for (var i = level + 1; i <= MAX_LEVEL; i++) {
                    $select.eq(i)[0].length = 1;
                }
                var hasParent = $this.data('parent');
                var parentId = "parentId=" + $this.find('option:selected').data('parentid');
                if(hasParent) {
                	var url = "/cooka-user-web/center/select" + hasParent;
                	$.ajax({
                		type: "post",
                		url: url,
                		data: parentId,
                		async: true,
                		success: function(data) {
                			var html = '';
                			$.each(data, function(index, elem) {
                				html += '<option value="' + elem.name + '" data-parentid="' + elem.id + '">' + elem.name + '</option>\n';
                			});
                            // $select.eq(level + 1)[0].length = 1;
                			$select.eq(level + 1).append(html);
                            var $form = $this.closest('form');

                            $form.find('select').each(function(index, el) {
                                var $this = $(this);
                                var $fieldName = 'f-' + $this.attr('name');
                                var $countOpt =  $this.find('option').length > 1;
                                if ($countOpt) {
                                    $form.data('formValidation').enableFieldValidators($fieldName, true);
                                    $form.data('formValidation').revalidateField($fieldName);
                                } else {
                                    $form.data('formValidation').enableFieldValidators($fieldName, false);
                                }
                            });
                		},
                	});
                }
            } else {
                var $form = $this.closest('form');

                $form.find('select').each(function(index, el) {
                    var $this = $(this);
                    var $fieldName = 'f-' + $this.attr('name');
                    var $countOpt =  $this.find('option').length > 1;
                    if ($countOpt) {
                        $form.data('formValidation').enableFieldValidators($fieldName, true);
                        $form.data('formValidation').revalidateField($fieldName);
                    } else {
                        $form.data('formValidation').enableFieldValidators($fieldName, false);
                    }
                });
            }

        });
    }

    function changeAddr() {
        var $elem = CKF.rebuild(moduleName);
	        $elem.each(function(){
            var $this = $(this);
            buildAddr($this);
        });

    }

    function reValid() {
        module.on('address.change', function() {

            var $this = $(this);
            var $form = $this.closest('form');

            $form.find('select').each(function(index, el) {
                var $this = $(this);
                var $fieldName = 'f-' + $this.attr('name');
                var $countOpt =  $this.find('option').length > 1;
                if ($countOpt) {
                    $form.data('formValidation').enableFieldValidators($fieldName, true);
                    $form.data('formValidation').revalidateField($fieldName);
                } else {
                    $form.data('formValidation').enableFieldValidators($fieldName, false);
                }
            });
        });
    }

    return {
        init: function() {

            CKF.listen({
                'address-group-rebuild': changeAddr
            }, moduleName);

            module.each(function(index, elem) {


            	var $elem = $(elem);

                var $select = $elem.find('select.address-select');
                var MAX_LEVEL = $select.length - 1;
                reValid();
                $select.on('change', function() {

                    var $this = $(this);
                    var level = $this.data('level');
                    var value = $this.val();
                    if (level < MAX_LEVEL && value !== '') {
                        for (var i = level + 1; i <= MAX_LEVEL; i++) {
                            $select.eq(i).get(0).length = 1;
                        }
                        var hasParent = $this.data('parent');
                        var parentId = "parentId=" + $this.find('option:selected').data('parentid');
                        if(hasParent) {
                            var url = "/cooka-user-web/center/select" + hasParent;
                            $.ajax({
                                type: "post",
                                url: url,
                                data: parentId,
                                async: true,
                                success: function(data) {
                                    var html = '';
                                    $.each(data, function(index, elem) {
                                        html += '<option value="' + elem.name + '" data-parentid="' + elem.id + '">' + elem.name + '</option>\n';
                                    });
                                    // $select.eq(level + 1)[0].length = 1;
                                    $select.eq(level + 1).append(html);
                                    $this.trigger('address.change');
                                }
                            });
                        }
                    }
                });

                reValid();
            });
        }
    };
})();
