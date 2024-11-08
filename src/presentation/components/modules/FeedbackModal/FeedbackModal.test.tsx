import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { FeedbackModal } from './FeedbackModal'
import axios from 'axios'
import { toast } from 'react-toastify'

// Mock das dependências
vi.mock('axios')
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock do ButtonGroup
vi.mock('../../features/ButtonGroup', () => ({
  ButtonGroup: ({ onSelect }: { onSelect: (value: number) => void }) => (
    <div data-testid="button-group">
      {[1, 2, 3, 4, 5].map(value => (
        <button
          key={value}
          onClick={() => onSelect(value)}
          data-testid={`option-button-${value}`}
        >
          Option {value}
        </button>
      ))}
    </div>
  )
}))

describe('FeedbackModal', () => {
  const mockProps = {
    onFinish: vi.fn(),
    onReturn: vi.fn(),
    login: 'testuser',
    score: 8,
    selectedOption: null as number | null,
    onOptionSelect: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Configuração padrão do mock do axios
    vi.mocked(axios.post).mockResolvedValue({ data: {} })
  })

  const renderFeedbackModal = (props = mockProps) => {
    return render(<FeedbackModal {...props} />)
  }

  describe('Renderização inicial', () => {
    it('deve renderizar componentes básicos', () => {
      renderFeedbackModal()

      expect(screen.getByText(/we appreaciate your feedback/i)).toBeInTheDocument()
      expect(screen.getByText(/how can we improve/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /skip/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/please, if you wish/i)).toBeInTheDocument()
    })

    it('deve mostrar ButtonGroup apenas quando score <= 7', () => {
      // Com score > 7
      renderFeedbackModal()
      expect(screen.queryByTestId('button-group')).not.toBeInTheDocument()

      // Com score <= 7
      renderFeedbackModal({ ...mockProps, score: 6 })
      expect(screen.getByTestId('button-group')).toBeInTheDocument()
    })
  })

  describe('Interações do usuário', () => {
    it('deve atualizar feedback quando o usuário digita no textarea', () => {
      renderFeedbackModal()
      
      const textarea = screen.getByPlaceholderText(/please, if you wish/i)
      fireEvent.change(textarea, { target: { value: 'Great service!' } })

      expect(textarea).toHaveValue('Great service!')
    })

    it('deve chamar onReturn quando clicar em Skip', () => {
      renderFeedbackModal()
      
      const skipButton = screen.getByRole('button', { name: /skip/i })
      fireEvent.click(skipButton)

      expect(mockProps.onReturn).toHaveBeenCalled()
    })

    it('deve chamar onOptionSelect quando uma opção é selecionada', () => {
      renderFeedbackModal({ ...mockProps, score: 6 })
      
      const optionButton = screen.getByTestId('option-button-3')
      fireEvent.click(optionButton)

      expect(mockProps.onOptionSelect).toHaveBeenCalledWith(3)
    })
  })

  describe('Envio de feedback', () => {
    it('deve enviar feedback com sucesso', async () => {
      renderFeedbackModal()
      
      // Digite feedback
      const textarea = screen.getByPlaceholderText(/please, if you wish/i)
      fireEvent.change(textarea, { target: { value: 'Great service!' } })

      // Clique em enviar
      const sendButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(sendButton)

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'https://localhost:7061/api/nps',
          {
            UserId: mockProps.login,
            Score: mockProps.score,
            Description: 'Great service!',
            CategoryNumber: 0 
          }
        )
      })

      expect(toast.success).toHaveBeenCalledWith('Nota enviada com sucesso!')
      expect(mockProps.onFinish).toHaveBeenCalled()
    })

    it('deve lidar com erro no envio', async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(new Error('Network error'))
      renderFeedbackModal()
      
      const sendButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(sendButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Erro ao enviar a nota')
      })

      expect(mockProps.onFinish).not.toHaveBeenCalled()
    })

    it('deve enviar selectedOption quando definido', async () => {
      renderFeedbackModal({ ...mockProps, selectedOption: 3 })
      
      const sendButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(sendButton)

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'https://localhost:7061/api/nps',
          expect.objectContaining({
            CategoryNumber: 3
          })
        )
      })
    })
  })

  describe('Validações de props', () => {
    it('deve renderizar com diferentes scores', () => {
      const scores = [0, 5, 7, 8, 10]
      
      scores.forEach(score => {
        const { container } = renderFeedbackModal({ ...mockProps, score })
        const buttonGroup = screen.queryByTestId('button-group')
        
        if (score <= 7) {
          expect(buttonGroup).toBeInTheDocument()
        } else {
          expect(buttonGroup).not.toBeInTheDocument()
        }
        
        cleanup()
      })
    })
  })
})

