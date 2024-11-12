import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { updateTagUsingPost } from '@/services/stephen-backend/tagController';

interface UpdateProps {
  oldData?: API.TagVO;
  onCancel: () => void;
  onSubmit: (values: API.TagUpdateRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.TagVO>[];
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.TagUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    const res = await updateTagUsingPost(fields);
    if (res.code === 0 && res.data) {
      hide();
      message.success('更新成功');
      return true;
    } else {
      hide();
      message.error(`更新失败${res.message}, 请重试!`);
      return false;
    }
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};
const UpdateTagModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新标签信息'}
      open={visible}
      onCancel={() => onCancel?.()}
      centered
      footer
    >
      <ProTable
        type={'form'}
        form={{
          initialValues: {
            ...oldData,
          },
        }}
        columns={columns}
        onSubmit={async (values: API.TagUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData?.id,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateTagModal;
