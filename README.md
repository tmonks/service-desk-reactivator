# Solarwinds Service Desk Incident Reactivator

This script will allow you to set incidents in Solarwinds Service Desk to an on hold state, set a Due Date and then have them automatically reactivated to "In Progress" when that date is reached.
It fill find any incidents in the defined state and a due date of today, set their state to "In Progress", and add a comment that the incident has been reactivated (which will also generate a notification).

## Setup

1. [Generate an API token in Service Desk](https://help-desk-migration.com/help/setup-token-authentication-samanage/)
2. Create a `.env` file with your API key.

```
SOLARWINDS_APIKEY=[paste your API key here, no quotes needed]
```

3. Update the state you want to reactivate in the last line of `reactivator.js`. We used a custom state called "Paused", but you might want to use "Oh Hold" or something else.

```
activateDueIncidents("On Hold");
```

## How to run it

```
$ node reactivator.js
```
