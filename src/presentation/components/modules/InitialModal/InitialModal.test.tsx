import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { InitialModal } from './InitialModal'
import { toast } from 'react-toastify'

// Mock do react-toastify
vi.mock('react-toastify', () => ({
    toast: {
      warning: vi.fn()
    }
  }))

  describe('InitialModal', () => {
    // Função mock para onStart
    const mockOnStart = vi.fn()
  
    // Função helper para renderizar o componente
    const renderInitialModal = () => {
      return render(<InitialModal onStart={mockOnStart} />)
    }

    // Reset dos mocks antes de cada teste
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar todos os elementos corretamente', () => {
    renderInitialModal()

    // Verifica se os elementos principais estão presentes
    expect(screen.getByRole('heading', { name: /pesquisa nps/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/login/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument()
  })

  it('deve iniciar com o botão desabilitado', () => {
    renderInitialModal()

    const startButton = screen.getByRole('button', { name: /start/i })
    expect(startButton).toBeDisabled()
  })

  it('deve habilitar o botão quando houver texto no input', () => {
    renderInitialModal()

    const loginInput = screen.getByPlaceholderText(/login/i)
    const startButton = screen.getByRole('button', { name: /start/i })

    fireEvent.change(loginInput, { target: { value: 'usuarioteste' } })
    
    expect(startButton).toBeEnabled()
  })

  it('deve chamar onStart com o login quando o botão for clicado', () => {
    renderInitialModal()

    const loginInput = screen.getByPlaceholderText(/login/i)
    const startButton = screen.getByRole('button', { name: /start/i })

    fireEvent.change(loginInput, { target: { value: 'usuarioteste' } })
    fireEvent.click(startButton)

    expect(mockOnStart).toHaveBeenCalledWith('usuarioteste')
  })
  
  it('deve atualizar o valor do input conforme digitação', () => {
    renderInitialModal()

    const loginInput = screen.getByPlaceholderText(/login/i)

    fireEvent.change(loginInput, { target: { value: 'u' } })
    expect(loginInput).toHaveValue('u')

    fireEvent.change(loginInput, { target: { value: 'usuario' } })
    expect(loginInput).toHaveValue('usuario')
  })

  it('deve ter o tamanho correto do input', () => {
    renderInitialModal()

    const loginInput = screen.getByPlaceholderText(/login/i)
    expect(loginInput).toHaveAttribute('size', '40')
  })
  
})