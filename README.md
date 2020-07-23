# Solarwinds Service Desk Incident Reactivator

The purpose of this script is to implement functionality in Solarwinds Service Desk for incidents to be placed on hold, and then automatically reactivated when the due date is reached.
It should be scheduled (via cron, etc) to run on a daily basis.
When run, it will find any incidents in the defined state (e.g. "On Hold", "Paused", etc) with a Due Date of today, set their state to "In Progress", and add a comment that the incident has been reactivated, and generate a notification.

## Setup

1. [Generate an API key in Service Desk](https://help-desk-migration.com/help/setup-token-authentication-samanage/) for the user you want to have the updates be made by (must be an Admin)
2. Create a `.env` file with your API key:

```
SOLARWINDS_API_KEY=[paste your API key here, no quotes or brackets]
```

3. Update the state you want to reactivate in the last line of `reactivator.js`. Currently, it uses a custom state called "Paused", but you might want to use "Oh Hold" or something else.

```
activateDueIncidents("On Hold");
```

## How to Run It

```
$ node reactivator.js
```
