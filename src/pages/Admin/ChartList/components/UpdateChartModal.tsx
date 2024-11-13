import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Select } from 'antd';
import React from 'react';
import { updateChartUsingPost } from '@/services/trajectory-backend/chartController';
import { ChartType, chartTypeEnum } from '@/enums/ChartTypeEnum';

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
      title={'更新图表信息'}
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
          submitText: '更新图表信息',
          resetText: '取消',
        },
      }}
    >
      <ProFormText
        name="name"
        label="图表名称"
      />
      <ProFormTextArea name={'genChart'} label={"图表数据"}/>
      <ProFormTextArea name={'genResult'} label={"分析结论"}/>
      <ProFormTextArea
        name="goal"
        label="分析目标"
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择想要生成的图表类型' }]}
        name="chartType"
        label="请选择生成图表的类型"
      >
        <Select>
          <Select.Option value={ChartType.Line}>
            {chartTypeEnum[ChartType.Line].text}
          </Select.Option>
          <Select.Option value={ChartType.Bar}>
            {chartTypeEnum[ChartType.Bar].text}
          </Select.Option>
          <Select.Option value={ChartType.Pie}>
            {chartTypeEnum[ChartType.Pie].text}
          </Select.Option>
          <Select.Option value={ChartType.Radar}>
            {chartTypeEnum[ChartType.Radar].text}
          </Select.Option>
          <Select.Option value={ChartType.Scatter}>
            {chartTypeEnum[ChartType.Scatter].text}
          </Select.Option>
          <Select.Option value={ChartType.Bubble}>
            {chartTypeEnum[ChartType.Bubble].text}
          </Select.Option>
          <Select.Option value={ChartType.Area}>
            {chartTypeEnum[ChartType.Area].text}
          </Select.Option>
          <Select.Option value={ChartType.Stacked}>
            {chartTypeEnum[ChartType.Stacked].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
      <ProFormUploadDragger max={1} name="file" label="上传CSV文件" />
    </ModalForm>
  );
};
export default UpdateChartModal;
