import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then((mod) => mod.CKEditor),
  {
    ssr: false,
  }
);

const editorConfiguration = {
  toolbar: [
    'heading',
    'bold',
    'italic',
    '|',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'codeBlock',
    'code',
    'insertTable',
    '|',
    'imageUpload',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ],
  ckfinder: {
    uploadUrl: 'https://google.com/',
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative',
    ],
    upload: {
      types: ['png', 'jpg'],
    },
  },
  height: 700,
};

const EditorComponent = ({ editorValue, setEditorValue }) => {
  const handleEditorChange = (_ev, ed) => {
    const data = ed.getData();

    setEditorValue(data);
  };

  const renderEditor = () => {
    const Editor = require('@/custom-ckeditor/build/ckeditor');

    return (
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        onChange={handleEditorChange}
        data={editorValue}
      />
    );
  };

  return (
    <>
      {typeof window !== 'undefined' && renderEditor()}{' '}
      <style jsx>{`
        :global(.ck-editor__editable) {
          min-height: 700px;
        }

        :global(.ck-editor__editable h2) {
          font-size: 1.5em;
        }

        :global(.ck-editor__editable h3) {
          font-size: 1.25em;
        }
        :global(.ck-editor__editable h4) {
          font-size: 1.15em;
        }
      `}</style>
    </>
  );
};

EditorComponent.propTypes = {
  editorValue: PropTypes.string.isRequired,
  setEditorValue: PropTypes.func.isRequired,
};

export default EditorComponent;
