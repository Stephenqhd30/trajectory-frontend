import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { addTagUsingPost } from '@/services/stephen-backend/tagController';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.TagAddRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.TagVO>[];
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.TagAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addTagUsingPost({
      ...fields,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`添加失败${error.message}, 请重试!`);
    return false;
  }
};

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreateTagModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;
  return (
    <Modal destroyOnClose title={'创建标签'} onCancel={() => onCancel?.()} open={visible} footer>
      <ProTable
        columns={columns}
        onSubmit={async (values: API.TagAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
        type={'form'}
      />
    </Modal>
  );
};
export default CreateTagModal;
