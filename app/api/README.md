# Counties Power Outages API

### Endpoints

| Endpoint | Method | Description | Required request data
| -------- | ------ | ----------- | -----------------------
| `/getoutages` | `GET` | Get a list of outages
| `/subscription` | `GET` | Get a list of notification subscriptions for a given email. | A valid email address as a search paramater - e.g. `outage?email=test@gmail.com`.
| `/subscription` | `POST` | Add a notification subscription to the database. | A JSON request body containing a valid location, subscription date (TODO what format), latitude and longtitude coordinates, and email address.
| `/subscription` | `DELETE` | Remove a notification subscription from the database. | A JSON request body containing a valid subscription ID.

### Endpoint examples

#### `/getoutages`
```
await fetch(process.env.API_URL +  + '/getoutages');
```

#### `/subscription` (`GET` method)
```
await fetch(process.env.API_URL +  + '/subscription?email=test@gmail.com');
```

#### `/subscription` (`POST` method)
```
await fetch(process.env.API_URL + '/subscription', {
    method: 'POST',
    body: JSON.stringify(
        {
            location: 'Smith St',
            lat: 37.00000,
            lng: 174.00000,
            email: 'test@gmail.com',
            datesubscribed: new Date().toLocaleString(),
            includeCoords: true
        }
    )
});
```

#### `/subscription` (`DELETE` method)
```
await fetch(process.env.API_URL + '/subscription', {
    method: 'DELETE',
    body: JSON.stringify({ id: 1 })
});
```

### Future endpoints

| Endpoint | Method | Description | Required request data
| -------- | ------ | ----------- | -----------------------
| `/subscription` | `PUT` | Edit an existing notification subscription. | A JSON request body containing valid fields to update (unlike the `POST` endpoint in the examples list, not all of them will be required).