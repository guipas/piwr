import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from '../components/Button'
import axios from 'axios'

const IndexPage = () => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-3">
          <Button
            confirm
            interval={10000}
            getStatus={async () => {
              return axios.get(`/api/pi`).then(r => r.data).catch(() => ({ state : 'error', text: 'Pi Off'}))
            }}
            onClick={async () => {
                axios.post(`/api/pi/reboot`);
            }}
          />
        </div>
        <div className="col-12 col-md-3">
          <Button
            getStatus={async () => axios.get(`/api/hdd`).then(r => r.data)}
          />
        </div>
      </div>
    </div>
  )
}

export default IndexPage
