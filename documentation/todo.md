# Sync backend with payments
v- Sync file by file, accross a lot of tables
v  - SyncController
- Adapt GetFolder to use the new model
  - action/getFolder
- Adapt the modification actions to send back the sync informations
  - ModelController

# Go further
- Optimistic locking
  - detection -> http 409 (conflict)
  - handling
- Use the version 1.1
- Reactivate the PaymentTest full

# Manage payments
- View
- Add
- Save
- Delete
- Unlock

# New sync system
- If syncDone, get it locally
- If !syncDone, get it remote + store + go back to syncDone
- All actions respond with "sync data", and application auto-refresh from database

# Later
## Requested
- upload new price
- filter on district
- Date of birth (precision to day's)

## Next steps
- on live upload, update the database

- Test e2e: appointment is shown on other screens too
- Test e2e: check "examiner name" initialization
- Test e2e: check "center" initialization
- Test e2e: test unlocking files

- write operations offline
