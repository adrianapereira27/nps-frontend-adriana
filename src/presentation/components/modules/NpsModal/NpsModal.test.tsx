import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NpsModal } from './NpsModal'
import axios from 'axios'
import { toast } from 'react-toastify'

// Mock das dependências
vi.mock('axios')
vi.mock('react-toastify', () => ({
  toast: {
    warning: vi.fn(),
    error: vi.fn()
  }
}))

// Mock do componente RatingScale
vi.mock('../../features/RatingScale', () => ({
  RatingScale: ({ score, setScore }: { score: number | null, setScore: (score: number) => void }) => (
    <div data-testid="rating-scale">
      {[0,1,2,3,4,5,6,7,8,9,10].map(value => (
        <button
          key={value}
          onClick={() => setScore(value)}
          data-testid={`rating-button-${value}`}
          className={score === value ? 'selected' : ''}
        >
          {value}
        </button>
      ))}
    </div>
  )
}))

describe('NpsModal', () => {
  const mockSetScore = vi.fn()
  const mockOnReturn = vi.fn()
  const mockLogin = 'testuser'
  const mockQuestion = 'How likely are you to recommend us?'

  beforeEach(() => {
    vi.clearAllMocks()
    // Configuração padrão do mock do axios
    vi.mocked(axios.get).mockResolvedValue({ data: mockQuestion })
  })

  const renderNpsModal = () => {
    return render(
      <NpsModal
        setScore={mockSetScore}
        onReturn={mockOnReturn}
        login={mockLogin}
      />
    )
  }

  describe('Renderização inicial', () => {
    it('deve renderizar componentes básicos', () => {
      renderNpsModal()

      expect(screen.getByText(/Sendo zero não recomendaria e 10 recomendaria totalmente/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Responder depois/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument()
      expect(screen.getByTestId('rating-scale')).toBeInTheDocument()
    })

    it('deve mostrar "Carregando pergunta..." enquanto carrega', () => {
      vi.mocked(axios.get).mockImplementationOnce(() => new Promise(() => {}))
      renderNpsModal()
      
      expect(screen.getByText(/carregando pergunta/i)).toBeInTheDocument()
    })
  })

  describe('Requisição da pergunta', () => {
    it('deve carregar e exibir a pergunta corretamente', async () => {
      renderNpsModal()

      await waitFor(() => {
        expect(screen.getByText(mockQuestion)).toBeInTheDocument()
      })

      expect(axios.get).toHaveBeenCalledWith('https://localhost:7061/api/nps', {
        params: { UserId: mockLogin }
      })
    })

    it('deve mostrar toast de erro quando a requisição falha', async () => {
      const errorMessage = 'Error fetching question'
      vi.mocked(axios.get).mockRejectedValueOnce({ 
        response: { data: errorMessage } 
      })

      renderNpsModal()

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          'Erro ao buscar a pergunta:',
          errorMessage
        )
      })
    })
  })

  describe('Interações do usuário', () => {
    it('deve chamar onReturn quando clicar em "Responder depois"', () => {
      renderNpsModal()
      
      const laterButton = screen.getByRole('button', { name: /Responder depois/i })
      fireEvent.click(laterButton)

      expect(mockOnReturn).toHaveBeenCalled()
    })

    it('deve mostrar aviso quando tentar enviar sem selecionar score', () => {
      renderNpsModal()
      
      const sendButton = screen.getByRole('button', { name: /Enviar/i })
      fireEvent.click(sendButton)

      expect(toast.warning).toHaveBeenCalledWith('Selecione uma nota antes de enviar.')
      expect(mockSetScore).not.toHaveBeenCalled()
    })

    it('deve atualizar score e chamar setScore quando selecionar nota e enviar', async () => {
      renderNpsModal()

      // Seleciona uma nota
      const ratingButton = screen.getByTestId('rating-button-8')
      fireEvent.click(ratingButton)

      // Clica em enviar
      const sendButton = screen.getByRole('button', { name: /Enviar/i })
      fireEvent.click(sendButton)

      expect(mockSetScore).toHaveBeenCalledWith(8)
      expect(toast.warning).not.toHaveBeenCalled()
    })
  })

  describe('Integração com RatingScale', () => {
    it('deve permitir seleção de diferentes notas', () => {
      renderNpsModal()

      // Testa múltiplas seleções
      const ratings = [5, 8, 2]
      ratings.forEach(rating => {
        const ratingButton = screen.getByTestId(`rating-button-${rating}`)
        fireEvent.click(ratingButton)
        
        // Clica em enviar após cada seleção
        const sendButton = screen.getByRole('button', { name: /Enviar/i })
        fireEvent.click(sendButton)

        expect(mockSetScore).toHaveBeenCalledWith(rating)
      })
    })
  })
})