import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';
import {
  getAnalysisSummary,
  getInteractionDetails,
  getViolations,
} from '@/api/analysis.api';
import { server } from '@/mocks/server';

describe('Analysis API', () => {
  it('getAnalysisSummary returns data from /analysis/summary', async () => {
    const mockData = { totalViolations: 12 };
    server.use(
      http.get('*/api/analysis/summary', () => HttpResponse.json(mockData))
    );

    const result = await getAnalysisSummary();
    expect(result).toEqual(mockData);
  });

  it('getInteractionDetails uses the correct ID in the URL', async () => {
    const id = 'test-interaction-123';
    server.use(
      http.get(`*/api/analysis/interaction/${id}`, () => {
        return HttpResponse.json({ id, status: 'success' });
      })
    );

    const result = await getInteractionDetails(id);
    expect(result.id).toBe(id);
  });

  it('getViolations fetches violations for a specific interaction', async () => {
    const interactionId = 'int-456';
    server.use(
      http.get(`*/api/analysis/violations/${interactionId}`, () => {
        return HttpResponse.json([{ id: 'v1', type: 'cycle' }]);
      })
    );

    const result = await getViolations(interactionId);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('v1');
  });
});
