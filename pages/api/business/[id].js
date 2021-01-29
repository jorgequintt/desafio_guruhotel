import yelpGqlFetch from '../../../lib/yelpGqlFetch';

export default async function handler(req, res) {
   if (req.method === 'GET') {
      const { id } = req.query;

      if (!id) res.status(400).json({ error: 'You must specify an id' });

      const query = `#graphql
        query ($id: String){
            business(id: $id) {
                price
                hours {
                    is_open_now
                    open {
                        end
                        start
                    }
                }
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

      // request to Yelp API
      const response = await yelpGqlFetch(query, { id });
      if (response.error) {
         return res.status(response.status).json(response);
      } else {
         res.status(200).json(response);
      }
   } else {
      res.status(400).json({ error: 'Not a valid request method' });
   }
}
