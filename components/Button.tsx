import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';  

interface IButtonStatus {
  state: 'success' | 'error';
  text?: string;
}


export const Button = (props: {
  successTimeout?: number;
  interval?: number;
  onClick?: () => Promise<IButtonStatus | void>;
  loading?: boolean;
  getStatus: () => Promise<IButtonStatus>;
  confirm?: boolean;
}) => {

  const [loading, setLoading] = useState(true);
  // const [pressed, setPressed] = useState<boolean>(false);
  const [status, setStatus] = useState<IButtonStatus>({ state: 'success', text: '' });
  const [confirm, setConfirm] = useState(false);

  

  useEffect(() => {
    console.log('button first status check');
    props.getStatus?.().then(setStatus);
    setLoading(false);
  }, [props.getStatus]);

  const check = async () => {
    console.log('check', loading)
    if (loading) { return; }
    setLoading(true);
    const minWait = new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const status = await props.getStatus();
      setStatus(status);
      await minWait;
    } catch(e) {
      setStatus({
        text: e.toString(),
        state: 'error',
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (props.interval) {
      const int = setInterval(() => {
        check();
      }, props.interval);

      return () => clearInterval(int);
    }
  })

  const handleClick = async () => {
    if (loading) { return; }

    if (props.confirm && !confirm) {
      setConfirm(true)
      setTimeout(() => { setConfirm(false); }, 3000);
      return;
    }
    
    setLoading(true);
    try {
      await props.onClick?.();
    } catch (e) {}
    await check();
    setLoading(false);
    setConfirm(false);
  }

  const state = props.confirm && confirm ? 'error' : status.state;
  const text = props.confirm && confirm ? 'confirm' : status.text;

  return (
    <div
      onClick={handleClick}
      // onMouseDown={() => setPressed(true)}
      // onMouseUp={() => setPressed(false)}
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
              background: loading ? 'rgb(255 200 0)' : state === 'success' ? '#22f133' : state === 'error' ? 'red' : 'rgb(241 241 241)',
              transition: 'all 200ms',
              borderRadius: 2,
              boxShadow: loading ? 'rgba(255, 200, 0, 0.5) 0px 0px 15px 5px' : state === 'success' ? `rgb(135 255 144) 0px 0px 15px 5px` : state === 'error' ? 'rgb(255 144 144) 0px 0px 15px 5px' : '',
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
            {text}
          </small>
        </div>

      </div>
    </div>
  )
}