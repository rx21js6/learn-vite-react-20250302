import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import { DocumentNode } from '@apollo/client'
import { FieldNode } from 'graphql'
import { FIRST_MUTATION, SECOND_MUTATION } from '@/graphql/mutation'
import AppRoutes from '@/routes'

// ヘルパー関数：GraphQL の AST からフィールド名を取得
function getFieldName(query: DocumentNode): string {
  for (const definition of query.definitions) {
    if (definition.kind === 'OperationDefinition') {
      const field = definition.selectionSet.selections.find(
        (sel): sel is FieldNode => sel.kind === 'Field'
      )
      if (field && field.name && field.name.value) {
        return field.name.value
      }
    }
  }
  return ''
}

const createMock = (
  query: DocumentNode,
  variables: Record<string, unknown>,
  result: boolean
) => ({
  request: { query, variables },
  result: { data: { [getFieldName(query)]: { result } } },
  delay: 0,
})

describe('Hello3 コンポーネント (GraphQL)', () => {
  it('両方の通信が成功した場合 /success に遷移', async () => {
    const mocks = [
      createMock(FIRST_MUTATION, { param1: 1 }, true),
      createMock(SECOND_MUTATION, { param1: 1, param2: 'a' }, true),
    ]

    const TestWrapper = () => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/hello3']}>
          <AppRoutes />
        </MemoryRouter>
      </MockedProvider>
    )

    render(<TestWrapper />)

    fireEvent.click(screen.getByText('Send Requests'))

    // Apollo のモック解決のために短い待機を追加
    await new Promise((resolve) => setTimeout(resolve, 0))

    await waitFor(() => {
      expect(screen.getByText('Success Page')).toBeInTheDocument()
    })
  })

  // 1回目失敗のテスト例
  it('1回目の通信が失敗した場合 /error に遷移', async () => {
    const mocks = [createMock(FIRST_MUTATION, { param1: 1 }, false)]

    const TestWrapper = () => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/hello3']}>
          <AppRoutes />
        </MemoryRouter>
      </MockedProvider>
    )

    render(<TestWrapper />)

    fireEvent.click(screen.getByText('Send Requests'))
    await new Promise((resolve) => setTimeout(resolve, 0))
    await waitFor(() => {
      expect(screen.getByText('Error Page')).toBeInTheDocument()
    })
  })

  // 2回目失敗のテスト例
  it('2回目の通信が失敗した場合 /error に遷移', async () => {
    const mocks = [
      createMock(FIRST_MUTATION, { param1: 1 }, true),
      createMock(SECOND_MUTATION, { param1: 1, param2: 'a' }, false),
    ]

    const TestWrapper = () => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/hello3']}>
          <AppRoutes />
        </MemoryRouter>
      </MockedProvider>
    )

    render(<TestWrapper />)

    fireEvent.click(screen.getByText('Send Requests'))
    await new Promise((resolve) => setTimeout(resolve, 0))
    await waitFor(() => {
      expect(screen.getByText('Error Page')).toBeInTheDocument()
    })
  })

  // ネットワークエラー時のテスト例
  it('ネットワークエラー時は /error に遷移する', async () => {
    const mocks = [
      {
        request: { query: FIRST_MUTATION, variables: { param1: 1 } },
        error: new Error('Network Error'),
        delay: 0,
      },
    ]

    const TestWrapper = () => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/hello3']}>
          <AppRoutes />
        </MemoryRouter>
      </MockedProvider>
    )

    render(<TestWrapper />)

    fireEvent.click(screen.getByText('Send Requests'))
    await new Promise((resolve) => setTimeout(resolve, 0))
    await waitFor(() => {
      expect(screen.getByText('Error Page')).toBeInTheDocument()
    })
  })
})
