import React from 'react';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

interface Props {
  markdownContent: string;
}

/**
 * 目录
 * @param markdownContent
 * @constructor
 */
const TableOfContents: React.FC<Props> = ({markdownContent}) => {
  return (
    <div className={'markdown-navigation'}>
      <MarkNav source={markdownContent} ordered={false} />
    </div>
  );
};

export default TableOfContents;
