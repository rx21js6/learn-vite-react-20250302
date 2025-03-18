import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import AppRoutes from '@/routes'

// axios のモック
vi.mock('axios')

describe('Hello コンポーネント', () => {
  it('param: 1 を送ると /success に遷移する', async () => {
    const axiosPostMock = vi
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: { result: true } })

    const TestWrapper = () => (
      <MemoryRouter initialEntries={['/hello']}>
        <AppRoutes />
      </MemoryRouter>
    )

    render(<TestWrapper />)

    fireEvent.click(screen.getByText('Send param 1 (Success)'))

    await waitFor(() => {
      expect(screen.getByText('Success Page')).toBeInTheDocument()
    })

    expect(axiosPostMock).toHaveBeenCalledWith('/api/data', { param: 1 })
  })

  it('param: 2 を送ると /error に遷移する', async () => {
    const axiosPostMock = vi
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: { result: false } })

    const TestWrapper = () => (
      <MemoryRouter initialEntries={['/hello']}>
        <AppRoutes />
      </MemoryRouter>
    )

    render(<TestWrapper />)

    fireEvent.click(screen.getByText('Send param 2 (Error)'))

    await waitFor(() => {
      expect(screen.getByText('Error Page')).toBeInTheDocument()
    })

    expect(axiosPostMock).toHaveBeenCalledWith('/api/data', { param: 2 })
  })

  it('ネットワークエラー時は /error に遷移する', async () => {
    const axiosPostMock = vi
      .spyOn(axios, 'post')
      .mockRejectedValue(new Error('Network Error'))

    const TestWrapper = () => (
      <MemoryRouter initialEntries={['/hello']}>
        <AppRoutes />
      </MemoryRouter>
    )

    render(<TestWrapper />)

    fireEvent.click(screen.getByText('Send param 1 (Success)'))

    await waitFor(() => {
      expect(screen.getByText('Error Page')).toBeInTheDocument()
    })

    expect(axiosPostMock).toHaveBeenCalledWith('/api/data', { param: 1 })
  })
})
