import { Modal } from 'antd';
import React from 'react';
import { ChartCard } from '@/components';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => Promise<void>;
  chart: API.ChartVO;
}

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const ViewChartModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit, chart } = props;

  return (
    <Modal
      open={visible}
      onOk={() => {
        onSubmit?.();
      }}
      onCancel={() => {
        onCancel?.();
      }}
      width={800}
    >
      <ChartCard chart={chart} />
    </Modal>
  );
};
export default ViewChartModal;
