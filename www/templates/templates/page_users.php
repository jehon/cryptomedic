<div ng-if='!edit && !password'>
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
        <td>
          <span class='btn btn-default' ng-click='doEdit($index)'>edit</span>
          <span class='btn btn-default' ng-click='doShowPassword($index)'>Change password</span>
        </td>
      </tr>
    </tbody>
  </table>
  <span class='btn btn-default' ng-click='doAdd()'>Add a new user</span>
  <a class='btn btn-default' ng-href='mailto:{{emailAll()}}'>Email everybody</a>
</div>

<form name='user_edit_form'>
  <div ng-if='edit'>
    <h3 ng-if='edit.id >= 0'>Edit user '{{edit.username}}'</h3>
    <h3 ng-if='edit.id < 0'>Creating user</h3>
    <span ng-if='!password'>
      <div class='alert alert-info'>
        When you have created/edited the user, do not forget to set its password by selecting "change password"
        on the main screen.
      </div>
      <div class='alert alert-warning'>
        When the user is selected, it still need to be added in the "Examiner" List. To do so, please ask it to Jean
        at <a href='mailto: marielineet.jean+cryptomedic@gmail.com'>marielineet.jean+cryptomedic@gmail.com</a>.
      </div>
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
      <span ng-disabled="user_edit_form.$invalid" class='btn btn-info' ng-click='doSave()'>create/save</span>
      <span class='btn btn-danger' ng-click='doDelete()'>!!Delete the user!!</span>
      <br>
    </span>
  </div>

  <div ng-if='password'>
    <table class='table table-hover table-bordered tablesorter'>
      <tr>
        <td>New password for {{password.name}}</td>
        <td>
          <input id='newcode' ng-model="password.newcode" class="form-control" placeholder="enter new password here" required autofocus>
        </td>
      </tr>
    </table>
    <span class='btn btn-default' ng-click='doCancel()'>cancel</span>
    <span class='btn btn-info' ng-click='doSavePassword()'>Set password</span>
  </div>
</form>
