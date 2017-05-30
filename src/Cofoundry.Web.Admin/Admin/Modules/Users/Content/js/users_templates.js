angular.module('cms.users').run(['$templateCache',function(t){t.put('../Admin/Modules/Users/Js/Routes/AddUser.html','<cms-page-header cms-title="Create"                 cms-parent-title="{{::vm.userArea.name}} Users"></cms-page-header><cms-form cms-name="mainForm"           ng-submit="vm.save()">    <cms-page-actions>        <cms-button-submit cms-text="Save"                            ng-disabled="vm.mainForm.$invalid"                           cms-loading="vm.globalLoadState.isLoading"></cms-button-submit>        <cms-button cms-text="Cancel"                     ng-click="vm.cancel()"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <cms-form-section cms-title="User Details">            <cms-form-field-text cms-title="First Name"                                 cms-model="vm.command.firstName"                                 maxlength="32"                                 required></cms-form-field-text>            <cms-form-field-text cms-title="Last Name"                                 cms-model="vm.command.lastName"                                 maxlength="32"                                 required></cms-form-field-text>            <cms-form-field-text cms-title="Username"                                 cms-model="vm.command.username"                                 ng-if="::!vm.userArea.useEmailAsUsername"                                 maxlength="150"                                 required></cms-form-field-text>            <cms-form-field-email-address cms-title="Email"                                          cms-model="vm.command.email"                                          ng-if="::vm.userArea.useEmailAsUsername"                                          maxlength="150"                                          required></cms-form-field-email-address>            <cms-form-field-dropdown cms-title="Role"                                     cms-options="vm.roles"                                     cms-option-name="title"                                     cms-option-value="roleId"                                     cms-model="vm.command.roleId"                                     required></cms-form-field-dropdown>        </cms-form-section>    </cms-page-body></cms-form>');
t.put('../Admin/Modules/Users/Js/Routes/UserDetails.html','<cms-page-header cms-title="{{vm.user.firstName}} {{vm.user.lastName}}"                 cms-parent-title="{{vm.userArea.name}} Users"></cms-page-header><cms-form cms-name="mainForm"          cms-edit-mode="vm.editMode"          ng-submit="vm.save()"          cms-loading="vm.formLoadState.isLoading">    <!-- Default toolbar -->    <cms-page-actions ng-show="!vm.editMode">        <cms-button cms-text="Edit"                    ng-click="vm.edit()"                    ng-show="!vm.editMode"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>        <cms-button cms-text="Delete"                    ng-click="vm.deleteUser()"                    ng-disabled="vm.editMode || vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <!-- Edit toolbar -->    <cms-page-actions ng-show="vm.editMode">        <cms-button-submit cms-text="Save"                           ng-show="vm.editMode"                           ng-disabled="vm.mainForm.$invalid || vm.globalLoadState.isLoading"                           cms-loading="vm.saveLoadState.isLoading"></cms-button-submit>        <cms-button cms-text="Cancel"                    ng-click="vm.cancel()"                    ng-show="vm.editMode"                    ng-disabled="vm.globalLoadState.isLoading"></cms-button>    </cms-page-actions>    <!-- Scrollable content area -->    <cms-page-body cms-content-type="form">        <cms-form-status></cms-form-status>        <!--MAIN-->        <cms-form-section cms-title="Main">            <cms-form-field-text cms-title="First Name"                                 cms-model="vm.command.firstName"                                 maxlength="32"                                 required></cms-form-field-text>            <cms-form-field-text cms-title="Last Name"                                 cms-model="vm.command.lastName"                                 maxlength="32"                                 required></cms-form-field-text>            <cms-form-field-text cms-title="Username"                                 cms-model="vm.command.username"                                 ng-if="::!vm.userArea.useEmailAsUsername"                                 maxlength="150"                                 required></cms-form-field-text>            <cms-form-field-email-address cms-title="Email Address"                                          cms-model="vm.command.email"                                          ng-if="::vm.userArea.useEmailAsUsername"                                          maxlength="150"                                          required></cms-form-field-email-address>            <cms-form-field-dropdown cms-title="Role"                                     cms-options="vm.roles"                                     cms-option-name="title"                                     cms-option-value="roleId"                                     cms-model="vm.command.roleId"                                     required></cms-form-field-dropdown>            <cms-form-field-checkbox cms-title="Require Password Change"                               cms-model="vm.command.requirePasswordChange"                               ng-if="::vm.userArea.allowPasswordLogin"></cms-form-field-checkbox>        </cms-form-section>        <!--Logs-->        <cms-form-section cms-title="Logs">            <cms-form-field-container cms-title="Last logged in">                <cms-time-ago cms-time="vm.user.lastLoginDate"></cms-time-ago>            </cms-form-field-container>            <cms-form-field-container cms-title="Password last changed"                                      ng-if="::vm.userArea.allowPasswordLogin">                <cms-time-ago cms-time="vm.user.lastPasswordChangeDate"                              ng-if="vm.user.lastPasswordChangeDate !== vm.user.auditData.createDate"></cms-time-ago>                <span ng-if="vm.user.lastPasswordChangeDate === vm.user.auditData.createDate">Never</span>            </cms-form-field-container>        </cms-form-section>        <!--AUDIT DATA-->        <cms-form-section-audit-data cms-audit-data="::vm.user.auditData"></cms-form-section-audit-data>    </cms-page-body></cms-form>');
t.put('../Admin/Modules/Users/Js/Routes/UserList.html','<!--HEADER--><cms-page-header cms-title="{{vm.userArea.name}} Users"></cms-page-header><cms-page-sub-header>    <cms-page-header-buttons>        <a class="btn-icon" cms-text="Filter"           ng-click="vm.toggleFilter()">            <i class="fa fa-search"></i>        </a>        <!--FILTER-->        <cms-search-filter cms-query="vm.query"                           cms-filter="vm.filter"                           ng-show="vm.isFilterVisible">            <cms-form-field-text cms-title="Name"                                 cms-model="vm.filter.name"></cms-form-field-text>            <cms-form-field-text cms-title="Email"                                 cms-model="vm.filter.email"></cms-form-field-text>        </cms-search-filter>    </cms-page-header-buttons></cms-page-sub-header><!-- Default toolbar --><cms-page-actions>    <cms-button-link class="main-cta"                     cms-text="Create"                     cms-icon="plus"                     cms-href="{{::vm.urlLibrary.userNew(vm.userArea)}}"></cms-button-link>    <cms-pager cms-result="vm.result"               cms-query="vm.query"></cms-pager></cms-page-actions><!-- Scrollable content area --><cms-page-body cms-content-type="form"               cms-sub-header="with-header">    <cms-table-container cms-loading="vm.gridLoadState.isLoading">        <table>            <thead>                <tr>                    <th>Name</th>                    <th>Role</th>                    <th>Last Logged In</th>                    <th>Created</th>                    <th cms-table-column-actions>Actions</th>                </tr>            </thead>            <tbody>                <tr ng-if="!vm.result.items.length">                    <td colspan="100" class="empty">Sorry, no users could be found.</td>                </tr>                <tr ng-repeat="user in vm.result.items">                    <td>                        <cms-user-link cms-user="::user"></cms-user-link>                    </td>                    <td>                        <a href="{{::vm.urlLibrary.roleDetails(user.role.roleId)}}">{{::user.role.title}}</a>                    </td>                    <td>                        <span ng-if="::!user.lastLoginDate">Never</span>                        <cms-time-ago cms-time="::user.lastLoginDate"></cms-time-ago>                    </td>                    <td class="lowPriority">                        <cms-table-cell-created-audit-data cms-audit-data="::user.auditData"></cms-table-cell-created-audit-data>                    </td>                    <td cms-table-column-actions>                        <a href="{{::vm.urlLibrary.userDetails(user.userArea, user.userId)}}" class="btn-icon" title="Edit">                            <i class="fa fa-pencil-square-o"></i>                        </a>                    </td>                </tr>            </tbody>        </table>    </cms-table-container></cms-page-body>');}]);