import React, { useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '@mui/material/styles';
import { useMonacoDecorations } from './useMonacoDecorations';

type CodeViewerProps = {
  interactionId: string;
  filePath: string | null;
  onFileChange: (newPath: string) => void;
};

export const CodeViewer = ({ interactionId, filePath, onFileChange }: CodeViewerProps) => {
  const theme = useTheme();

  const monacoThemeConfig = useMemo(() => ({
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': theme.palette.background.default,
      'editor.foreground': theme.palette.text.primary,
      'editorLineNumber.foreground': theme.palette.text.secondary,
      'editor.selectionBackground': theme.palette.primary.main,
      'editor.lineHighlightBackground': '#f5f5f5',
    },
  }), [theme]);

  const { handleEditorDidMount, isLoading, isError, fileData } =
    useMonacoDecorations({ interactionId, filePath, onFileChange });

  if (!filePath) return <div className="p-4">Select a file to view content.</div>;
  if (isLoading) return <div className="p-4">Loading code...</div>;
  if (isError || !fileData) return <div className="p-4 text-red-500">Error loading file</div>;

  return (
    <Editor
      key={filePath}
      height="100vh"
      language={fileData.language}
      value={fileData.content}
      options={{
        readOnly: true,
        glyphMargin: true,
        links: true,
        renderLineHighlight: 'all',
        scrollBeyondLastLine: false,
      }}
      onMount={handleEditorDidMount}
    />
  );
};