export default function handler(req, res) {
   if (req.method === 'GET') {
      const { id } = req.query;

      if (!id) res.status(400).json({ error: 'You must specify an id' });

      const gqlQuery = `#graphql
      {
        business(id: $businessId) {
            price
            hours
            is_closed
            reviews {
                rating
                text
                user {
                    name
                }
            }
        }
     }`;
   } else {
      res.status(400).json({ error: 'Not a valid request method' });
   }
}
