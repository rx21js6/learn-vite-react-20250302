import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, vi } from 'vitest'
import AppRoutes from '../../../routes'

describe('Hello4 コンポーネント', () => {
  it('クリック時にFormを動的に生成してPOSTする', async () => {
    // テストの先頭で submit メソッドをモックする
    HTMLFormElement.prototype.submit = vi.fn()

    // HTMLFormElement.prototype.submit の呼び出しをスパイする
    const submitSpy = vi.spyOn(HTMLFormElement.prototype, 'submit')

    const TestWrapper = () => (
      <MemoryRouter initialEntries={['/hello4']}>
        <AppRoutes />
      </MemoryRouter>
    )

    render(<TestWrapper />)
    fireEvent.click(screen.getByText('Create Form and Submit'))
    // 非同期処理のため少し待つ
    await new Promise((resolve) => setTimeout(resolve, 0))

    // フォームが動的に生成され、正しい属性が設定されているか確認
    const form = document.querySelector('form')
    expect(form).toBeInTheDocument()
    expect(form?.getAttribute('action')).toEqual(import.meta.env.VITE_API_URL)
    expect(form?.getAttribute('method')).toEqual('POST')

    // submit メソッドが呼ばれたか確認
    expect(submitSpy).toHaveBeenCalled()

    // スパイをリセット
    submitSpy.mockRestore()
  })
})
