# Parafin Elements Quickstart

[Parafin Widget](https://docs.parafin.com/capital/present-offers/embedded/reference) is a React component available via the `@parafin/react` npm package that allows you to embed Parafin's capital experience directly within your app. Get up and running in minutes with this quickstart guide.

![Parafin Widget preview](/img/elements-preview.gif)

## Prerequisites

- Access to a [Parafin dashboard](https://dashboard.parafin.com)
- [Node.js](https://nodejs.org/en/)

## Instructions

### 1. Clone repo

First, clone the quickstart repository and install dependencies:

```bash
$ git clone https://github.com/buildparafin/embedded-demo.git
$ cd embedded-demo
$ npm install
$ npm install @parafin/react
$ npm install jwt-decode
```

### 2. Fetch and include API keys

Next, Navigate to the [Settings > API keys](https://dashboard.parafin.com/settings/api-keys) in your Parafin dashboard and fetch your sandbox Client ID and Client secret.

Rename the `sample.env` file to `.env` and populate with your Client ID and Client secret.

```bash
$ mv sample.env .env
```

```bash
# .env
REACT_APP_PARAFIN_CLIENT_ID="<your-client-id>"
REACT_APP.PARAFIN_CLIENT_SECRET="<your-client-secret>"
```

### 3. Run the app

You're now ready to run the app and check out your embedded offer!

In the project directory, run:

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app with an embedded Parafin Widget in your browser.
