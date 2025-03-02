import { useNavigate } from 'react-router-dom'

const Main: React.FC = () => {
  const navigate = useNavigate()
  const onHelloClick = () => {
    navigate('/hello')
  }

  const onHello3Click = () => {
    navigate('/hello3')
  }

  return (
    <div>
      <div>
        <h1>Main</h1>
      </div>
      <div>
        <ul>
          <li>
            <a href="#" onClick={onHelloClick}>
              /hello
            </a>
          </li>
          <li>
            <a href="#" onClick={onHello3Click}>
              /hello3
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Main
