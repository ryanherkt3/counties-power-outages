# Counties Power Outages Website

This website (https://outages.ryanherkt.com) is built using [Next.js](https://nextjs.org/) - a modern React framework, and hosted on [Vercel](https://vercel.com/). This website / source code is not affiliated with Counties Power.

For a package manager, `npm` is preferred (`Node.js` must also be installed) - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm.

### Installation

To clone the local repository and install the `Node`/`NPM` packages, run:

```bash
npx create-next-app@latest counties-power-outages --use-npm --example "https://github.com/ryanherkt3/counties-power-outages/tree/main"
npm install
```

### Local Development

**Database Setup**

Prior to visiting your localhost site, to see the outages list, you will need your own database to store the entries (as Counties Power no longer allows querying their API on production sites). I use `Neon Postgres` - setup instructions can be found [here](https://neon.tech/docs/get-started-with-neon/connect-neon).

To create the necessary tables, run:
```bash
npm run create-tables
```

**NPM**

To run the code using NPM, start the dev server:
```bash
npm run dev
```

And browse to the link shown in the terminal (usually http://localhost:3000).

If there is no outages list, then visit http://localhost:3000/api/cron to populate the outages database.

**Docker**

Alternatively, if you would like to run the code in a Docker container, run the following commands:

```bash
docker build -t counties-power-outages .
docker run -p 3000:3000 counties-power-outages
```

To kill the container, in a new terminal run:
```bash
docker ps
docker container stop {id}
```
Where `{id}` is the ID of the container currently running.

### Website Features

* Outages page with filters - search for a specific outage by status (Active / Scheduled / Postponed / Cancelled), start and end date, and by the location name.
* Notifications system - subscribe to notifications for outages in your neighbourhood without the need for an account.

**Note:** if developing locally, the notification system requires a database to be set up (e.g. on Vercel via [Neon Postgres](https://neon.tech/)) and `.env` variables for this to work. You will also need a [Resend](https://resend.com/) account to be able to send the notification emails, as well as a purchased domain.

### Future improvements, bug reports, feature requests

Check out the repo's [Issues page](https://github.com/ryanherkt3/counties-power-outages/issues); you are encouraged to create `Issues` here using the appropriate label.