"use strict";define("dummy/app",["exports","ember","ember/resolver","ember/load-initializers","dummy/config/environment"],function(e,t,a,r,n){var l;t["default"].MODEL_FACTORY_INJECTIONS=!0,l=t["default"].Application.extend({modulePrefix:n["default"].modulePrefix,podModulePrefix:n["default"].podModulePrefix,Resolver:a["default"]}),r["default"](l,n["default"].modulePrefix),e["default"]=l}),define("dummy/components/validated-input",["exports","ember"],function(e,t){var a=t["default"].computed,r=t["default"].observer,n=t["default"].defineProperty,l=t["default"].run;e["default"]=t["default"].Component.extend({classNames:["validated-input"],classNameBindings:["showErrorClass:has-error","isValid:has-success"],model:null,value:null,rawInputValue:null,type:"text",valuePath:"",placeholder:"",attributeValidation:null,isTyping:!1,didValidate:a.oneWay("targetObject.didValidate"),showErrorClass:a("isTyping","showMessage","hasContent","attributeValidation",function(){return this.get("attributeValidation")&&!this.get("isTyping")&&this.get("showMessage")&&this.get("hasContent")}),hasContent:a.notEmpty("rawInputValue"),isValid:a.and("hasContent","attributeValidation.isValid"),isInvalid:a.oneWay("attributeValidation.isInvalid"),inputValueChange:r("rawInputValue",function(){this.set("isTyping",!0),l.debounce(this,this.setValue,500,!1)}),showMessage:a("attributeValidation.isDirty","isInvalid","didValidate",function(){return(this.get("attributeValidation.isDirty")||this.get("didValidate"))&&this.get("isInvalid")}),setValue:function(){this.set("value",this.get("rawInputValue")),this.set("isTyping",!1)},init:function(){this._super.apply(this,arguments);var e=this.get("valuePath");n(this,"attributeValidation",a.oneWay("model.validations.attrs."+e)),this.set("rawInputValue",this.get("model."+e)),n(this,"value",a.alias("model."+e))}})}),define("dummy/controllers/array",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("dummy/controllers/index",["exports","ember"],function(e,t){e["default"]=t["default"].Controller.extend({showAlert:!1,isRegistered:!1,showCode:!1,didValidate:!1,actions:{showCode:function(){this.toggleProperty("showCode")},submit:function(){var e=this,t=this.get("model");t.validate().then(function(t){var a=(t.model,t.validations);a.get("isValid")?e.setProperties({showAlert:!1,isRegistered:!0,showCode:!1}):e.set("showAlert",!0),e.set("didValidate",!0)},function(e){})},dismissAlert:function(){this.set("showAlert",!1)}}})}),define("dummy/controllers/object",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("dummy/helpers/ago",["exports","ember","dummy/helpers/moment-from-now"],function(e,t,a){e["default"]=a["default"].extend({compute:function(){return t["default"].deprecate("ember-moment: `ago` helper has been renamed to `moment-from-now`"),this._super.apply(this,arguments)}})}),define("dummy/helpers/duration",["exports","ember","dummy/helpers/moment-duration"],function(e,t,a){e["default"]=a["default"].extend({compute:function(){return t["default"].deprecate("ember-moment: `duration` helper has been renamed to `moment-duration`"),this._super.apply(this,arguments)}})}),define("dummy/helpers/moment-duration",["exports","ember-moment/helpers/moment-duration"],function(e,t){e["default"]=t["default"]}),define("dummy/helpers/moment-format",["exports","ember","dummy/config/environment","ember-moment/helpers/moment-format"],function(e,t,a,r){e["default"]=r["default"].extend({globalOutputFormat:t["default"].get(a["default"],"moment.outputFormat"),globalAllowEmpty:!!t["default"].get(a["default"],"moment.allowEmpty")})}),define("dummy/helpers/moment-from-now",["exports","ember","dummy/config/environment","ember-moment/helpers/moment-from-now"],function(e,t,a,r){e["default"]=r["default"].extend({globalAllowEmpty:!!t["default"].get(a["default"],"moment.allowEmpty")})}),define("dummy/helpers/moment-to-now",["exports","ember","dummy/config/environment","ember-moment/helpers/moment-to-now"],function(e,t,a,r){e["default"]=r["default"].extend({globalAllowEmpty:!!t["default"].get(a["default"],"moment.allowEmpty")})}),define("dummy/helpers/moment",["exports","ember","dummy/helpers/moment-format"],function(e,t,a){e["default"]=a["default"].extend({compute:function(){return t["default"].deprecate("ember-moment: `moment` helper has been renamed to `moment-format`"),this._super.apply(this,arguments)}})}),define("dummy/initializers/export-application-global",["exports","ember","dummy/config/environment"],function(e,t,a){function r(){var e=arguments[1]||arguments[0];if(a["default"].exportApplicationGlobal!==!1){var r,n=a["default"].exportApplicationGlobal;r="string"==typeof n?n:t["default"].String.classify(a["default"].modulePrefix),window[r]||(window[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[r]}}))}}e.initialize=r,e["default"]={name:"export-application-global",initialize:r}}),define("dummy/initializers/get-helper",["exports","ember","ember-get-helper/utils/register-helper","ember-get-helper/helpers/get","ember-get-helper/helpers/get-glimmer"],function(e,t,a,r,n){function l(){t["default"].Helper?a.registerHelper("get",n["default"]):a.registerHelper("get",r["default"])}e.initialize=l,e["default"]={name:"get-helper",initialize:l}}),define("dummy/instance-initializers/app-version",["exports","dummy/config/environment","ember"],function(e,t,a){var r=a["default"].String.classify,n=!1;e["default"]={name:"App Version",initialize:function(e){if(!n){var l=r(e.toString());a["default"].libraries.register(l,t["default"].APP.version),n=!0}}}}),define("dummy/models/user-detail",["exports","ember","ember-data","ember-cp-validations"],function(e,t,a,r){var n=a["default"].attr,l=r.buildValidations({firstName:r.validator("presence",!0),lastName:[r.validator("presence",!0),r.validator("dependent",{on:["firstName"]})],dob:[r.validator("presence",!0),r.validator("date",{before:"now",after:"1/1/1900",format:"M/D/YYYY",attributeDescription:"Date of birth",message:function(e,t,a){return"before"===e?"should really be before %@":"after"===e?"should really be after %@":void 0}})],phone:[r.validator("format",{type:"phone",allowBlank:!0})],url:[r.validator("format",{type:"url",allowBlank:!0})]});e["default"]=a["default"].Model.extend(l,{firstName:n("string"),lastName:n("string"),dob:n("date"),phone:n("string"),url:n("string")})}),define("dummy/models/user",["exports","ember","ember-data","ember-cp-validations"],function(e,t,a,r){var n=a["default"].attr,l=r.buildValidations({username:[r.validator("presence",!0),r.validator("length",{max:15})],password:[r.validator("presence",!0),r.validator("length",{min:4,max:8}),r.validator("format",{regex:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/,attributeDescription:"Password",message:"must include at least one upper case letter, one lower case letter, and a number"})],email:[r.validator("presence",!0),r.validator("format",{type:"email"})],emailConfirmation:r.validator("confirmation",{on:"email",message:"do not match",attributeDescription:"Email addresses"}),details:r.validator("belongs-to")});e["default"]=a["default"].Model.extend(l,{username:n("string"),password:n("string"),email:n("string"),details:a["default"].belongsTo("user-detail")})}),define("dummy/router",["exports","ember","dummy/config/environment"],function(e,t,a){var r=t["default"].Router.extend({location:a["default"].locationType});r.map(function(){}),e["default"]=r}),define("dummy/routes/index",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({model:function(e){return this.store.createRecord("user",{details:this.store.createRecord("user-detail")})}})}),define("dummy/templates/application",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"dummy/templates/application.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,a),e.insertBoundary(t,0),r},statements:[["content","outlet",["loc",[null,[1,0],[1,10]]]]],locals:[],templates:[]}}())}),define("dummy/templates/components/validated-input",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:3,column:2},end:{line:5,column:2}},moduleName:"dummy/templates/components/validated-input.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    ");e.appendChild(t,a);var a=e.createElement("span");e.setAttribute(a,"class","valid-input fa fa-check"),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:8,column:6},end:{line:12,column:6}},moduleName:"dummy/templates/components/validated-input.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("          ");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","error");var r=e.createTextNode("\n              ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n          ");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=new Array(1);return r[0]=e.createMorphAt(e.childAt(t,[1]),1,1),r},statements:[["inline","get",[["subexpr","get",[["get","model.validations.attrs",[]],["get","valuePath",["loc",[null,[10,28],[10,37]]]]],[],[]],"message"],[],["loc",[null,[10,14],[10,49]]]]],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:1,column:0},end:{line:14,column:6}},moduleName:"dummy/templates/components/validated-input.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","form-group");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","input-error");var n=e.createTextNode("\n");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");return e.appendChild(a,r),e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[0]),n=new Array(3);return n[0]=e.createMorphAt(r,1,1),n[1]=e.createMorphAt(r,3,3),n[2]=e.createMorphAt(e.childAt(r,[5]),1,1),n},statements:[["inline","input",[],["type",["subexpr","@mut",[["get","type",["loc",[null,[2,15],[2,19]]]]],[],[]],"value",["subexpr","@mut",[["get","rawInputValue",["loc",[null,[2,26],[2,39]]]]],[],[]],"placeholder",["subexpr","@mut",[["get","placeholder",["loc",[null,[2,52],[2,63]]]]],[],[]],"class","form-control","name",["subexpr","@mut",[["get","valuePath",["loc",[null,[2,90],[2,99]]]]],[],[]]],["loc",[null,[2,2],[2,101]]]],["block","if",[["get","isValid",["loc",[null,[3,8],[3,15]]]]],[],0,null,["loc",[null,[3,2],[5,9]]]],["block","if",[["get","showMessage",["loc",[null,[8,12],[8,23]]]]],[],1,null,["loc",[null,[8,6],[12,13]]]]],locals:[],templates:[e,t]}}())}),define("dummy/templates/index",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:13,column:8},end:{line:18,column:8}},moduleName:"dummy/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("            ");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","alert");var r=e.createTextNode("\n              ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","fa fa-times icon-remove"),e.appendChild(a,r);var r=e.createTextNode("\n              Please fix all the errors below before continuing.\n            ");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[1,1]),n=new Array(1);return n[0]=e.createElementMorph(r),n},statements:[["element","action",["dismissAlert"],[],["loc",[null,[15,51],[15,76]]]]],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:9,column:8},end:{line:50,column:6}},moduleName:"dummy/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("      ");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","register"),e.setAttribute(a,"style","display: block;");var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("h2"),n=e.createTextNode("Create an Account");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("        ");e.appendChild(a,r);var r=e.createElement("form"),n=e.createTextNode("\n            ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","section");var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createElement("div");e.setAttribute(l,"class","section-info left");var d=e.createTextNode("\n                  These form inputs are bound to the ");e.appendChild(l,d);var d=e.createElement("strong"),i=e.createTextNode("User");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode(" model which is created in the route's model hook. Each one of these fields has validations to make sure we we recieve the data we want.\n              ");e.appendChild(l,d),e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n            ");e.appendChild(n,l),e.appendChild(r,n);var n=e.createTextNode("\n\n            ");e.appendChild(r,n);var n=e.createElement("h4"),l=e.createTextNode(" About Me");e.appendChild(n,l),e.appendChild(r,n);var n=e.createTextNode("\n\n            ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","section");var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createElement("div");e.setAttribute(l,"class","section-info right");var d=e.createTextNode("\n                  We have a secondary model, ");e.appendChild(l,d);var d=e.createElement("strong"),i=e.createTextNode("User Details");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode(", which holds extra information about our user. This model is part of the ");e.appendChild(l,d);var d=e.createElement("strong"),i=e.createTextNode("User");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode(" model via a belongsTo relationship.\n              ");e.appendChild(l,d),e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("\n            ");e.appendChild(n,l),e.appendChild(r,n);var n=e.createTextNode("\n            ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","section");var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createElement("div");e.setAttribute(l,"class","section-info left last");var d=e.createTextNode("\n                  On submit, a manual validation is run which will validate both the ");e.appendChild(l,d);var d=e.createElement("strong"),i=e.createTextNode("User");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode(" and  ");e.appendChild(l,d);var d=e.createElement("strong"),i=e.createTextNode("User Details");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode(" models. If both are valid, then the user can continue to the next screen.\n              ");e.appendChild(l,d),e.appendChild(n,l);var l=e.createTextNode("\n              ");e.appendChild(n,l);var l=e.createElement("button");e.setAttribute(l,"id","signup");var d=e.createTextNode("Sign Up");e.appendChild(l,d),e.appendChild(n,l);var l=e.createTextNode("\n            ");e.appendChild(n,l),e.appendChild(r,n);var n=e.createTextNode("\n        ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n      ");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[1]),n=e.childAt(r,[5]),l=e.childAt(n,[1]),d=e.childAt(n,[5]),i=e.childAt(n,[7,3]),o=new Array(11);return o[0]=e.createMorphAt(r,3,3),o[1]=e.createMorphAt(l,3,3),o[2]=e.createMorphAt(l,5,5),o[3]=e.createMorphAt(l,7,7),o[4]=e.createMorphAt(l,9,9),o[5]=e.createMorphAt(d,3,3),o[6]=e.createMorphAt(d,5,5),o[7]=e.createMorphAt(d,7,7),o[8]=e.createMorphAt(d,9,9),o[9]=e.createMorphAt(d,11,11),o[10]=e.createElementMorph(i),o},statements:[["block","if",[["get","showAlert",["loc",[null,[13,14],[13,23]]]]],[],0,null,["loc",[null,[13,8],[18,15]]]],["inline","validated-input",[],["model",["subexpr","@mut",[["get","model",["loc",[null,[24,38],[24,43]]]]],[],[]],"valuePath","username","placeholder","Username"],["loc",[null,[24,14],[24,89]]]],["inline","validated-input",[],["type","password","model",["subexpr","@mut",[["get","model",["loc",[null,[25,54],[25,59]]]]],[],[]],"valuePath","password","placeholder","Password"],["loc",[null,[25,14],[25,105]]]],["inline","validated-input",[],["model",["subexpr","@mut",[["get","model",["loc",[null,[26,38],[26,43]]]]],[],[]],"valuePath","email","placeholder","Email"],["loc",[null,[26,14],[26,83]]]],["inline","validated-input",[],["model",["subexpr","@mut",[["get","model",["loc",[null,[27,38],[27,43]]]]],[],[]],"valuePath","emailConfirmation","placeholder","Verify Email"],["loc",[null,[27,14],[27,102]]]],["inline","validated-input",[],["model",["subexpr","@mut",[["get","model.details",["loc",[null,[36,38],[36,51]]]]],[],[]],"valuePath","firstName","placeholder","First Name"],["loc",[null,[36,14],[36,100]]]],["inline","validated-input",[],["model",["subexpr","@mut",[["get","model.details",["loc",[null,[37,38],[37,51]]]]],[],[]],"valuePath","lastName","placeholder","Last Name"],["loc",[null,[37,14],[37,98]]]],["inline","validated-input",[],["model",["subexpr","@mut",[["get","model.details",["loc",[null,[38,38],[38,51]]]]],[],[]],"valuePath","dob","placeholder","Date of Birth"],["loc",[null,[38,14],[38,97]]]],["inline","validated-input",[],["model",["subexpr","@mut",[["get","model.details",["loc",[null,[39,38],[39,51]]]]],[],[]],"valuePath","phone","placeholder","Phone #"],["loc",[null,[39,14],[39,93]]]],["inline","validated-input",[],["model",["subexpr","@mut",[["get","model.details",["loc",[null,[40,38],[40,51]]]]],[],[]],"valuePath","url","placeholder","URL"],["loc",[null,[40,14],[40,87]]]],["element","action",["submit"],[],["loc",[null,[46,34],[46,53]]]]],locals:[],templates:[e]}}(),t=function(){return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:50,column:6},end:{line:56,column:6}},moduleName:"dummy/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("        ");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","registered"),e.setAttribute(a,"style","display: block;");var r=e.createTextNode("\n            ");e.appendChild(a,r);var r=e.createElement("img");e.setAttribute(r,"class","tomster"),e.setAttribute(r,"src","images/tomsterzilla.jpeg"),e.setAttribute(r,"alt",""),e.appendChild(a,r);var r=e.createTextNode("\n            ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","fa fa-check-circle icon-success"),e.appendChild(a,r);var r=e.createTextNode("\n            ");e.appendChild(a,r);var r=e.createElement("h2");e.setAttribute(r,"class","success");var n=e.createTextNode("Success");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),a=function(){return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:58,column:8},end:{line:60,column:8}},moduleName:"dummy/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("          ");e.appendChild(t,a);var a=e.createElement("a");e.setAttribute(a,"class","show-code bottom");var r=e.createElement("i");e.setAttribute(r,"class","fa fa-code"),e.appendChild(a,r);var r=e.createTextNode(" ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode(" ");e.appendChild(a,r);var r=e.createElement("i");e.setAttribute(r,"class","fa fa-code"),e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[1]),n=new Array(2);return n[0]=e.createElementMorph(r),n[1]=e.createMorphAt(r,2,2),n},statements:[["element","action",["showCode"],[],["loc",[null,[59,38],[59,59]]]],["inline","if",[["get","showCode",["loc",[null,[59,92],[59,100]]]],"Hide Code","Show Code"],[],["loc",[null,[59,87],[59,126]]]]],locals:[],templates:[]}}(),r=function(){return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:60,column:8},end:{line:62,column:8}},moduleName:"dummy/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("          ");e.appendChild(t,a);var a=e.createElement("a");e.setAttribute(a,"href","/docs");var r=e.createTextNode("Need Help?");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.8",loc:{source:null,start:{line:1,column:0},end:{line:71,column:6}},moduleName:"dummy/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("a");e.setAttribute(a,"href","https://github.com/offirgolan/ember-cp-validations");var r=e.createElement("img");e.setAttribute(r,"style","position: absolute; top: 0; right: 0; border: 0;"),e.setAttribute(r,"src","https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"),e.setAttribute(r,"alt","Fork me on GitHub"),e.setAttribute(r,"data-canonical-src","https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"),e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","demo");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","info");var n=e.createTextNode("\n        ");e.appendChild(r,n);var n=e.createElement("img");e.setAttribute(n,"src","images/ember-logo-96cc57a28066aa60c12df89c146c07d5.png"),e.setAttribute(n,"alt","Ember"),e.setAttribute(n,"width","250px"),e.appendChild(r,n);var n=e.createTextNode("\n      ");e.appendChild(r,n);var n=e.createElement("h1"),l=e.createTextNode("CP Validations");e.appendChild(n,l),e.appendChild(r,n);var n=e.createTextNode("\n    ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","form");var n=e.createTextNode("\n");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("      ");e.appendChild(r,n);var n=e.createElement("footer"),l=e.createTextNode("\n");e.appendChild(n,l);var l=e.createComment("");e.appendChild(n,l);var l=e.createTextNode("      ");e.appendChild(n,l),e.appendChild(r,n);var n=e.createTextNode("\n    ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div"),r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("pre");e.setAttribute(r,"class","prettyprint");var n=e.createTextNode("\n// models/user.js");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("import Ember from 'ember';");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("import DS from 'ember-data';");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("import {");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  validator, buildValidations");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("}");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("from 'ember-cp-validations';");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("var attr = DS.attr;");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("var Validations = buildValidations({");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  username: [");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    validator('presence', true),");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    validator('length', {");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("      max: 15");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    })");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  ],");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  password: [");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    validator('presence', true),");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    validator('length', {");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("      min: 4,");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("      max: 8");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    }),");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    validator('format', {");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("      regex: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/,");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("      attributeDescription: 'Password',");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("      message: 'must include at least one upper case letter...'");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    })");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  ],");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  email: [");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    validator('presence', true),");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    validator('format', {");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("      type: 'email'");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    })");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  ],");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  emailConfirmation: validator('confirmation', {");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    on: 'email',");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    message: 'do not match',");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("    attributeDescription: 'Email addresses'");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  }),");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  details: validator('belongs-to')");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("});");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("export default DS.Model.extend(Validations, {");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  'username': attr('string'),");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  'password': attr('string'),");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  'email': attr('string'),");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("  'details': DS.belongsTo('user-detail')");e.appendChild(r,n);var n=e.createElement("br");e.appendChild(r,n);var n=e.createTextNode("});\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");return e.appendChild(a,r),e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[2,3]),n=e.childAt(t,[4]),l=new Array(3);return l[0]=e.createMorphAt(r,1,1),l[1]=e.createMorphAt(e.childAt(r,[3]),1,1),l[2]=e.createAttrMorph(n,"class"),l},statements:[["block","unless",[["get","isRegistered",["loc",[null,[9,18],[9,30]]]]],[],0,1,["loc",[null,[9,8],[56,17]]]],["block","unless",[["get","isRegistered",["loc",[null,[58,18],[58,30]]]]],[],2,3,["loc",[null,[58,8],[62,19]]]],["attribute","class",["concat",["section-info bottom code ",["subexpr","if",[["get","showCode",["loc",[null,[67,42],[67,50]]]],"show"],[],["loc",[null,[67,37],[67,59]]]]]]]],locals:[],templates:[e,t,a,r]}}())}),define("dummy/validators/belongs-to",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].canInvoke;e["default"]=a["default"].extend({validate:function(e){return e?n(e,"then")?e.then(function(e){return r(e,"validations")}):r(e,"validations"):!0}})}),define("dummy/validators/collection",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].set,l=t["default"].isArray,d=t["default"].typeOf;
e["default"]=a["default"].extend({init:function(){var e=r(this,"options");"boolean"===d(e)&&n(this,"options",{collection:e}),this._super.apply(this,arguments)},validate:function(e){var t=r(this,"options");return t.collection!==!0||l(e)?t.collection===!1&&l(e)?this.createErrorMessage("singular",t,e):!0:this.createErrorMessage("collection",t,e)}})}),define("dummy/validators/confirmation",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].isEqual,l=t["default"].isNone;e["default"]=a["default"].extend({validate:function(e){var t=r(this,"options"),a=r(this,"model");return l(t.on)||n(e,r(a,t.on))?!0:this.createErrorMessage("confirmation",t,e,t.on)}})}),define("dummy/validators/date",["exports","ember","ember-cp-validations/validators/base","moment"],function(e,t,a,r){var n=t["default"].get,l=t["default"].isEmpty;e["default"]=a["default"].extend({validate:function(e){var t=n(this,"options"),a=t.errorFormat||"MMM Do, YYYY",d=r["default"](),i=r["default"](e);return t.allowBlank&&l(e)?!0:i.isValid()?t.format&&!r["default"](e,t.format,!0).isValid()?this.createErrorMessage("wrongDateFormat",t,e,t.format):("now"===t.before&&(t.before=d),"now"===t.after&&(t.after=d),t.before&&r["default"](t.before)<i?this.createErrorMessage("before",t,e,r["default"](t.before).format(a)):t.after&&r["default"](t.after)>i?this.createErrorMessage("after",t,e,r["default"](t.after).format(a)):!0):this.createErrorMessage("date",t,e)}})}),define("dummy/validators/dependent",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].isNone,l=t["default"].isEmpty;e["default"]=a["default"].extend({validate:function(e){var t=r(this,"options"),a=r(this,"model");if(n(t)||n(a)||l(Object.keys(t)))return!0;if(t.allowBlank&&l(e))return!0;if(l(t.on))return!0;var d=t.on.map(function(e){return r(a,"validations.attrs."+e)});return l(d.filter(function(e){return!r(e,"isTruelyValid")}))?!0:this.createErrorMessage("invalid",t,e)}})}),define("dummy/validators/exclusion",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].typeOf,l=t["default"].isEmpty;e["default"]=a["default"].extend({validate:function(e){var t=r(this,"options"),a=t["in"],d=t.range;if(l(Object.keys(t)))return!0;if(t.allowBlank&&l(e))return!0;if(a&&-1!==a.indexOf(e))return this.createErrorMessage("exclusion",t,e);if(d&&2===d.length){var i=d[0],o=d[1],s=n(e)===n(i)&&n(e)===n(o);if(s&&e>=i&&o>=e)return this.createErrorMessage("exclusion",t,e)}return!0}})}),define("dummy/validators/format",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].isNone,l=t["default"].isEmpty;e["default"]=a["default"].extend({regularExpressions:{email:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,phone:/^([\+]?1\s*[-\/\.]?\s*)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT]?[\.]?|extension)\s*([#*\d]+))*$/,url:/(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/},init:function(){this._super.apply(this,arguments);var e=r(this,"options"),t=r(this,"regularExpressions");e.type&&!n(t[e.type])&&n(e.regex)&&(e.regex=t[e.type])},validate:function(e){var t=r(this,"options");return l(Object.keys(t))?!0:t.allowBlank&&l(e)?!0:t.regex&&!t.regex.test(e)?t.type?this.createErrorMessage(t.type,t,e):this.createErrorMessage("invalid",t,e):!0}})}),define("dummy/validators/has-many",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].canInvoke,n=t["default"].A;e["default"]=a["default"].extend({validate:function(e){return e?r(e,"then")?e.then(function(e){return n(e).getEach("validations")}):e.toArray().getEach("validations"):!0}})}),define("dummy/validators/inclusion",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].typeOf,l=t["default"].isEmpty;e["default"]=a["default"].extend({validate:function(e){var t=r(this,"options"),a=t["in"],d=t.range;if(l(Object.keys(t)))return!0;if(t.allowBlank&&l(e))return!0;if(a&&-1===a.indexOf(e))return this.createErrorMessage("inclusion",t);if(d&&2===d.length){var i=d[0],o=d[1],s=n(e)===n(i)&&n(e)===n(o);if(!s||i>e||e>o)return this.createErrorMessage("inclusion",t)}return!0}})}),define("dummy/validators/length",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].isNone,l=t["default"].isEmpty;e["default"]=a["default"].extend({validate:function(e){var t=r(this,"options");return l(Object.keys(t))?!0:t.allowBlank&&l(e)?!0:n(e)?!0:n(t.is)||t.is===e.length?!n(t.min)&&t.min>e.length?this.createErrorMessage("tooShort",t,e,t.min):!n(t.max)&&t.max<e.length?this.createErrorMessage("tooLong",t,e,t.max):!0:this.createErrorMessage("wrongLength",t,e,t.is)}})}),define("dummy/validators/messages",["exports"],function(e){e["default"]={inclusion:"is not included in the list",exclusion:"is reserved",invalid:"is invalid",confirmation:"doesn't match %@",accepted:"must be accepted",empty:"can't be empty",blank:"can't be blank",present:"must be blank",collection:"must be a collection",singular:"can't be a collection",tooLong:"is too long (maximum is %@ characters)",tooShort:"is too short (minimum is %@ characters)",before:"must be before %@",after:"must be after %@",wrongDateFormat:"must be in the format of %@",wrongLength:"is the wrong length (should be %@ characters)",notANumber:"is not a number",notAnInteger:"must be an integer",greaterThan:"must be greater than %@",greaterThanOrEqualTo:"must be greater than or equal to %@",equalTo:"must be equal to %@",lessThan:"must be less than %@",lessThanOrEqualTo:"must be less than or equal to %@",otherThan:"must be other than %@",odd:"must be odd",even:"must be even",positive:"must be positive",date:"must be a valid date",email:"must be a valid email address",phone:"must be a valid phone number",url:"must be a valid url"}}),define("dummy/validators/presence",["exports","ember","ember-cp-validations/validators/base"],function(e,t,a){var r=t["default"].get,n=t["default"].set,l=t["default"].isEmpty;e["default"]=a["default"].extend({init:function(){var e=r(this,"options");"boolean"==typeof e&&n(this,"options",{presence:e}),this._super.apply(this,arguments)},validate:function(e){var t=r(this,"options");return t.presence===!0&&l(e)?this.createErrorMessage("blank",t,e):t.presence!==!1||l(e)?!0:this.createErrorMessage("present",t,e)}})}),define("dummy/config/environment",["ember"],function(e){var t="dummy";try{var a=t+"/config/environment",r=e["default"].$('meta[name="'+a+'"]').attr("content"),n=JSON.parse(unescape(r));return{"default":n}}catch(l){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("dummy/tests/test-helper"):require("dummy/app")["default"].create({name:"ember-cp-validations",version:"1.1.0+a0bf19d3"});