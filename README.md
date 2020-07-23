# Solarwinds Service Desk Incident Reactivator

This script will find any incidents in Service Desk in a state of "Paused" and a due date of today, and return them to an "In Progress" state.

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
