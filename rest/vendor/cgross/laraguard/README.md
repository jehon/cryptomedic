# Laraguard WIP

**Attention: breaking changes in v1.0.0, take a look at the bottom of the page**

Adds a permission system to Laravel 5 using the new integrated authentication mechanism. Instead of protecting routes, it protects the controller and its methods. This way you do not expose protected functionality if you forgot to protect a certain route. Controllers are protected with a simple syntax: `ControllerName@MethodName`. If you have a `ClientController.php` and want to add a permission called *client.edit* you would do something like this:
```Yaml
client.edit:
  - Client@edit
  - Client@update
```


Laraguard also supports `*` if you want to allow all methods or all controllers:

```Yaml
client.admin:
  - Client@*

site.admin:
  - "*@*"
```

## Installation

**Composer:**

Integrate this into your laravel projects `composer.json` and execute `composer update`:

```Json
    "require": {
        "cgross/laraguard": "~1.0",
    },
```

**Add middleware:**

Add this line to the `$routeMiddleware` array in `app/Http/Kernel.php`:
```
'laraguard' => 'CGross\Laraguard\Middleware\Permission',
```

**Protect controllers:**

For every controller that you want to protect from unauthorized access call the laraguard middleware in the constructor like this:
```Php
   /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('laraguard');
    }
```


**Extend the User model:**

Extend the `User` model with a method `getPermissions` which returns an array with the users permissions. You might also want to extend the user schema to save permissions in the database. If *Laraguard* is not flexible enough for your needs you can create a new database table for user roles which then references permissions assigned to those roles. Implement it like you want, just make sure the `getPermissions` method exists in the `User` model and that it returns an array with permission names.


## Permissions

Create an new file `resources/config/permissions.yml` with the following content, adapted to your needs:

```Yaml
defaultNoPermissionRoute: /denied
debug: true;
controllerActionPermissions:
  admin:
    - "*@*"
  guest:
    - "Welcome@index"
  user:
    - "Client@index"
    - "Client@show"
  manager:
    - "Client@*"
customPermissions:
    customPermission:
        - /Controller/
    secCust:
        - /Blubb/
testing:
    appEnv: acceptance
    debug: true
    defaultPermissions: null
    temporaryPermissions: ''
    temporaryRequestCounter: 0

```

Note: The default permission for users that are not logged in is `guest`.

**What happens when the user or guest has no permission?**

If the user has no permission for the desired controller method then there are three possibilities:

1. The controller has a method named `permissionDenied`. In this case the method is called. This gives you the ability to display custom permission denied views for different controllers or redirect to some other page
2. The value `defaultNoPermissionRoute` in `permissions.yml` is not `NONE`. In this case the request is redirected to this route
3. Neither a `permissionDenied` nor a `defaultNoPermissionRoute` is set: In this case the response will be a `501 Permission Denied` error page.


## Testing

When testing an app you might want to set some defaultPermissions for testing mode. **Those permissions will only work if you test with the same `APP_ENV` that is specified in `appEnv`.** You can do this with the following entries in `permissions.yml`:

```Yaml
testing:
  appEnv: acceptance
  defaultPermissions: guest,admin,someOtherPermName
```

If you want to set different Permission for different testcases then you need to add the `LaraguardServiceProvider` in `config/app.php`:

```Php
'CGross\Laraguard\Providers\LaraguardServiceProvider',
```

After that you can get a Laraguard instance from the IoC Container:

```Php
$laraguard = \App::make('Laraguard');
// Set some permissions
$laraguard->setTemporaryPermissions(['guest','admin','someOtherPermName']);

// Your test case goes here ...

// Clean up afterwards
$laraguard->resetTemporaryPermissions()

// Or only set temporary permission for X requests
// In this case only the next two requests will have temporary permissions
$laraguard->setTemporaryPermissions(['guest','admin'], 2);
```


### Behat
If you are using `Behat` then try the Laraguard trait:

```Php
use CGross\Laraguard\Behat\Laraguard;

class FeatureContext extends MinkContext implements Context, SnippetAcceptingContext
{
    // Includes the trait
    use Laraguard;

    // Your tests go here
    // Access laraguard like this:
    // self::$laraguard->setTemporaryPermissions($permissionArray, $lifetime);
    // self::$laraguard->resetTemporaryPermissions();
}
```

This trait will automatically clear all temporary permissions after each scenario and if you need you can use `self::$laraguard` in your tests to set or reset permissions. In your behat features you will have the following new expressions available:

```
Scenario: X test permission
  Given I have the permission "admin"

Scenario: XY test permission
  Given I have the permissions "admin,guest,someOtherPerm"

Scenario: XYZ test permission
  Given I have the permissions "admin,guest,someOtherPerm" for 2 requests
```

## Debugging

You can now enabled debugging in your `permissions.yml`. This will print debug output to your laravel log (usually in `storage/log/laravel-YYYY-MM-DD.log`).

```
...
[Date] acceptance.INFO: [Laraguard] REQUEST - ControllerPath: App\Http\Controllers\ClientController@index
[Date] acceptance.INFO: [Laraguard] ALLOW - Allowed permissions: admin,customPermission - User: admin
[Date] acceptance.INFO: [Laraguard] REQUEST - ControllerPath: App\Http\Controllers\Admin\UserAdminController@getCreate
[Date] acceptance.INFO: [Laraguard] TESTING permissions: admin, testing
[Date] acceptance.INFO: [Laraguard] ALLOW - Allowed permissions: admin,customPermission - User: guest,admin,testing
[Date] acceptance.INFO: [Laraguard] REQUEST - ControllerPath: App\Http\Controllers\Admin\UserAdminController@getCreate
[Date] acceptance.INFO: [Laraguard] DENY - Allowed permissions: admin,customPermission - User: guest
[Date] acceptance.INFO: [Laraguard] DENY - with defaultNoPermissionRoute: /denied
...
```

## Breaking changes

Version `v1.0.0` changed `modelActionPermissions` to `controllerActionPermissions` in `permissions.yml`.
