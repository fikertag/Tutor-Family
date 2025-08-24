export default function Page() {
  const makerequest = async () =>
    fetch("https://api.scorebet.et/sport-data/bet.place/", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        authorization: "Token 2f1247d10e9330c572558de82664ed535302c2b6",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua":
          '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        Referer: "https://scorebet.et/",
      },
      body: '{"selected_odds":[{"gamepick":129964505,"odd_value":1.27},{"gamepick":135541793,"odd_value":1.1}],"stake":10}',
      method: "POST",
    });

  return <button onClick={makerequest}>Make Request</button>;
}
