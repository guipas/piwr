import { NextApiRequest, NextApiResponse } from "next";

export interface Button {
  id: string;
  label?: Labels,
  healthCheck?: boolean | ((req: NextApiRequest, res: NextApiResponse) => (boolean | void) | Promise<boolean | void>);
  action?: (req: NextApiRequest, res: NextApiResponse) => (boolean | void) | Promise<boolean | void>;
}

export interface Labels {
  success?: string;
  error?: string;
  pending?: string;
  confirm?: string;
}

export interface Config {
  buttons: Button[];
}