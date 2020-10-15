//import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn:
  //     "https://34119c06da944bd0ba06423f9a90fc5d@o376216.ingest.sentry.io/5196796",
  // });
}

function log(error) {
  //console.log(error);
  //Sentry.captureException(error);
}

export default {
  init,
  log,
};
