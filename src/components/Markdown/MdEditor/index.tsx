import React from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import mermaid from '@bytemd/plugin-mermaid';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import locale from 'bytemd/locales/zh_Hans.json';
import theme, { themeList } from 'bytemd-plugin-theme';
import allowHtmlTags from '../plugins/escapeHtmlTags';
import alignPlugin from '../plugins/alignPlugin';
import 'bytemd/dist/index.css';
import 'highlight.js/styles/vs.css';
import './index.less';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import { uploadFileUsingPost } from '@/services/stephen-backend/fileController';
import { message } from 'antd';

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}

/**
 * 插件
 */
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
  theme({
    themeList,
  }),
  allowHtmlTags(),
  alignPlugin(),
];


/**
 * Markdown 编辑器
 */
const MdEditor: React.FC<Props> = (props) => {
  const { value = '', onChange, placeholder } = props;

  const uploadImages = async (files) => {
    try {
      const res = await uploadFileUsingPost(
        {
          biz: FileUploadBiz.POST_IMAGE_COVER,
        },
        {
          file: files[0],
        },
        files[0],
      );
      if (res.code === 0 && res.data) {
        return [
          {
            title: files[0].name,
            url: res.data,
          },
        ];
      } else {
        message.error(`图片上传失败${res.message}`);
        return [];
      }
    } catch (error: any) {
      message.error(`图片上传失败${error.message}`);
      return [];
    }
  }

  return (
    <div className="md-editor">
      <Editor
        uploadImages={uploadImages}
        value={value || ''}
        placeholder={placeholder}
        editorConfig={{
          // 不显示行数
          lineNumbers: false,
          autofocus: false,
        }}
        mode="split"
        locale={locale}
        plugins={plugins}
        onChange={onChange}
      />
    </div>
  );
};

export default MdEditor;
