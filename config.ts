import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next'
import { Config } from './interfaces/config';

export const config: Config = {
  title: 'My Raspberry Pie',
  buttons: [
    {
      id: 'pi_status',
      labels: {
        success: 'On',
        error: 'Off',
        confirm: 'Reboot ?',
        pending: 'Rebooting',
      },
      healthCheck: true,
      action: (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method === 'POST') {
          fs.writeFileSync(`/trigger`, 'b');
        }
      }
    },
    {
      id: 'external_hdd_status',
      labels: {
        success: 'HDD',
        error: 'HDD Disconnected',
        pending: 'Checking HDD...',
      },
      healthCheck: async () => {
        if (process.env.TELEPI_HDD_PATH) {
          await fs.promises.readdir(process.env.TELEPI_HDD_PATH, 'utf-8');
        } else {
          console.error(`Enable to check if the HDD is connnected. The env varible TELEPI_HDD_PATH is not set`);
        }
      }
    },
  ]
};