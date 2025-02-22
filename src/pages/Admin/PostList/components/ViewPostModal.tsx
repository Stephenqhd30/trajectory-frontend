import { Modal, Typography } from 'antd';
import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { MdViewer } from '@/components';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => Promise<void>;
  post: API.PostVO;
}

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const ViewPostModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit, post } = props;

  return (
    <Modal
      open={visible}
      onOk={() => {
        onSubmit?.();
      }}
      onCancel={() => {
        onCancel?.();
      }}
      width={1200}
    >
      <ProCard
        bodyStyle={{ padding: 0 }}
        title={<Typography.Title level={3}>{post?.title}</Typography.Title>}
      >
        <MdViewer key={post?.id} value={post.content} />
      </ProCard>
    </Modal>
  );
};
export default ViewPostModal;
