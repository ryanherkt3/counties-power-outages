# Counties Power Outages API

### Endpoints

| Endpoint | Method | Description | Required request data
| -------- | ------ | ----------- | -----------------------
| `/getoutages` | `GET` | Get a list of outages

### Endpoint examples

#### `/getoutages` (`GET` method)
```
await fetch(process.env.API_URL +  + '/getoutages');
```

### Future endpoints

| Endpoint | Method | Description | Required request data
| -------- | ------ | ----------- | -----------------------
| `/subscription` | `GET` | Get a list of notification subscriptions for a given email. | A valid email address as a search paramater - e.g. `outage?email=test@gmail.com`.
| `/subscription` | `POST` | Add a notification subscription to the database. | A JSON request body containing a valid location, subscription date, latitude and longtitude coordinates, and email address.
| `/subscription` | `DELETE` | Remove a notification subscription from the database. | A JSON request body containing a valid subscription ID.
| `/subscription` | `PUT` | Edit an existing notification subscription. | A JSON request body containing valid fields to update.