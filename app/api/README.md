# Counties Power Outages API

### Endpoints

| Endpoint | Method | Description | Required request data
| -------- | ------ | ----------- | -----------------------
| `/getoutages` | `GET` | Get a list of outages
| `/subscription` | `GET` | Get a list of notification subscriptions for a given email, or a specific one with an ID. | A valid email address, or ID, as a search paramater - e.g. `subscription?email=test@gmail.com`, `subscription?id=1234`. The ID argument always takes priority.
| `/subscription` | `POST` | Add a notification subscription to the database. | A JSON request body containing a valid location, subscription date, latitude and longtitude coordinates, and email address.
| `/subscription` | `DELETE` | Remove a notification subscription from the database. | A JSON request body containing a valid subscription ID.
| `/subscription` | `PUT` | Edit an existing notification subscription. | A JSON request body containing an ID, a flag to include coordinates, and the fields the user has updated (unlike the `POST` endpoint in the examples list, not all of them will be required).
### Endpoint examples

#### `/getoutages`
```
await fetch(process.env.API_URL + '/getoutages');
```

#### `/subscription` (`GET` method)
```
await fetch(process.env.API_URL + '/subscription?email=test@gmail.com');

await fetch(process.env.API_URL + '/subscription?id=12345');
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

#### `/subscription` (`PUT` method)
```
await fetch(process.env.API_URL + '/subscription', {
    method: 'PUT',
    body: JSON.stringify(
        {
            id: 1,
            includeCoords: true
            // Optional fields
            location: 'New Rd',
            lat: 37.00000,
            lng: 174.00000,
        }
    )
});
```

### Private endpoints

| Endpoint | Method | Description
| -------- | ------ | -----------
| `/cron` | `GET` | Runs the cron job to send emails to users with subscriptions. Should only be invoked via Vercel.

To test this endpoint locally, create another terminal after invoking `npm run dev` and run:

Windows Powershell:
```
Invoke-WebRequest -Uri http://localhost:3000/api/cron -Headers @{'Authorization' = 'Bearer <CRON_SECRET>'}
```

Linux (or any terminal that can send `curl` requests):
```
curl -I -H "Authorization: Bearer <CRON_SECRET>" http://localhost:3000/api/cron
```