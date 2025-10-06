# Counties Power Outages API

### Endpoints

| Endpoint | Method | Description | Required request data
| -------- | ------ | ----------- | -----------------------
| `/getoutages` | `GET` | Get a list of outages
| `/subscription` | `GET` | Get a list of notification subscriptions for a given email, or a specific one with an ID. | A valid email address, or ID, as a search paramater - e.g. `subscription?email=test@gmail.com`, `subscription?id=1234`. The ID argument always takes priority.
| `/subscription` | `POST` | Add a notification subscription to the database. | A JSON request body containing a valid location, subscription date, latitude and longtitude coordinates, and email address.
| `/subscription` | `DELETE` | Remove a notification subscription from the database. | A JSON request body containing a valid subscription ID.
| `/subscription` | `PUT` | Edit an existing notification subscription. | A JSON request body containing an ID, a flag to include coordinates, and the fields the user has updated (unlike the `POST` endpoint in the examples list, not all of them will be required).

**IMPORTANT:** All endpoints must include an **'Authorization': `Bearer ${your_auth_token}`** header, and `your_auth_token` must also match the production token; otherwise the API requests will not work.

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
            email: 'test@gmail.com',
            hasCoordinates: true,
            latitude: 37.00000,
            longtitude: 174.00000,
            datesubscribed: new Date().toLocaleString(),
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
            hasCoordinates: true,
            location: 'Smith St',
            email: 'test@gmail.com',
            latitude: 37.00000,
            longtitude: 174.00000,
            datesubscribed: new Date().toLocaleString(),
        }
    )
});
```

### Private endpoints

| Endpoint | Method | Description
| -------- | ------ | -----------
| `/cron` | `GET` | Runs the cron job to send emails to users with subscriptions. Should only be invoked via Vercel.


### Bypassing the Authorization check

To test any API endpoint locally, bypassing the `Authorization` check is doable by commenting out the following lines of code:
```
const authHeader = request.headers.get('authorization');

if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
        status: 401,
    });
}
```
This approach is **discouraged** for production builds, due to security implications of allowing any website (any origin) to access the API endpoints.