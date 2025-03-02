import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { FIRST_MUTATION, SECOND_MUTATION } from '../../graphql/mutation'

const Hello3: React.FC = () => {
  const navigate = useNavigate()
  const [firstMutation] = useMutation(FIRST_MUTATION)
  const [secondMutation] = useMutation(SECOND_MUTATION)

  const connect = async () => {
    try {
      const firstResponse = await firstMutation({ variables: { param1: 1 } })
      if (!firstResponse.data.firstMutation.result) {
        navigate('/error')
        return
      }

      const secondResponse = await secondMutation({
        variables: { param1: 1, param2: 'a' },
      })
      if (!secondResponse.data.secondMutation.result) {
        navigate('/error')
        return
      }

      navigate('/success')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      navigate('/error')
    }
  }

  return (
    <div>
      <h1>Hello3</h1>
      <button onClick={connect}>Send Requests</button>
    </div>
  )
}

export default Hello3
