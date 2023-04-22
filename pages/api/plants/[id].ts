import { NextApiRequest, NextApiResponse } from 'next';
import { data } from '@/data';
import { Plant } from '@/types/Plant';

export default function handler(req: NextApiRequest, res: NextApiResponse<Plant  | { message: string }>) {
  const id = parseInt(req.query.id as string, 10);
  const plant = data.find((plant) => plant.id === id);
  if (plant) {
    res.status(200).json(plant);
  } else {
    res.status(404).json({ message: 'Plant not found' });
  }
}