import { NextApiRequest, NextApiResponse } from 'next'

import { config } from '../../../../config';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query;
  const button = config.buttons.find(b => b.id === id);

  if (button?.healthCheck) {
    if (typeof button.healthCheck === 'function') {
      try {
        const status = await button.healthCheck(req, res);
        
        return res.json(status);
      } catch (e: any) {
        console.error(e);
        return res.status(500).json({ state: 'error' });
      }
    } else {
      return res.json(button.healthCheck);
    }
  }

  return res.status(404).end();
}

export default handler
