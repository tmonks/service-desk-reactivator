#!/bin/bash

# Get SOLARWINDS_API_KEY from environment variables file
. ./.env

# Get an incident
# curl -H "X-Samanage-Authorization: Bearer $SOLARWINDS_API_KEY" -H "Accept: application/vnd.samanage.v2.1+json" -H "Content-Type: application/json" -X GET https://api.samanage.com/incidents/57271553.json 

# Get comments for an incident
curl -H "X-Samanage-Authorization: Bearer $SOLARWINDS_API_KEY" -H "Accept: application/vnd.samanage.v2.1+json" -H "Content-Type: application/json" -X GET  https://api.samanage.com/incidents/57399763/comments.json 

# Add commment to an incident
# curl -H "X-Samanage-Authorization: Bearer $SOLARWINDS_API_KEY" --data '{ "comment": { "body": "Test comment from curl using Help Desk user with add_callbacks. This should generate an email notification now" }}' -H "Accept: application/vnd.samanage.v2.1+json" -H "Content-Type: application/json" -X POST  https://api.samanage.com/incidents/57399763/comments.json?add_callbacks=true
