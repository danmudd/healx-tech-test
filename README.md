# Healx Tech Test

Hello! This is my solution for the Healx full stack tech test.

## Folders

* `api` - This is a fully-serverless API using API Gateway, Lambda and DynamoDB to store and serve bookmarked articles for a reading list.
* `ui` - This is a Vue 2 UI using Vuetify and Vuex to interact with PubMed and the bookmark API. 

## Installation

Installation instructions are given in each folder.

## Improvements

I didn't get everything done that I wanted to in the time recommended. A few things need improving and cleaning up. My next steps would be: 

* Improve bookmarks/reading list - it currently just saves the UID of the article. Could be massively improved by retaining data about the article (easy to add to Dynamo!) or re-looking-up all IDs in the reading list using PubMed and populating from there if we don't want to persist that locally.
* Refactor the UI components into smaller chunks - it's currently just large views.
* Implement server-side pagination of results - it currently just retrieves the first 20. PubMed API provides a total count and a "continue" token, I just didn't get round to implementing it.
* Create typing definitions for interactions with the PubMed API.
* Refactor DynamoDB interactions to present a layer of abstraction between database transactions/repository layer and the model layer.