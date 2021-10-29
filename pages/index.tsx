import 'bootstrap/dist/css/bootstrap.min.css'

import { config } from '../config';
import Button, { IButtonProps } from '../components/Button';
import { GetStaticProps, GetStaticPropsResult } from 'next';

interface IndexPageProps {
  buttons: IButtonProps[];
}

const IndexPage = (props: IndexPageProps) => {

  console.log('buttons rendered: ', props.buttons);

  return (
    <div className="container d-flex align-items-start justify-content-start">
      {
        props.buttons?.map(button => (
          <Button
            key={button.id}
            {...button}
          />

        ))
      }
    </div>
  )
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () =>  {

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
