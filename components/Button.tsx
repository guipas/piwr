import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';  
import axios from 'axios';
import { Labels, States } from '../interfaces/config';

interface IButtonStatus {
  state: States;
  text?: string;
}

export interface IButtonProps {
  id: string;
  action: boolean;
  healthCheck: boolean;
  labels?: Labels;
}


export default (props: IButtonProps) => {

  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<IButtonStatus>({ state: 'success', text: '-' });
  const [confirm, setConfirm] = useState(false);

  const interval = 10000000;
  const confirmText = props?.labels?.confirm || 'Click again to confirm';
  

  useEffect(() => {
    console.log('button first status check');
    check();
    setPending(false);
  }, [props.healthCheck]);

  const check = async () => {
    console.log('check', pending)
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
    if (!confirm) {
      setConfirm(true)
      setTimeout(() => { setConfirm(false); }, 3000);
      return;
    }
    
    setConfirm(false);
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

  useEffect(() => {
    if (interval) {
      const int = setInterval(check, interval);

      return () => clearInterval(int);
    }
  })

  return (
    <div
      onClick={doAction}
      style={{
        margin: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '120px',
        height: '120px',
        // border: `3px solid ${success === true ? '#3fce4a' : success === false ? '#ffdddd' : '#dddddd'}`,
        cursor: 'pointer',
        boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
        borderRadius: 20,
      }}
    >
      <div style={{ width: '100%' }} className="pt-2">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div 
            style={{
              height: 10,
              width: 20,
              background: pending ? 'rgb(255 200 0)' : status.state === 'success' ? '#22f133' : status.state === 'error' ? 'red' : 'rgb(241 241 241)',
              transition: 'all 200ms',
              borderRadius: 2,
              boxShadow: pending ? 'rgba(255, 200, 0, 0.5) 0px 0px 15px 5px' : status.state === 'success' ? `rgb(135 255 144) 0px 0px 15px 5px` : status.state === 'error' ? 'rgb(255 144 144) 0px 0px 15px 5px' : '',
              marginBottom: 10,
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'hidden',
              justifyContent: 'center'
            }}
          >
          </div>

        </div>
        <div className="text-center p-2 pb-0 text-break">
          <small>
            {confirm ? confirmText : status.text}
          </small>
        </div>

      </div>
    </div>
  )
}