export default function (query, variables) {
   const accessToken = process.env.YELP_API_KEY;

   return fetch('https://api.yelp.com/v3/graphql', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query, variables })
   })
      .then((res) => {
         if (!res.ok) {
            return { error: { status: res.status, text: res.statusText } };
         } else {
            return res.json();
         }
      })
      .catch((err) => ({ error: { status: 500, text: err } }));
}
