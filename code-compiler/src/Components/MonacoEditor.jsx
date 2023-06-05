import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

const MonacoEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: '', // Set the initial value of the editor if needed
      language: 'javascript', // Set the language mode if needed
      theme: 'vs-dark', // Use the 'vs-dark' theme as the base
      automaticLayout: true,
    });

    // Apply the 'One Dark Pro' customizations
    monaco.editor.defineTheme('one-dark-pro', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '608b4e' },
        { token: 'keyword', foreground: 'c586c0' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
      ],
      colors: {},
    });

    monaco.editor.setTheme('one-dark-pro');

    return () => {
      editor.dispose();
    };
  }, []);

  return <div ref={editorRef} style={{ height: '400px' }} />;
};

export default MonacoEditor;
