import { NextApiRequest, NextApiResponse } from "next";

export type Button = {
  id: string;
  labels?: Labels,
  healthCheck?: boolean | Status | ((req: NextApiRequest, res: NextApiResponse) => Status | void | Promise<Status | void>);
  action?: (req: NextApiRequest, res: NextApiResponse) => void | Status | Promise<void | Status>;
}

export type State = 'success' | 'error' | 'pending' | 'confirm';

export type Labels = Partial<Record<State, string>>;

export type Status = {
  state: State;
  text?: string;
}