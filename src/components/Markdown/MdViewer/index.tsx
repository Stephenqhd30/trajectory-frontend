import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import gemoji from '@bytemd/plugin-gemoji';
import allowHtmlTags from '@/components/Markdown/plugins/escapeHtmlTags';
import codeCopy from '@/components/Markdown/plugins/copyToClipboard';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import math from '@bytemd/plugin-math';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import mermaid from '@bytemd/plugin-mermaid';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import 'highlight.js/styles/vs.css';
import 'bytemd/dist/index.css';
import './index.less';
import { setTheme } from 'bytemd-plugin-theme';
import { useEffect } from 'react';

interface Props {
  value?: string;
}


const plugins = [
  gfm({
    locale: gfmLocale,
  }),
  gemoji(),
  highlight(),
  math({
    locale: mathLocale,
  }),
  mermaid({
    locale: mermaidLocale,
  }),
  mediumZoom(),
  allowHtmlTags(),
  codeCopy(),
];

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer = (props: Props) => {
  const { value = ""} = props;
  const theme = "nico";

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <div className="md-viewer">
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};

export default MdViewer;
