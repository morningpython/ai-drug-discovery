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
});
