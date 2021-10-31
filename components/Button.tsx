import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';  
import axios from 'axios';

import styles from './Button.module.css';
import { Labels, Status } from '../interfaces/button';


export interface IButtonProps {
  id: string;
  action: boolean;
  healthCheck: boolean;
  labels?: Labels;
}


const Button = (props: IButtonProps) => {

  const [pending, setPending] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>();
  const [status, setStatus] = useState<Status>({ state: 'success', text: '-' });
  const [confirm, setConfirm] = useState(false);

  const interval = 10000000;
  const confirmText = props?.labels?.confirm || 'Click again to confirm';

  const check = async () => {
    if (pending) { return; }

    setPending(true);
    const minWait = new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const { data } = await axios.get(`/api/buttons/${props.id}/check`);
      setStatus({
        text: data?.text || props.labels?.success || '-',
        state: data?.state || 'success',
      });
      await minWait;
    } catch(e: any) {
      setStatus({
        text: e.response?.data?.text || props.labels?.error || e.toString(),
        state: e.response?.data?.state || 'error',
      });
    }
    setPending(false);
  }

  const doAction = async () => {
    if (timeoutId) { // removing the timout that cancel confirmation after a few seconds (see handleClick)
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setStatus({
      text: props.labels?.pending || 'loading...',
      state: 'pending',
    })
    try {
      const { data } = await axios.post(`/api/buttons/${props.id}/action`);
      setStatus({
        text: props.labels?.success, state: 'success',
        ...data,
      });
    } catch (e: any) {
      setStatus({
        text: e.response?.data?.text || e.toString(),
        state: e.response?.data?.state || 'error',
      });
    }
  }

  const handleClick = async () => {
    if (!confirm) {
      setConfirm(true)
      // setting a timout to go back to original tate when user does not confirm after a few second:
      setTimeoutId(setTimeout(() => { setConfirm(false); }, 3000) as any)
      return;
    }
    
    setConfirm(false);
    doAction();
  }

  useEffect(() => {
    check();
    setPending(false);
  }, [props.healthCheck]);
  
  useEffect(() => {
    if (interval) {
      const int = setInterval(check, interval);

      return () => clearInterval(int);
    }
  })

  return (
    <div
      onClick={handleClick}
      className={styles.button}
    >
      <div className={`${styles.led} ${styles[status.state]}`} />
        <div className={styles.text}>
          {confirm ? confirmText : status.text}
        </div>
    </div>
  )
};

export default Button;