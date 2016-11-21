 
# Manage payments
v- Move check about patient_id -> model + use it
v  - CryptomedicModel
  - Test the bill model (for example)
- Add payment model
  - Payment
  - references?
  - Test this

# Sync with payments
- Sync file by file, accross a lot of tables
  - SyncController
  - Worker ???
- Migrate from old model
  - Worker?
- Adapt GetFolder to use the new model
  - action/getFolder
- Optimistic locking
  - detection -> http 409 (conflict)
  - handling

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
