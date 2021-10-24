import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next'
import { Config } from './interfaces/config';

export const config: Config = {
  buttons: [
    {
      id: 'pi_status',
      label: {
        success: 'Pi on',
        error: 'Pi Off',
      },
      healthCheck: true,
      action: (req: NextApiRequest, res: NextApiResponse) =>{
        if (req.method === 'POST') {
          fs.writeFileSync(`/trigger`, 'b');
        }
      }
    },
    {
      id: 'external_hdd_status',
      label: {
        success: 'HDD Connected',
        error: 'HDD Not Connected',
        pending: 'Checking HDD...',
      },
      healthCheck: async () => {
        await fs.promises.readdir(`/mnt/seagate/plex/data`, 'utf-8');
      }
    },
    {
      id: 'test',
      label: {
        success: 'Test ok',
        error: 'Test error',
        pending: 'Checking test...',
      },
      healthCheck: async () => {
      },
      action: () => true,
    },
  ]
};