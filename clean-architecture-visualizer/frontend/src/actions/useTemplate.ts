import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateProject, createUseCase } from '../api/template.api.ts';

export const useGenerateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateProject,
    onSuccess: () => {
      // If you have a query that fetches the codebase structure, invalidate it here
      queryClient.invalidateQueries({ queryKey: ['codebase'] });
    },
  });
};

export const useCreateUseCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (useCaseName: string) => createUseCase(useCaseName),
    onSuccess: () => {
      // Refresh codebase view after adding new files
      queryClient.invalidateQueries({ queryKey: ['codebase'] });
    },
  });
};