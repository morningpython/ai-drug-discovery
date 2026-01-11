import { render } from '@testing-library/react';
import { ADMETRadarChart } from '../ADMETRadarChart';

// Mock recharts components to avoid SVG rendering issues in test environment
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  RadarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="radar-chart">{children}</div>
  ),
  PolarGrid: () => <div data-testid="polar-grid" />,
  PolarAngleAxis: () => <div data-testid="polar-angle-axis" />,
  PolarRadiusAxis: () => <div data-testid="polar-radius-axis" />,
  Radar: () => <div data-testid="radar" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe('ADMETRadarChart', () => {
  const mockData = [
    { category: '흡수 (Absorption)', value: 85, fullMark: 100 },
    { category: '분포 (Distribution)', value: 72, fullMark: 100 },
    { category: '대사 (Metabolism)', value: 68, fullMark: 100 },
    { category: '배설 (Excretion)', value: 79, fullMark: 100 },
    { category: '독성 (Toxicity)', value: 91, fullMark: 100 },
  ];

  it('renders without crashing', () => {
    render(<ADMETRadarChart data={mockData} />);
  });

  it('renders ResponsiveContainer', () => {
    const { getByTestId } = render(<ADMETRadarChart data={mockData} />);
    expect(getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('renders RadarChart', () => {
    const { getByTestId } = render(<ADMETRadarChart data={mockData} />);
    expect(getByTestId('radar-chart')).toBeInTheDocument();
  });

  it('renders chart components', () => {
    const { getByTestId } = render(<ADMETRadarChart data={mockData} />);
    expect(getByTestId('polar-grid')).toBeInTheDocument();
    expect(getByTestId('polar-angle-axis')).toBeInTheDocument();
    expect(getByTestId('radar')).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    const { getByTestId } = render(<ADMETRadarChart data={[]} />);
    expect(getByTestId('responsive-container')).toBeInTheDocument();
  });
});
