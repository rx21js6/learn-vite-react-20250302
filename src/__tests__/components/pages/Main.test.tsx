import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter, useNavigate } from 'react-router-dom' // 修正: react-router ではなく react-router-dom からインポート
import { describe, expect, it, Mock, vi } from 'vitest'
import AppRoutes from '../../../routes'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()), // useNavigate() の戻り値もモック関数にする
  }
})

describe('Main コンポーネント', () => {
  it('遷移', async () => {
    const navigate = vi.fn()
    ;(useNavigate as unknown as Mock).mockReturnValue(navigate)

    const TestWrapper = () => (
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </MockedProvider>
    )

    render(<TestWrapper />)

    // /hello のリンクを取得
    const helloLink = screen.getByText('/hello')

    // クリックイベントを発火
    fireEvent.click(helloLink)

    // navigate('/hello') が呼ばれたか確認
    expect(navigate).toHaveBeenCalledWith('/hello')
  })
})
