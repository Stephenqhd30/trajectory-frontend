import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import '@umijs/max';
import { message } from 'antd';
import React from 'react';
import { updateChartUsingPost } from '@/services/trajectory-backend/chartController';

interface Props {
  oldData?: API.Chart;
  onCancel: () => void;
  onSubmit: (values: API.ChartUpdateRequest) => Promise<void>;
  visible: boolean;
}



/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ChartUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    const res = await updateChartUsingPost(fields);
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
const UpdateChartModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const [form] = ProForm.useForm<API.ChartUpdateRequest>();

  return (
    <ModalForm<API.ChartUpdateRequest>
      title={'更新帖子信息'}
      open={visible}
      form={form}
      initialValues={oldData}
      onFinish={async (values: API.ChartUpdateRequest) => {
        const success = await handleUpdate({
          ...values,
          id: oldData?.id,
        });
        if (success) {
          onSubmit?.(values);
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
          submitText: '更新帖子信息',
          resetText: '取消',
        },
      }}
    >
      <ProFormText
        name="name"
        rules={[{ required: true, message: '请输入你的图表名称' }]}
        label="图表名称"
      />
      <ProFormTextArea
        rules={[{ required: true, message: '请输出你的分析目标' }]}
        name="goal"
        label="分析目标"
      />
      <ProFormSelect
        fieldProps={{
          labelInValue: true,
        }}
        rules={[{ required: true, message: '请选择想要生成的图表类型' }]}
        request={async () => [
          { label: '柱状图', value: '柱状图' },
          { label: '折线图', value: '折线图' },
          { label: '饼图', value: '饼图' },
          { label: '堆叠图', value: '堆叠图' },
          { label: '雷达图', value: '雷达图' },
        ]}
        name="chartType"
        label="请选择生成图表的类型"
      />
      <ProFormUploadDragger max={1} name="file" label="上传CSV文件" />
    </ModalForm>
  );
};
export default UpdateChartModal;
