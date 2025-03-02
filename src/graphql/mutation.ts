import { gql } from '@apollo/client'

export const FIRST_MUTATION = gql`
  mutation FirstMutation($param1: Int!) {
    firstMutation(param1: $param1) {
      result
    }
  }
`

export const SECOND_MUTATION = gql`
  mutation SecondMutation($param1: Int!, $param2: String!) {
    secondMutation(param1: $param1, param2: $param2) {
      result
    }
  }
`
