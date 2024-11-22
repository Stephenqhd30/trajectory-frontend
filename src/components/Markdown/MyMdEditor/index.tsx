import React, { useState } from 'react';
import { config, HeadList, MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import { message } from 'antd';
import './index.less';
import {uploadFileUsingPost} from '@/services/trajectory-backend/fileController';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

config({
  editorConfig: {
    languageUserDefined: {
      'my-lang': {
        toolbarTips: {
          bold: '加粗',
          underline: '下划线',
          italic: '斜体',
          strikeThrough: '删除线',
          title: '标题',
          sub: '下标',
          sup: '上标',
          quote: '引用',
          unorderedList: '无序列表',
          orderedList: '有序列表',
          task: '任务列表',
          codeRow: '行内代码',
          code: '块级代码',
          link: '链接',
          image: '图片',
          table: '表格',
          mermaid: 'mermaid图',
          katex: 'katex公式',
          revoke: '后退',
          next: '前进',
          save: '保存',
          prettier: '美化',
          pageFullscreen: '浏览器全屏',
          fullscreen: '屏幕全屏',
          preview: '预览',
          htmlPreview: 'html代码预览',
          catalog: '目录',
          github: '源码地址',
        },
        titleItem: {
          h1: '一级标题',
          h2: '二级标题',
          h3: '三级标题',
          h4: '四级标题',
          h5: '五级标题',
          h6: '六级标题',
        },
        imgTitleItem: {
          link: '添加链接',
          upload: '上传图片',
          clip2upload: '裁剪上传',
        },
        linkModalTips: {
          linkTitle: '添加链接',
          imageTitle: '添加图片',
          descLabel: '链接描述：',
          descLabelPlaceHolder: '请输入描述...',
          urlLabel: '链接地址：',
          urlLabelPlaceHolder: '请输入链接...',
          buttonOK: '确定',
        },
        clipModalTips: {
          title: '裁剪图片上传',
          buttonUpload: '上传',
        },
        copyCode: {
          text: '复制代码',
          successTips: '已复制！',
          failTips: '复制失败！',
        },
        mermaid: {
          flow: '流程图',
          sequence: '时序图',
          gantt: '甘特图',
          class: '类图',
          state: '状态图',
          pie: '饼图',
          relationship: '关系图',
          journey: '旅程图',
        },
        katex: {
          inline: '行内公式',
          block: '块级公式',
        },
        footer: {
          markdownTotal: '字数',
          scrollAuto: '同步滚动',
        },
      },
    },
  },
});



/**
 * Markdown 编辑器
 */
const MyMdEditor: React.FC<Props> = (props) => {
  const { value = '', onChange, placeholder } = props;
  const [, setList] = useState<HeadList[]>([]);

  const uploadImages = async (files, callback) => {
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
        // 调用回调函数并传入图片URL数组
        callback([res.data]);
      } else {
        message.error(`图片上传失败${res.message}`);
        callback([]);
      }
    } catch (error: any) {
      message.error(`图片上传失败${error.message}`);
      callback([]);
    }
  };

  return (
    <div className="md-editor">
      <MdEditor
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        previewTheme="vuepress"
        onGetCatalog={setList}
        onUploadImg={uploadImages}
        toolbarsExclude={['github', 'htmlPreview', 'prettier']}
        showToolbarName={true}
        autoFoldThreshold={200}
      />
    </div>
  );
};

export default MyMdEditor;
