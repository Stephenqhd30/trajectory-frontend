import React from 'react';
import { MdCatalog } from 'md-editor-rt';

interface Props {
  scrollElement: HTMLElement;
  editorId: string;
}

/**
 * 目录
 * @param props
 * @constructor
 */
const TableOfContents: React.FC<Props> = (props) => {
  const { scrollElement, editorId } = props;
  return (
    <div className={'markdown-navigation'}>
      <MdCatalog editorId={editorId} scrollElement={scrollElement} />
    </div>
  );
};

export default TableOfContents;
