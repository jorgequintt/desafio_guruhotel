import yelpGqlFetch from '../../util/yelpGqlFetch';

export default async function handler(req, res) {
   if (req.method === 'GET') {
      const { term, location } = req.query;

      if (!term || term.trim() === '')
         return res.status(400).json({ error: 'You must specify a search term' });
      if (!location || location.trim() === '')
         return res.status(400).json({ error: 'You must specify a location for this search term' });

      const query = `#graphql
        query ($term: String, $location: String){
            search(term: $term, location: $location, limit: 10) {
                total
                business {
                    id
                    alias
                    photos
                    name
                    location {
                        country
                        city
                        state
                        address1
                    }
                    review_count
                    rating
                    display_phone
                }
            }
        }
    `;

      // request to Yelp API
      const response = await yelpGqlFetch(query, { term, location });
      if (response.error) {
         return res.status(response.status).json(response);
      } else {
         res.status(200).json(response);
      }
   } else {
      return res.status(400).json({ error: 'Not a valid request method' });
   }
}
