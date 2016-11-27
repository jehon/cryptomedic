# New sync system
- Treat the _offline record
- If syncDone, get it locally
- If !syncDone, get it remote + store + go back to syncDone

# Manage payments
- include data in tests backend
- View
- Add
- Save
- Delete
- Unlock

# Go further
- Optimistic locking
  - detection -> http 409 (conflict)
  - handling
- Use the version 1.1
- Reactivate the PaymentTest full

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
