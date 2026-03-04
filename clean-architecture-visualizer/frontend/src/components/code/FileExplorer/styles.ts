import { styled } from '@mui/material/styles';

export const TreeRow = styled('div')<{
  depth: number;
  isActive: boolean;
}>(({ theme, depth, isActive }) => ({
  paddingLeft: depth * 16,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  paddingTop: 4,
  paddingBottom: 4,
  fontWeight: isActive ? 600 : 400,
  backgroundColor: isActive
    ? theme.palette.action.selected
    : 'transparent',
}));

export const ExpandIcon = styled('span')({
  width: 16,
});

export const NodeLabel = styled('span')({
  marginLeft: 4,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});