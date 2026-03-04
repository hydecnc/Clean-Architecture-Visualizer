import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';

const NodeContainer = styled('div')<{ isActive?: boolean; depth: number; theme: any }>(
  ({ isActive, depth, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: depth * 16,
    fontWeight: isActive ? 600 : 400,
    cursor: 'pointer',
    backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  })
);

export const TreeNode = ({
  node,
  onSelect,
  activeFilePath,
  expandedFolders,
  toggleFolder,
  theme,
  depth,
}: any) => {
  const isDir = node.type === 'directory';
  const isExpanded = expandedFolders.has(node.path);
  const isActive = node.path === activeFilePath;

  return (
    <>
      <NodeContainer
        isActive={isActive}
        depth={depth}
        theme={theme}
        onClick={() => (isDir ? toggleFolder(node.path) : onSelect(node.path))}
      >
        <span style={{ width: 16 }}>{isDir ? (isExpanded ? '▾' : '▸') : ''}</span>
        <span style={{ marginLeft: 4 }}>
          {isDir ? <FolderIcon fontSize="small" /> : <DescriptionIcon fontSize="small" />} {node.name}
        </span>
      </NodeContainer>

      {isDir && isExpanded &&
        node.children?.map((child: any) => (
          <TreeNode
            key={child.id}
            node={child}
            onSelect={onSelect}
            activeFilePath={activeFilePath}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            theme={theme}
            depth={depth + 1}
          />
        ))}
    </>
  );
};