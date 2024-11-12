import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Grid, message, UploadProps } from 'antd';
import React, { useState } from 'react';
import { updatePostUsingPost } from '@/services/stephen-backend/postController';
import { MdEditor, TagTreeSelect } from '@/components';
import { uploadFileUsingPost } from '@/services/stephen-backend/fileController';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';

interface Props {
  oldData?: API.Post;
  onCancel: () => void;
  onSubmit: (values: API.PostUpdateRequest) => Promise<void>;
  visible: boolean;
}

const { useBreakpoint } = Grid;

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.PostUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    const res = await updatePostUsingPost(fields);
    if (res.code === 0 && res.data) {
      message.success('更新成功');
      return true;
    }else {
      message.error(`更新失败${res.message}, 请重试!`);
      return false;
    }
  } catch (error: any) {
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  } finally {
    hide();
  }
};
const UpdatePostModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  // 帖子封面
  const [cover, setCover] = useState<any>();
  // 帖子内容
  const [content, setContent] = useState<string>(oldData?.content ?? '');

  const [form] = ProForm.useForm<API.PostUpdateRequest>();
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
          onSuccess(res.data);
          setCover(res.data);
        }
      } catch (error: any) {
        message.error('文件上传失败', error.message);
        onError(error);
      }
    },
    onRemove() {
      setCover(undefined);
    },
  };
  if (!oldData) {
    return null;
  }

  return (
    <ModalForm<API.PostUpdateRequest>
      title={'更新帖子信息'}
      open={visible}
      form={form}
      initialValues={oldData}
      onFinish={async (values: API.PostUpdateRequest) => {
        const success = await handleUpdate({
          ...values,
          id: oldData.id,
          cover,
          content,
          tags: Array.isArray(values.tags) ? values.tags : JSON.parse(values.tags as any),
        });
        if (success) {
          onSubmit?.(values);
        }
      }}
      layout={isMobile ? 'vertical' : 'horizontal'}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: '更新帖子信息',
          resetText: '取消',
        },
      }}
    >
      <ProFormText initialValue={oldData?.title} name="title" label="标题" />
      <ProFormTextArea initialValue={oldData?.content} name="content" label="内容">
        <MdEditor
          value={content}
          onChange={(value) => setContent(value)}
          placeholder={'请填写内容'}
        />
      </ProFormTextArea>
      <ProFormUploadDragger
        title={'上传帖子封面'}
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="pic"
        label={'封面'}
      />
      <TagTreeSelect
        name={'tags'}
        label={'标签'}
        initialValue={oldData?.tags ? JSON.parse(oldData?.tags) : []}
      />
    </ModalForm>
  );
};
export default UpdatePostModal;
