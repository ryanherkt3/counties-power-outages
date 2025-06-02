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

Prior to visiting your localhost site, to see the outages list, you will need your own database to store the entries (as Counties Power no longer allows querying their API on production sites). I use `Neon Postgres` - setup instructions can be found [here](https://neon.tech/docs/get-started-with-neon/connect-neon).

To create the necessary tables and update the outages list, run:
```bash
npm run create-tables
npm run update-outages
```

Finally, start the dev server:
```bash
npm run dev
```

And browse to http://localhost:3000, or whatever port `NPM` assigns in the case where 3000 is already taken.

### Website Features

* Outages page with filters - search for a specific outage by status (Active / Scheduled / Postponed / Cancelled), start and end date, and by the location name.
* Notifications system - subscribe to notifications for outages in your neighbourhood without the need for an account.

**Note:** if developing locally, the notification system requires a database to be set up (e.g. on Vercel via [Neon Postgres](https://neon.tech/)) and `.env` variables for this to work. You will also need a [Resend](https://resend.com/) account to be able to send the notification emails, as well as a purchased domain.

### Future improvements

* Automate updating the live outages database.
* Contact form (for bug reports etc).
* A filter on the outages page for outages per page (configurable to 5 / 10 / 15).

### Bug reports, Feature requests

For any bugs or feature requests, create an issue on the repo's [Issues page](https://github.com/ryanherkt3/counties-power-outages/issues) with the appropriate label.