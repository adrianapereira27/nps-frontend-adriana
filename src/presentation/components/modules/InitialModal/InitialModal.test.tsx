import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InitialModal } from './InitialModal';
import { toast } from 'react-toastify';

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    warning: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock fetch global
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock URL.createObjectURL e URL.revokeObjectURL
const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();
global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

describe('Componente InitialModal', () => {
  const mockOnStart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza o componente corretamente', () => {
    render(<InitialModal onStart={mockOnStart} />);
    
    expect(screen.getByText('Pesquisa NPS')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Login')).toBeInTheDocument();
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
    expect(screen.getByText('CSV Log')).toBeInTheDocument();
  });

  it('desabilita o botão Iniciar quando o login está vazio', () => {
    render(<InitialModal onStart={mockOnStart} />);
    
    const startButton = screen.getByText('Iniciar');
    expect(startButton).toBeDisabled();
  });

  it('habilita o botão Iniciar quando o login é fornecido', () => {
    render(<InitialModal onStart={mockOnStart} />);
    
    const loginInput = screen.getByPlaceholderText('Login');
    const startButton = screen.getByText('Iniciar');
    
    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    
    expect(startButton).toBeEnabled();
  });

  it('chama onStart com o login quando o botão Iniciar é clicado', () => {
    render(<InitialModal onStart={mockOnStart} />);
    
    const loginInput = screen.getByPlaceholderText('Login');
    const startButton = screen.getByText('Iniciar');
    
    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.click(startButton);
    
    expect(mockOnStart).toHaveBeenCalledWith('testuser');
  });
  
  it('realiza download de CSV com sucesso', async () => {
    // Configurar resposta mock do fetch
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    const mockResponse = {
      ok: true,
      blob: () => Promise.resolve(mockBlob),
      headers: {
        get: () => 'attachment; filename=test.csv',
      },
    };
    mockFetch.mockResolvedValue(mockResponse);

    // Mock createObjectURL
    mockCreateObjectURL.mockReturnValue('blob-url');

    // Renderizar componente
    render(<InitialModal onStart={mockOnStart} />);
    
    const downloadButton = screen.getByText('CSV Log');
    fireEvent.click(downloadButton);

    // Aguardar operações assíncronas
    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith('Iniciando download...');
      expect(toast.success).toHaveBeenCalledWith('Download realizado com sucesso!');
    });

    // Verificar chamada do fetch
    expect(mockFetch).toHaveBeenCalledWith(
      'https://localhost:7061/api/nps/export', 
      expect.objectContaining({
        method: 'GET',
        headers: { 'Accept': 'application/octet-stream' }
      })
    );
  });

  it('trata erro no download de CSV', async () => {
    // Configurar erro mock do fetch
    const errorMessage = 'Erro de rede';
    mockFetch.mockRejectedValue(new Error(errorMessage));

    render(<InitialModal onStart={mockOnStart} />);
    
    const downloadButton = screen.getByText('CSV Log');
    fireEvent.click(downloadButton);

    // Aguardar operações assíncronas
    await waitFor(() => {
      // Verificar se o toast.error foi chamado com a mensagem correta
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it('desabilita botão de download durante carregamento', async () => {
    // Configurar resposta mock do fetch
    const mockBlob = new Blob(['test data'], { type: 'text/csv' });
    const mockResponse = {
      ok: true,
      blob: () => Promise.resolve(mockBlob),
      headers: {
        get: () => 'attachment; filename=test.csv',
      },
    };
    mockFetch.mockResolvedValue(mockResponse);

    render(<InitialModal onStart={mockOnStart} />);
    
    const downloadButton = screen.getByText('CSV Log');
    fireEvent.click(downloadButton);

    // Botão deve estar desabilitado durante o download
    expect(downloadButton).toBeDisabled();

    // Aguardar operações assíncronas
    await waitFor(() => {
      expect(downloadButton).toBeEnabled();
    });
  });
});