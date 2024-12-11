import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { deleteChartUsingPost, listChartByPageUsingPost } from '@/services/trajectory-backend/chartController';
import { CreateChartModal, UpdateChartModal } from '@/pages/Admin/ChartList/components';
import { chartTypeEnum } from '@/enums/ChartTypeEnum';
import { ChartStatus, chartStatusEnum } from '@/enums/ChartStatusEnum';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    const res = await deleteChartUsingPost({
      id: row.id,
    });
    if (res.code === 0 && res.data) {
      message.success('删除成功');
    } else {
      message.error(`删除失败${res.message}, 请重试!`);
    }
  } catch (error: any) {
    message.error(`删除失败${error.message}, 请重试!`);
  } finally {
    hide();
  }
};

/**
 * 用户管理列表
 * @constructor
 */
const ChartList: React.FC = () => {
  // 新建窗口的Modal框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 更新窗口的Modal框
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.Chart>();
  /**
   * 表格列数据
   */
  const columns: ProColumns<API.Chart>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '目标',
      dataIndex: 'goal',
      valueType: 'text',
    },
    {
      title: '图表类型',
      dataIndex: 'chartType',
      valueEnum: chartTypeEnum,
    },
    {
      title: '图表数据',
      dataIndex: 'genChart',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '分析结论',
      dataIndex: 'genResult',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '图表状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: chartStatusEnum,
      render: (_, record) => {
        const status = chartStatusEnum[record.status as ChartStatus];
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: '执行信息',
      dataIndex: 'executorMessage',
      valueType: 'text',
    },
    {
      title: '创建用户id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key="update"
            onClick={() => {
              setUpdateModalVisible(true);
              setCurrentRow(record);
              actionRef.current?.reload();
            }}
          >
            修改
          </Typography.Link>
          {/*删除表单用户的PopConfirm框*/}
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复?"
            okText="确定"
            cancelText="取消"
            onConfirm={async () => {
              await handleDelete(record);
              actionRef.current?.reload();
            }}
          >
            <Typography.Link
              key={'delete'}
              type={'danger'}
              onClick={() => {
                setCurrentRow(record);
              }}
            >
              删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.Chart, API.PageParams>
        headerTitle={'图表查询'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Space key={'space'} wrap>
            <Button
              type={'primary'}
              icon={<PlusOutlined />}
              key="create"
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              新建
            </Button>
          </Space>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listChartByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.ChartQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
      {/*新建表单的Modal框*/}
      {createModalVisible && (
        <CreateChartModal
          onCancel={() => {
            setCreateModalVisible(false);
          }}
          visible={createModalVisible}
          onSubmit={async () => {
            setCreateModalVisible(false);
            actionRef.current?.reload();
          }}
        />
      )}
      {/*更新表单的Modal框*/}
      {updateModalVisible && (
        <UpdateChartModal
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
          visible={updateModalVisible}
          oldData={currentRow}
          onSubmit={async () => {
            setUpdateModalVisible(false);
            actionRef.current?.reload();
          }}
        />
      )}
    </>
  );
};
export default ChartList;
