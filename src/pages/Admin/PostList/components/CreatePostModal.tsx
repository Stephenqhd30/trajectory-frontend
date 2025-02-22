import { message, UploadProps } from 'antd';
import React, { useState } from 'react';
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { MdEditor, TagTreeSelect } from '@/components';
import { addPostUsingPost } from '@/services/trajectory-backend/postController';
import { uploadFileUsingPost } from '@/services/trajectory-backend/fileController';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => Promise<void>;
}


/**
 * 创建帖子
 * @param values
 */
const handleAdd = async (values: API.PostAddRequest) => {
  const hide = message.loading('正在创建...');
  try {
    const res = await addPostUsingPost(values);
    if (res.code === 0 && res.data) {
      message.success('请在个人中心查看我创建的帖子');
      return true;
    } else {
      message.error(`创建失败${res.message}`);
      return false;
    }
  } catch (error: any) {
    message.error(`创建失败${error.message}`);
    return false;
  } finally {
    hide();
  }
};

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreatePostModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  // 帖子封面
  const [cover, setCover] = useState<any>();
  // 帖子内容
  const [content, setContent] = useState<string>('');
  const [form] = ProForm.useForm<API.PostAddRequest>();

  /**
   * 上传文章封面
   */
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      try {
        const res = await uploadFileUsingPost(
          {
            biz: FileUploadBiz.POST_COVER,
          },
          {
            file: file,
          },
          file,
        );
        if (res.code === 0 && res.data) {
          // 清理表单状态
          form.resetFields();
          onSuccess(res.data);
          setCover(res.data);
        }
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setCover(undefined);
    },
  };
  return (
    <ModalForm
      open={visible}
      form={form}
      title={'新建帖子'}
      onFinish={async (values) => {
        const success = await handleAdd({
          ...values,
          cover,
          content,
        });
        if (success) {
          onSubmit?.();
        }
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: '新建帖子',
          resetText: '取消',
        },
      }}
    >
      <ProFormText name="title" label="标题" />
      <ProFormTextArea name="content" label="描述">
        <MdEditor value={content} onChange={(value) => setContent(value)} />
      </ProFormTextArea>
      <ProFormUploadDragger
        title={'上传帖子封面'}
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="cover"
        label={'封面'}
      />
      <TagTreeSelect name={'tags'} label={'标签'} />
    </ModalForm>
  );
};
export default CreatePostModal;
