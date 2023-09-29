import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // there is 1920 pokemons on total
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};