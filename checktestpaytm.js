// * import checksum generation utility

const checksum_lib = require("paytmchecksum");
var paytmChecksum = "";

// * Create an object from the parameters received in POST
// * received_data should contains all data received in POST

var paytmParams = {};
const received_data = JSON.parse({});
for (var key in received_data) {
  if (key == "CHECKSUMHASH") {
    paytmChecksum = received_data[key];
  } else {
    paytmParams[key] = received_data[key];
  }
}

// * Verify checksum
// * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys

var isValidChecksum = checksum_lib.verifySignature(paytmParams, paytmChecksum);
if (isValidChecksum) {
  console.log("Checksum Matched");
} else {
  console.log("Checksum Mismatched");
}
