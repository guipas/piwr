import { NextApiRequest, NextApiResponse } from 'next'

import { config } from '../../../../config';
import { Status } from '../../../../interfaces/button';

const handler = async (req: NextApiRequest, res: NextApiResponse<Status>) => {

  const { id } = req.query;
  const button = config.buttons.find(b => b.id === id);

  if (button?.healthCheck) {
    if (typeof button.healthCheck === 'function') {
      try {
        const status = await button.healthCheck(req, res);
        
        return res.json({
          state: 'success',
          ...status,
        });
      } catch (e: any) {
        console.error(e);
        return res.status(500).json({ 
          state: e.state || 'error',
          text: e.text || null,
        });
      }
    } else {
      return res.json({
        state: 'success',
      });
    }
  }

  return res.status(404).end();
}

export default handler
