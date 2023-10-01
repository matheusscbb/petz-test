import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.headers['content-type']?.toLowerCase() !== "application/json" && !req.body.hasOwnProperty("id")) {
    res.status(400).end()
    return
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.body.id}`);
    const data = await response.json();

    if (response.status === 200) {
      try {
        const speciesResponse = await fetch(data?.species.url);
        const speciesData = await speciesResponse.json();

        if (speciesResponse.status === 200) {
          res.status(200).json(speciesData.generation.name);
        } else {
          res.status(204).json('Pokemon não encontrado');
        }
      } catch (error) {
        console.error('Error fetching species:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

  } catch (error) {
    console.error('Error fetching pokemon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};