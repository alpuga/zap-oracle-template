const request = require('request');

function requestPromise(
  url: string,
  method: string = 'GET',
  headers: number = -1,
  data: number = -1
) {
  let trans: any = {
    method: method,
    url: url
  };
  if (headers != -1) trans.headers = headers;
  if (data != -1) {
    trans.data = data;
    trans.json = true;
  }
  return new Promise((resolve, reject) => {
    request(trans, (err: any, response: any, data: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

export async function getResponse(query: string, params: string[]) {
  // const { queryId, query, endpoint, subscriber, endpointParams, onchainSub } = event;
  console.log(query);
  console.log(params);
  try {
    let foreignExchangeURL: string = `https://api.exchangeratesapi.io/latest?symbols=${params[0].toUpperCase()},${params[1].toUpperCase()}`;
    // Generate the URL to fetch the JSON from website. Finds the information using the parameters
    const body: any = await requestPromise(foreignExchangeURL);
    // Make a get request to the generated URL to fetch the JSON
    const json: any = JSON.parse(body);
    // Format the JSON to be more accesible
    let base: string;
    let ratesUSD: any;
    let ratesGBP: any;
    let date: string;
    // Initialize the return value as either a string or an integer
    base = json.base;
    ratesUSD = json.rates.USD;
    ratesGBP = json.rates.GBP;
    date = json.date;

    console.log(base);

    return ['' + base, '' + ratesUSD, '' + ratesGBP, '' + date];
  } catch (error) {
    // If an error is encountered, returns an error message
    console.log('error');
    return ['0', 'Unable to access data'];
  }
}
