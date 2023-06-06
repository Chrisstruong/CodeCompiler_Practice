import React, { useEffect, useState } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';

import OneDarkProTheme from './oneDark.json'; // Replace with the actual path to the theme file

const CodeEditor = () => {
  const [theme, setTheme] = useState('one-dark-pro'); // Initial theme

  const monaco = useMonaco();

  useEffect(() => {
    const registerTheme = () => {
      monaco.editor.defineTheme('One Dark Pro', {
        base: 'vs-dark',
        inherit: true,
        colors: OneDarkProTheme.colors,
        rules: OneDarkProTheme.tokenColors,
      });
      monaco.editor.setTheme(theme);
    };

    if (monaco) {
      registerTheme();
    }
  }, [monaco, theme]);

  const handleThemeChange = (selectedTheme) => {
    monaco.editor.setTheme(selectedTheme);
    setTheme(selectedTheme);
  };

  return (
    <div>
      <select value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
        <option value="one-dark-pro">One Dark Pro</option>
        {/* Add more theme options here */}
      </select>

      <Editor
        width="800" // Set the desired width
        height="600" // Set the desired height
        language="javascript" // Set the language mode (e.g., javascript, css, html)
        theme={theme}
      />
    </div>
  );
};

export default CodeEditor;
