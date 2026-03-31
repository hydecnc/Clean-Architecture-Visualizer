import apiClient from './apiClient';

/**
 * Initiates the base folder structure for a Clean Architecture project.
 */
export const generateProject = async () => {
  const { data } = await apiClient.post<{ message: string }>('/template/generate');
  return data;
};

/**
 * Creates a new use case and its corresponding interface adapters.
 * @param useCaseName The name of the use case (e.g., "Add User")
 */
export const createUseCase = async (useCaseName: string) => {
  // The name is passed as a URL parameter: /api/template/SomeUseCase
  const { data } = await apiClient.post<{ message: string }>(`/template/${useCaseName}`);
  return data;
};