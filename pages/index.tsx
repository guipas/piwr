import 'bootstrap/dist/css/bootstrap.min.css'

import { config } from '../config';
import { IButtonProps, Button2 } from '../components/Button2';

interface IndexPageProps {
  buttons: IButtonProps[];
}

const IndexPage = (props: IndexPageProps) => {

  console.log('buttons rendered: ', props.buttons);

  return (
    <div className="container d-flex align-items-start justify-content-start">
      {/* <Button
        confirm
        interval={10000}
        getStatus={async () => {
          return axios.get(`/api/pi`).then(r => r.data).catch(() => ({ state : 'error', text: 'Pi Off'}))
        }}
        onClick={async () => {
            axios.post(`/api/pi/reboot`);
        }}
      />
      <Button
        getStatus={async () => axios.get(`/api/hdd`).then(r => r.data)}
      /> */}
      {
        props.buttons?.map(button => (
          <Button2
            key={button.id}
            {...button}
          />

        ))
      }
    </div>
  )
}

export async function getStaticProps<IndexPageProps>() {

  console.log('getStaticProps')
  
  return {
    props: {
      buttons: config.buttons.map(button => ({
        ...button,
        action: button.action ? true : false,
        healthCheck: button.healthCheck ? true : false,
      }))
    },
  }
}

export default IndexPage
