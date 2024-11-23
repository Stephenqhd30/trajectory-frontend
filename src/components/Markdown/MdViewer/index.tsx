import React from 'react';
import './index.less';
import { MdPreview } from 'md-editor-rt';

interface Props {
  value?: string;
  id?: string;
}

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer:React.FC<Props> = (props) => {
  const { value = "", id} = props;

  return (
    <div className="md-viewer">
      <MdPreview id={id} value={value} previewTheme={'vuepress'} autoFoldThreshold={200} />
    </div>
  );
};

export default MdViewer;
