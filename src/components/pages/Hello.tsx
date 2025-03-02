import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Hello: React.FC = () => {
  const navigate = useNavigate()

  const connect = async (param: number) => {
    try {
      const response = await axios.post('/api/data', { param })

      if (response.data.result) {
        navigate('/success') // 成功時に /success へ遷移
      } else {
        navigate('/error') // エラー時に /error へ遷移
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      navigate('/error') // ネットワークエラー時もエラー画面へ
    }
  }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => connect(1)}>Send param 1 (Success)</button>
      <button onClick={() => connect(2)}>Send param 2 (Error)</button>
    </div>
  )
}

export default Hello
