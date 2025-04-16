import { useNavigate } from 'react-router-dom'
import { DummyParts } from '@/components/parts/Emoji'

const Main: React.FC = () => {
  const navigate = useNavigate()
  const onHelloClick = () => {
    navigate('/hello')
  }

  const onHello3Click = () => {
    navigate('/hello3')
  }

  const onHello4Click = () => {
    navigate('/hello4')
  }

  const onFormPageClick = () => {
    navigate('/formPage')
  }

  const onOuterLinkClick = () => {
    const url = import.meta.env.VITE_API_URL
    console.log(url)
    window.open(url, '_blank')
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
          <li>
            <a href="#" onClick={onOuterLinkClick}>
              /link
            </a>
          </li>
          <li>
            <a href="#" onClick={onHello4Click}>
              /hello4
            </a>
          </li>
          <li>
            <a href="#" onClick={onFormPageClick}>
              /formPage
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                navigate('/customDevidedSchemaForm')
              }}
            >
              /customDevidedSchemaForm
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                navigate('/customUniSchemaForm')
              }}
            >
              /customUniSchemaForm
            </a>
          </li>
        </ul>
      </div>
      <div>
        <DummyParts />
      </div>
    </div>
  )
}

export default Main
