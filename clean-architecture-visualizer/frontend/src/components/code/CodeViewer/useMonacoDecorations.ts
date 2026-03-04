import { useEffect, useRef, useCallback } from 'react';
import type * as Monaco from 'monaco-editor';
import { useFileViewer, useFileRelations } from '../../../actions/useCodebase';

type UseMonacoDecorationsProps = {
  interactionId: string;
  filePath: string | null;
  onFileChange: (newPath: string) => void;
};

export const useMonacoDecorations = ({
  interactionId,
  filePath,
  onFileChange,
}: UseMonacoDecorationsProps) => {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof Monaco | null>(null);
  const decorationIds = useRef<string[]>([]);
  const linkProviderRef = useRef<Monaco.IDisposable | null>(null);

  const { data, isLoading, isError } = useFileViewer(
    interactionId,
    filePath ?? ''
  );

  const { data: relationsData } = useFileRelations(
    interactionId,
    filePath ?? ''
  );

  const relations = useRef<any[]>([]);
  useEffect(() => {
    if (!relationsData) return;
    relations.current = Array.isArray(relationsData)
      ? relationsData
      : relationsData.relations ?? [];
  }, [relationsData]);

  // Apply decorations
  const applyDecorations = useCallback(() => {
    if (!editorRef.current || !monacoRef.current || !data) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    const newDecorations: Monaco.editor.IModelDeltaDecoration[] = [];

    data.lines_with_violations?.forEach((line: number) => {
      newDecorations.push({
        range: new monacoRef.current!.Range(line, 1, line, model.getLineMaxColumn(line)),
        options: {
          isWholeLine: true,
          className: 'violation-highlight',
          glyphMarginClassName: 'violation-glyph',
        },
      });
    });

    relations.current.forEach((rel: any) => {
      if (!rel.line) return;
      newDecorations.push({
        range: new monacoRef.current!.Range(rel.line, 1, rel.line, model.getLineMaxColumn(rel.line)),
        options: {
          isWholeLine: true,
          className: `relation-highlight-${rel.type?.toLowerCase() || 'default'}`,
          glyphMarginClassName: 'relation-glyph',
        },
      });
    });

    decorationIds.current = editorRef.current.deltaDecorations(
      decorationIds.current,
      newDecorations
    );
  }, [data]);

  // Editor mount handler
  const handleEditorDidMount = useCallback(
    (editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;

      applyDecorations();

      editor.onMouseUp((e) => {
        const evt = e.event.browserEvent;
        if (!(evt.metaKey || evt.ctrlKey)) return;

        const line = e.target.position?.lineNumber;
        if (!line) return;

        const match = relations.current.find((rel) => rel.line === line);
        if (match?.target_file) onFileChange(match.target_file);
      });
    },
    [applyDecorations, onFileChange]
  );

  // Reapply decorations whenever data changes
  useEffect(() => {
    applyDecorations();
  }, [applyDecorations]);

  // Register link provider
  useEffect(() => {
    if (!monacoRef.current || !data?.language) return;

    linkProviderRef.current?.dispose();
    linkProviderRef.current = monacoRef.current.languages.registerLinkProvider(
      data.language,
      {
        provideLinks: (model) => {
          const links = relations.current
            .filter((rel) => rel.line && rel.target_file)
            .map((rel) => ({
              range: new monacoRef.current!.Range(
                rel.line,
                1,
                rel.line,
                model.getLineMaxColumn(rel.line)
              ),
              url: `file://${rel.target_file}`,
            }));
          return { links };
        },
      }
    );

    return () => {
      linkProviderRef.current?.dispose();
    };
  }, [data?.language]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      decorationIds.current = [];
      linkProviderRef.current?.dispose();
    };
  }, []);

  return { handleEditorDidMount, isLoading, isError, fileData: data };
};