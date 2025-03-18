import { render, screen, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter, useNavigate } from 'react-router-dom' // 修正: react-router ではなく react-router-dom からインポート
import { describe, expect, it, Mock, vi } from 'vitest'
import AppRoutes from '@/routes'

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
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

describe('外部リンクのテスト', () => {
  it('クリック時に window.open が正しいURLで呼ばれる', () => {
    // .env で設定している値が https://www.github.com であると仮定
    const expectedUrl = 'https://www.github.com'

    // window.open をスパイする（副作用を防ぐためにモック実装を設定）
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

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

    // '/link' のテキストを持つ <a> 要素を取得
    const linkElement = screen.getByText('/link')

    // クリックイベントを発火
    fireEvent.click(linkElement)

    // window.open が正しい引数（expectedUrl, '_blank'）で呼ばれたか検証
    expect(openSpy).toHaveBeenCalledWith(expectedUrl, '_blank')

    // スパイを元に戻す
    openSpy.mockRestore()
  })
})
