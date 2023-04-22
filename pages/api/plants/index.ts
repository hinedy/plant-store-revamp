import { NextApiRequest, NextApiResponse } from "next";
import { data } from "@/data";
import { Plant } from "@/types/Plant";

export default function handler(req: NextApiRequest, res: NextApiResponse<Plant[]>) {
  res.status(200).json(data);
}