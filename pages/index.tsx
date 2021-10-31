
import { config } from '../config';
import Button, { IButtonProps } from '../components/Button';
import { GetStaticProps } from 'next';

interface IndexPageProps {
  title?: string | null;
  buttons: IButtonProps[];
}

const IndexPage = (props: IndexPageProps) => {

  return (
    <div className="container">
      <div className="row">
        {
          props.title &&
          <div className="col-12 d-flex align-items-center justify-content-center mt-4 mb-2">
            <h2>{props.title}</h2>
          </div>
        }
        <div className="col-12 d-flex flex-wrap align-items-start justify-content-center">
          {
            props.buttons?.map(button => (
              <Button
                key={button.id}
                {...button}
              />
            ))
          }
      </div>
    </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () =>  {
  
  return {
    props: {
      title: config.title || null,
      buttons: config.buttons.map(button => ({
        ...button,
        action: button.action ? true : false,
        healthCheck: button.healthCheck ? true : false,
      }))
    },
  }
}

export default IndexPage
