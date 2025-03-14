# Counties Power Outages Website

This website (https://outages.ryanherkt.com) is built using [Next.js](https://nextjs.org/) - a modern React framework, and hosted on [Vercel](https://vercel.com/).

For a package manager, npm is preferred (Node.js must also be installed) - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm.

### Installation

To clone the local repository and install the Node/NPM packages, run:

```bash
npx create-next-app@latest counties-power-outages --use-npm --example "https://github.com/ryanherkt3/counties-power-outages/tree/main"
npm install
```

### Local Development

```bash
npm run dev
```

And browse to http://localhost:3000.

### Website Features

* Outages page with filters - search for a specific outage by status (Active / Scheduled / Postponed / Cancelled), start and end date, and by the location name.
* Notification system (WIP 🔧) - subscribe to notifications for outages in your neighbourhood without the need for an account.
** **Note:** if developing locally, the notification system requires a database to be set up (e.g. on Vercel via [Neon Postgres](https://neon.tech/)) and `.env` variables for this to work. You will also need a [Resend](https://resend.com/) account to be able to send the notification emails, as well as a purchased domain.

### Future improvements

* Notifications: edit page, unsubscribe page.
* Contact form (for bug reports etc).
* A filter on the outages page for outages per page (configurable to 5 / 10 / 15).

### Bug reports, Feature requests

For any bugs or feature requests, create an issue on the repo's [Issues page](https://github.com/ryanherkt3/counties-power-outages/issues) with the appropriate label.