/*!
 * i18n add-on
 * This add-on allows to define message in multiple languages
 *
 * @link        http://formvalidation.io/addons/i18n/
 * @license     http://formvalidation.io/license/
 * @author      https://twitter.com/formvalidation
 * @copyright   (c) 2013 - 2015 Nguyen Huu Phuoc
 * @version     v0.1.1, built on 2015-06-30 3:27:20 PM
 */
!function(a){FormValidation.AddOn.i18n={init:function(b){var c=this,d=b.getForm(),e=b.getOptions();d.data("fv.addon.i18n.options",a.extend(!0,{},e)),this._setMessage(b),d.on(e.events.localeChanged,function(a,b){c._setMessage(b.fv)})},destroy:function(a){a.getForm().removeData("fv.addon.i18n.options")},_setMessage:function(a){var b=a.getForm(),c=b.data("fv.addon.i18n.options"),d=a.getLocale();for(var e in c.fields)if(c.fields[e].validators)for(var f=a.getFieldElements(e),g=f.attr("type"),h="radio"===g||"checkbox"===g?1:f.length,i=0;h>i;i++){var j=f.eq(i);for(var k in c.fields[e].validators){var l=c.fields[e].validators[k].message,m=typeof l,n=null;if("object"===m&&l[d])n=l[d];else if("function"===m){var o=l.apply(this,[a,j,k]);o&&o[d]&&(n=o[d])}null===n&&FormValidation.I18n[d][k]["default"]&&(n=FormValidation.I18n[d][k]["default"]),n&&a.updateMessage(e,k,n).updateOption(e,k,"message",n)}}}}}(jQuery);