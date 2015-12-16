<?php ?>
<div ng-if='!edit'>
  <table class='table table-hover table-bordered tablesorter'>
    <thead>
      <th>id</th>
      <th>username</th>
      <th>full name</th>
      <th>email</th>
      <th>notes</th>
      <th>group</th>
      <th></th>
    </thead>
    <tbody>
      <tr ng-repeat='u in users'>
        <td>{{u.id}}</td>
        <td>{{u.username}}</td>
        <td>{{u.name}}</td>
        <td>{{u.email}}</td>
        <td>{{u.notes}}</td>
        <td>{{u.group}}</td>
        <td><span class='btn btn-warning' ng-click='doEdit($index)'>edit</span></td>
      </tr>
    </tbody>
  </table>
  <span class='btn btn-info' ng-click='doAdd()'>Add a new user</span>
</div>

<form name='user_edit_form'>
  <div ng-if='edit'>
    <h3>Edit user '{{edit.username}}'</h3>
    <span ng-if='!password'>
      <table class='table table-hover table-bordered tablesorter'>
        <tr>
          <td>Id</td>
          <td>{{edit.id}}</td>
        </tr>
        <tr>
          <td>Username</td>
          <td>
            <input id='newcode' ng-model="edit.username" class="form-control" required autofocus>
          </td>
        </tr>
        <tr>
          <td>Name</td>
          <td>
            <input id='newcode' ng-model="edit.name" class="form-control" required>
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            <input id='newcode' ng-model="edit.email" class="form-control">
          </td>
        </tr>
        <tr>
          <td>Notes</td>
          <td>
            <input id='newcode' ng-model="edit.notes" class="form-control">
          </td>
        </tr>
      </table>
      <span class='btn btn-default' ng-click='doCancel()'>cancel</span>
      <span ng-disabled="user_edit_form.$invalid" class='btn btn-info' ng-click='doSave()'>save</span>
      <span class='btn btn-warning' ng-click='doShowPassword()'>set password</span>
      <span class='btn btn-danger' ng-click='doDelete()'>!!Delete the user!!</span>
    </span>

    <div ng-if='password'>
      <table class='table table-hover table-bordered tablesorter'>
        <tr>
          <td>New password for {{edit.name}}</td>
          <td>
            <input id='newcode' ng-model="pwd.newcode" class="form-control" placeholder="enter new password here" required autofocus>
          </td>
        </tr>
      </table>
      <span class='btn btn-default' ng-click='doCancel()'>cancel</span>
      <span class='btn btn-info' ng-click='doSavePassword()'>save</span>
    </div>
  </div>
</form>
