import { NextApiRequest, NextApiResponse } from "next";

export interface Button {
  id: string;
  labels?: Labels,
  healthCheck?: boolean | Status | ((req: NextApiRequest, res: NextApiResponse) => Status | void | Promise<Status | void>);
  action?: (req: NextApiRequest, res: NextApiResponse) => void | Status | Promise<void | Status>;
}

export type States = 'success' | 'error' | 'pending' | 'confirm';

export interface Labels extends Partial<Record<States, string>> {
  success: string;
  error?: string;
  pending?: string;
  confirm?: string;
}

export interface Status {
  state: States
  text?: string;
}

export interface Config {
  buttons: Button[];
}