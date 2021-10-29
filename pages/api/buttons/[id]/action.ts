import { NextApiRequest, NextApiResponse } from 'next'

import { config } from '../../../../config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query;
  const button = config.buttons.find(b => b.id === id);

  if (!button?.action) return res.status(404).end();

  try {
    const result = await button.action(req, res);
    return res.json({
      state: 'success',
      ...result,
    });
  } catch (err: any) {
    return res.status(500).json({
      state: err.state || 'error',
      text: err.text || null,
    })
  }
}

export default handler
