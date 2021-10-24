import { NextApiRequest, NextApiResponse } from 'next'
// import cp from 'child_process';
import fs from 'fs';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (_req.method === 'POST') {
      // console.log('reboot', _req.method);
      fs.writeFileSync(`/trigger`, 'b');
    }
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}

export default handler
