import { uploadFileUsingPost } from '@/services/trajectory-backend/fileController';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import React, { useRef } from 'react';
import { Card } from 'antd';
import { MarkdownEditor, MarkdownEditorInstance } from '@ant-design/md-editor';

const uploadImage = async (fileList: File[] | string[]): Promise<string[]> => {
  try {
    const uploadedUrls = await Promise.all(
      fileList.map(async (file) => {
        const res = await uploadFileUsingPost(
          {
            biz: FileUploadBiz.POST_IMAGE_COVER,
          },
          { file },
          file,
        );

        if (res.code === 0 && res.data) {
          return res.data;
        } else {
          throw new Error(`图片上传失败: ${res.message}`);
        }
      }),
    );

    return uploadedUrls.filter(Boolean);
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MdEditor: React.FC<Props> = (props) => {
  const { value = '', onChange } = props;
  const editorRef = useRef<MarkdownEditorInstance>();

  return (
    <Card title={'编辑器'}>
      <MarkdownEditor
        editorRef={editorRef}
        initValue={value}
        onChange={onChange}
        width={'100vw'}
        readonly={false}
        image={{
          upload: uploadImage,
        }}
        toolBar={{
          enable: true,
        }}
        toc={false}
        height={600}
      />
    </Card>
  );
};

export default MdEditor;
