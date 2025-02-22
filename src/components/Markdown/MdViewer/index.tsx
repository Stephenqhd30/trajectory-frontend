import React, { useRef } from 'react';
import './index.less';
import { MarkdownEditor, MarkdownEditorInstance } from '@ant-design/md-editor';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  isMobile?: boolean;
}


/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer: React.FC<Props> = (props) => {
  const { value = '', onChange, isMobile } = props;
  const editorRef = useRef<MarkdownEditorInstance>();
  return (
    <MarkdownEditor
      editorRef={editorRef}
      initValue={value}
      onChange={onChange}
      width={'100vw'}
      toc={!isMobile}
      readonly={true}
      style={{
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    />
  );
};

export default MdViewer;
