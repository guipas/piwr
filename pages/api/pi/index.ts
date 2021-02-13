import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    state: 'success',
    text: 'Pi On'
  });
}

export default handler
