import React from 'react';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Select, Space } from 'antd';
import { ChartType, chartTypeEnum } from '@/enums/ChartTypeEnum';

interface Props {
  onFinish: (values: API.ChartAddRequest) => Promise<void>;
}

/**
 * 图表创建表单
 * @param props
 * @constructor
 */
const CreateChartForm: React.FC<Props> = (props) => {
  const { onFinish } = props;

  return (
    <ProForm<API.Chart>
      onFinish={onFinish}
      formKey={'name'}
      submitter={{
        searchConfig: {
          submitText: '开始生成',
          resetText: '重置表单',
        },
        render: (_, dom) => {
          return (
            <div style={{ textAlign: 'right' }}>
              <Space>
                {dom[0]}
                {dom[1]}
              </Space>
            </div>
          );
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
          <Select.Option value={ChartType.Scatter}>
            {chartTypeEnum[ChartType.Scatter].text}
          </Select.Option>
          <Select.Option value={ChartType.KLineChart}>
            {chartTypeEnum[ChartType.KLineChart].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
      <ProFormUploadDragger max={1} name="file" label="上传CSV文件" />
    </ProForm>
  );
};

export default CreateChartForm;
