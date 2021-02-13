import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await fs.promises.readdir(`/mnt/seagate/plex/data`, 'utf-8');

    res.status(200).json({
      state: 'success',
      text: 'HDD Connected'
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      state: 'error',
      text: 'HDD Disconnected',
    });
  }
}

export default handler
