import React from 'react';
import './index.less';
import 'md-editor-rt/lib/style.css';
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
      <MdPreview id={id} value={value} autoFoldThreshold={200} />
    </div>
  );
};

export default MdViewer;
