import { useState, useMemo, useEffect } from 'react';
import { useFileTree } from '../../../actions/useCodebase';
import { TreeNode } from './TreeNode';
import { useTheme, styled } from '@mui/material/styles';

type FileExplorerProps = {
  onSelect: (path: string) => void;
  activeFilePath: string | null;
};

const ExplorerContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const FileExplorer = ({ onSelect, activeFilePath }: FileExplorerProps) => {
  const { data: fileTree, isLoading } = useFileTree();
  const theme = useTheme();

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // Auto-expand folders that contain the active file
  useEffect(() => {
    if (!activeFilePath) return;

    const parts = activeFilePath.split('/');
    const pathsToExpand: string[] = [];

    for (let i = 1; i < parts.length; i++) {
      pathsToExpand.push(parts.slice(0, i).join('/'));
    }

    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      pathsToExpand.forEach(p => newSet.add(p));
      return newSet;
    });
  }, [activeFilePath]);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) newSet.delete(path);
      else newSet.add(path);
      return newSet;
    });
  };

  if (isLoading) return <div>Loading project structure...</div>;

  return (
    <ExplorerContainer>
      {fileTree?.children.map((node: any) => (
        <TreeNode
          key={node.id}
          node={node}
          onSelect={onSelect}
          activeFilePath={activeFilePath}
          expandedFolders={expandedFolders}
          toggleFolder={toggleFolder}
          theme={theme}
          depth={0}
        />
      ))}
    </ExplorerContainer>
  );
};