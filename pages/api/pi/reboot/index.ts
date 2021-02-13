import { NextApiRequest, NextApiResponse } from 'next'
import cp from 'child_process';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // if (_req.method === 'POST') {
      // cp.exec(`reboot`);
      console.log('reboot', _req.method);
    // }
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}

export default handler
