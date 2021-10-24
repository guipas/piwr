import { NextApiRequest, NextApiResponse } from 'next'

import { config } from '../../../../config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query;
  const button = config.buttons.find(b => b.id === id);

  if (!button?.action) return res.status(404).end();

  try {
    return res.end();
  } catch (err) {
  }
}

export default handler
