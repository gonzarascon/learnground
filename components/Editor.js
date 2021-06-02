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
    uploadUrl: '/api/imageUpload',
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative',
    ],
    upload: {
      types: ['png', 'jpg', 'gif'],
    },
  },
  height: 700,
};

const EditorComponent = ({ editorValue, setEditorValue }) => {
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    setShowEditor(true);

    return () => setShowEditor(false);
  }, [editorValue]);

  const handleEditorChange = (_ev, ed) => {
    const data = ed.getData();

    setEditorValue(data);
  };

  const renderEditor = (data) => {
    const Editor = require('@/custom-ckeditor/build/ckeditor');

    return (
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        onChange={handleEditorChange}
        data={data}
      />
    );
  };

  return (
    <>
      {typeof window !== 'undefined' && showEditor && renderEditor(editorValue)}{' '}
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
