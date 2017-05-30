/*! UberCMS 2017-05-30 */
angular.module("cms.documents",["ngRoute","cms.shared"]).constant("_",window._).constant("documents.modulePath","/admin/modules/documents/js/"),angular.module("cms.documents").config(["$routeProvider","shared.routingUtilities","documents.modulePath",function(a,b,c){b.registerCrudRoutes(a,c,"Document")}]),angular.module("cms.documents").factory("documents.documentService",["$http","$upload","shared.documentService",function(a,b,c){function d(a,c,d){var e=_.omit(c,"file");return b.upload({url:a,data:e,file:c.file,method:d})}var e=_.extend({},c);return e.add=function(a){return d(e.getBaseRoute(),a,"POST")},e.update=function(a){return d(e.getIdRoute(a.documentAssetId),a,"PATCH")},e.remove=function(b){return a["delete"](e.getIdRoute(b))},e}]),angular.module("cms.documents").controller("AddDocumentController",["$location","_","shared.focusService","shared.stringUtilities","shared.LoadState","documents.documentService",function(a,b,c,d,e,f){function g(){j(),m.save=h,m.cancel=k,m.onFileChanged=i,m.editMode=!1,m.saveLoadState=new e}function h(){m.saveLoadState.on(),f.add(m.command).progress(m.saveLoadState.setProgress).then(l)["finally"](m.saveLoadState.off)}function i(){var a=m.command;a.file&&a.file.name&&(a.title=d.capitaliseFirstLetter(d.getFileNameWithoutExtension(a.file.name)),a.fileName=d.slugify(a.title),c.focusById("title"))}function j(){m.command={}}function k(){l()}function l(){a.path("")}var m=this;g()}]),angular.module("cms.documents").controller("DocumentDetailsController",["$routeParams","$q","$location","_","shared.LoadState","shared.modalDialogService","documents.documentService","documents.modulePath",function(a,b,c,d,e,f,g,h){function i(){t.edit=j,t.save=k,t.cancel=l,t.remove=m,t.editMode=!1,t.globalLoadState=new e,t.saveLoadState=new e,t.formLoadState=new e(!0),o(t.formLoadState)}function j(){t.editMode=!0,t.mainForm.formStatus.clear()}function k(){r(t.saveLoadState),g.update(t.command).then(n.bind(null,"Changes were saved successfully",t.saveLoadState))["finally"](s.bind(null,t.saveLoadState))}function l(){t.editMode=!1,t.previewDocument=d.clone(t.document),t.command=p(t.document),t.mainForm.formStatus.clear()}function m(){function a(){return r(),g.remove(t.document.documentAssetId).then(q)["catch"](s)}var b={title:"Delete Document",message:"Are you sure you want to delete this document?",okButtonTitle:"Yes, delete it",onOk:a};f.confirm(b)}function n(a,b){return o(b).then(t.mainForm.formStatus.success.bind(null,a))}function o(b){function c(){return g.getById(a.id).then(function(a){t.document=a,t.previewDocument=a,t.command=p(a),t.editMode=!1})}return c().then(s.bind(null,b))}function p(a){return d.pick(a,"documentAssetId","title","fileName","description","tags")}function q(){c.path("")}function r(a){t.globalLoadState.on(),a&&d.isFunction(a.on)&&a.on()}function s(a){t.globalLoadState.off(),a&&d.isFunction(a.off)&&a.off()}var t=this;i()}]),angular.module("cms.documents").controller("DocumentListController",["_","shared.LoadState","shared.SearchQuery","shared.urlLibrary","documents.documentService",function(a,b,c,d,e){function f(){j.gridLoadState=new b,j.query=new c({onChanged:h}),j.filter=j.query.getFilters(),j.toggleFilter=g,j.getDocumentUrl=d.getDocumentUrl,g(!1),i()}function g(b){j.isFilterVisible=a.isUndefined(b)?!j.isFilterVisible:b}function h(){g(!1),i()}function i(){return j.gridLoadState.on(),e.getAll(j.query.getParameters()).then(function(a){j.result=a,j.gridLoadState.off()})}var j=this;f()}]);