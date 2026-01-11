import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Next.js router
const mockPush = jest.fn();
const mockParams = { id: 'mol-001' };

jest.mock('next/navigation', () => ({
  useParams: () => mockParams,
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
  }),
}));

// Mock fetch
global.fetch = jest.fn();

// Mock ADMETRadarChart component
jest.mock('@/components/ADMETRadarChart', () => ({
  ADMETRadarChart: ({ data }: any) => (
    <div data-testid="radar-chart">
      Radar Chart with {data.length} data points
    </div>
  ),
}));

// Import after mocks
import ADMETPage from '../../app/molecule/[id]/admet/page';

describe('ADMET Page', () => {
  const mockADMETResponse = {
    smiles: 'CC(=O)Oc1ccccc1C(=O)O',
    absorption: 0.85,
    distribution: 0.72,
    metabolism: 0.68,
    excretion: 0.79,
    toxicity: 0.91,
    overall_score: 0.79,
    details: {
      caco2_permeability: 8.5,
      bioavailability: 0.72,
      bbb_penetration: 0.15,
      pgp_substrate: false,
      cyp_inhibition: ['CYP3A4'],
      half_life: 2.5,
      clearance: 15.3,
      ld50: 1200,
      herg_inhibition: false,
      hepatotoxicity: false,
      skin_sensitization: false,
    },
    timestamp: '2026-01-11T12:00:00',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockADMETResponse,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    render(<ADMETPage />);
    expect(screen.getByText('ADMET 예측 중...')).toBeInTheDocument();
  });

  it('fetches and displays ADMET results', async () => {
    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('ADMET 예측 결과')).toBeInTheDocument();
    });

    expect(screen.getByText('ADMET 프로파일')).toBeInTheDocument();
    expect(screen.getByText('카테고리별 점수')).toBeInTheDocument();
  });

  it('displays radar chart', async () => {
    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByTestId('radar-chart')).toBeInTheDocument();
    });
  });

  it('displays toxicity indicators', async () => {
    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('hERG 억제')).toBeInTheDocument();
    });

    expect(screen.getByText('간독성')).toBeInTheDocument();
    expect(screen.getByText('피부 감작')).toBeInTheDocument();
  });

  it('handles API error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('오류 발생')).toBeInTheDocument();
    });

    expect(screen.getByText('ADMET 예측 결과를 불러올 수 없습니다.')).toBeInTheDocument();
  });

  it('renders navigation buttons', async () => {
    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('분자 상세')).toBeInTheDocument();
    });

    expect(screen.getByText('재예측')).toBeInTheDocument();
    expect(screen.getByText('결과 다운로드')).toBeInTheDocument();
  });

  it('handles repredict button click', async () => {
    const mockFetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockADMETResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockADMETResponse, overall_score: 0.85 }),
      });
    
    global.fetch = mockFetch;

    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('재예측')).toBeInTheDocument();
    });

    const repredictButton = screen.getByText('재예측');
    fireEvent.click(repredictButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  it('handles download button presence', async () => {
    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('ADMET 예측 결과')).toBeInTheDocument();
    });

    const downloadButtons = screen.getAllByRole('button');
    const downloadButton = downloadButtons.find(btn => btn.textContent?.includes('결과 다운로드'));
    
    expect(downloadButton).toBeTruthy();
  });

  it('handles non-ok response from API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('오류 발생')).toBeInTheDocument();
    });

    expect(screen.getByText('ADMET 예측 결과를 불러올 수 없습니다.')).toBeInTheDocument();
  });

  it('does not download when no result is available', async () => {
    const mockCreateObjectURL = jest.fn();
    global.URL.createObjectURL = mockCreateObjectURL;

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('오류 발생')).toBeInTheDocument();
    });

    // 에러 상태에서는 다운로드 버튼이 없어야 함
    expect(screen.queryByText('결과 다운로드')).not.toBeInTheDocument();
    expect(mockCreateObjectURL).not.toHaveBeenCalled();
  });

  it('navigates to molecule detail page', async () => {
    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('분자 상세')).toBeInTheDocument();
    });

    const detailButton = screen.getByText('분자 상세');
    expect(detailButton.closest('a')).toHaveAttribute('href', '/molecule/mol-001');
  });

  it('displays all ADMET categories with scores', async () => {
    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getAllByText('흡수 (Absorption)')[0]).toBeInTheDocument();
    });

    expect(screen.getAllByText('분포 (Distribution)')[0]).toBeInTheDocument();
    expect(screen.getAllByText('대사 (Metabolism)')[0]).toBeInTheDocument();
    expect(screen.getAllByText('배설 (Excretion)')[0]).toBeInTheDocument();
    expect(screen.getAllByText('독성 (Toxicity)')[0]).toBeInTheDocument();
  });

  it('displays detailed properties', async () => {
    render(<ADMETPage />);

    await waitFor(() => {
      expect(screen.getByText('Caco-2 투과성')).toBeInTheDocument();
    });

    expect(screen.getByText('BBB 투과성')).toBeInTheDocument();
    expect(screen.getByText('반감기')).toBeInTheDocument();
    expect(screen.getByText('간독성')).toBeInTheDocument();
  });});