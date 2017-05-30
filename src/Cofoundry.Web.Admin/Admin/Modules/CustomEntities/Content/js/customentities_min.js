/*! UberCMS 2017-05-30 */
angular.module("cms.customEntities",["ngRoute","cms.shared"]).constant("_",window._).constant("customEntities.modulePath","/Admin/Modules/CustomEntities/Js/"),angular.module("cms.customEntities").config(["$routeProvider","shared.routingUtilities","customEntities.modulePath",function(a,b,c){b.registerCrudRoutes(a,c,"CustomEntity")}]),angular.module("cms.customEntities").controller("AddCustomEntityController",["$scope","$location","$q","$window","shared.stringUtilities","shared.LoadState","shared.customEntityService","shared.urlLibrary","customEntities.options",function(a,b,c,d,e,f,g,h,i){function j(){s.globalLoadState=new f,s.saveLoadState=new f,s.saveAndPublishLoadState=new f,s.formLoadState=new f(!0),s.editMode=!1,s.options=i,s.saveButtonText=i.autoPublish?"Save":"Save & Publish",s.save=k.bind(null,!1,n),s.saveAndPublish=k.bind(null,!0,n),s.saveAndEdit=k.bind(null,!0,o),s.cancel=m,s.onNameChanged=l,p()}function k(a,b){var c;a?(s.command.publish=!0,c=s.saveAndPublishLoadState):c=s.saveLoadState,q(c),g.add(s.command,i.customEntityDefinitionCode).then(b)["finally"](r.bind(null,c))}function l(){s.command.urlSlug=e.slugify(s.command.title)}function m(){b.path("/")}function n(a){b.path("/"+a)}function o(a){function b(a){d.location.href=h.customEntityVisualEditor(a,!0)}return g.getById(a).then(b)}function p(){function b(a){s.command.model={},s.formDataSource={model:s.command.model,modelMetaData:a}}function c(a){s.pageRoutes=a}var d=g.getDataModelSchema(i.customEntityDefinitionCode).then(b),e=g.getPageRoutes(i.customEntityDefinitionCode).then(c);s.formLoadState.offWhen(d,e),s.command={},a.$watch("vm.command.localeId",function(a){a?s.additionalParameters={localeId:a}:s.additionalParameters={}})}function q(a){s.globalLoadState.on(),a&&_.isFunction(a.on)&&a.on()}function r(a){s.globalLoadState.off(),a&&_.isFunction(a.off)&&a.off()}var s=this;j()}]),angular.module("cms.customEntities").controller("CustomEntityDetailsController",["$routeParams","$q","$location","_","shared.LoadState","shared.modalDialogService","shared.entityVersionModalDialogService","shared.customEntityService","shared.urlLibrary","customEntities.modulePath","customEntities.options",function(a,b,c,d,e,f,g,h,i,j,k){function l(){D.edit=m,D.save=n.bind(null,!1),D.saveAndPublish=n.bind(null,!0),D.cancel=o,D.publish=p,D.unpublish=q,D.discardDraft=r,D.copyToDraft=s,D.deleteCustomEntity=t,D.changeUrl=u,D.editMode=!1,D.globalLoadState=new e,D.saveLoadState=new e,D.saveAndPublishLoadState=new e,D.formLoadState=new e(!0),D.options=k,D.urlLibrary=i,D.saveButtonText=k.autoPublish?"Save":"Save & Publish",D.canChangeUrl=!k.autoGenerateUrlSlug||k.hasLocale,x(D.formLoadState)}function m(){D.editMode=!0,D.mainForm.formStatus.clear()}function n(a){var b;a?(D.updateCommand.publish=!0,b=D.saveAndPublishLoadState):b=D.saveLoadState,A(b),h.updateDraft(D.updateCommand,k.customEntityDefinitionCode).then(v.bind(null,"Changes were saved successfully"))["finally"](B.bind(null,b))}function o(){D.editMode=!1,D.updateCommand=y(D.customEntity),D.mainForm.formStatus.clear()}function p(){g.publish(D.customEntity.customEntityId,A,F).then(v.bind(null,k.nameSingular+" published successfully."))["catch"](B)}function q(){g.unpublish(D.customEntity.customEntityId,A,F).then(v.bind(null,"The "+E+" has been unpublished and reverted to draft state."))["catch"](B)}function r(){function a(){return A(),h.removeDraft(D.customEntity.customEntityId)}var b={title:"Discard Version",message:"Are you sure you want to discard this draft? This will discard all changes since it was last published.",okButtonTitle:"Yes, discard it",onOk:a};f.confirm(b).then(v.bind(null,"Draft discarded successfully"))}function s(a){function b(){v("Draft created successfully.")}var c=!!w();g.copyToDraft(D.customEntity.customEntityId,a.customEntityVersionId,c,A,F).then(b)["catch"](B)}function t(){function a(){return A(),h.remove(D.customEntity.customEntityId).then(z)["catch"](B)}var b={title:"Delete "+k.nameSingular,message:"Are you sure you want to delete this "+E+"?",okButtonTitle:"Yes, delete it",onOk:a};f.confirm(b)}function u(){f.show({templateUrl:j+"Routes/Modals/ChangeUrl.html",controller:"ChangeUrlController",options:{customEntity:D.customEntity,onSave:v.bind(null,"Url Changed")}})}function v(a,b){return x(b).then(D.mainForm.formStatus.success.bind(null,a))}function w(){return d.find(D.versions,function(a){return"Draft"===a.workFlowStatus})}function x(c){function d(a){var b=a[0],c=a[1];C=a[2],D.customEntity=b,D.versions=c,D.updateCommand=y(b),D.customEntity.locale?D.additionalParameters={localeId:D.customEntity.locale.localeId}:D.additionalParameters={},D.editMode=!1}function e(){return h.getDataModelSchema(k.customEntityDefinitionCode)}function f(){return h.getById(a.id)}function g(){return h.getVersionsByCustomEntityId(a.id)}return b.all([f(),g(),e()]).then(d).then(B.bind(null,c))}function y(a){var b={customEntityId:a.customEntityId,title:a.latestVersion.title,model:angular.copy(a.latestVersion.model)};return D.formDataSource={model:b.model,modelMetaData:C},b}function z(){c.path("")}function A(a){D.globalLoadState.on(),a&&d.isFunction(a.on)&&a.on()}function B(a){D.globalLoadState.off(),a&&d.isFunction(a.off)&&a.off()}var C,D=this,E=k.nameSingular.toLowerCase(),F={entityNameSingular:k.nameSingular,isCustomEntity:!0};l()}]),angular.module("cms.customEntities").controller("CustomEntityListController",["_","shared.LoadState","shared.SearchQuery","shared.modalDialogService","shared.customEntityService","customEntities.modulePath","customEntities.options",function(a,b,c,d,e,f,g){function h(){m.options=g,m.gridLoadState=new b,m.query=new c({onChanged:k}),m.filter=m.query.getFilters(),m.toggleFilter=i,m.changeOrdering=j,i(!1),l()}function i(b){m.isFilterVisible=a.isUndefined(b)?!m.isFilterVisible:b}function j(){d.show({templateUrl:f+"Routes/Modals/ChangeOrdering.html",controller:"ChangeOrderingController",options:{localeId:m.filter.localeId,onSave:l}})}function k(){i(!1),l()}function l(){return m.gridLoadState.on(),e.getAll(m.query.getParameters(),g.customEntityDefinitionCode).then(function(a){m.result=a,m.gridLoadState.off()})}var m=this;h()}]);