import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Col, Empty, Row, Tag } from 'antd';
import { UserAvatarCard } from '@/components';

interface Props {
  user: API.UserVO;
}

const RecommendUserCard: React.FC<Props> = (props) => {
  const { user } = props;

  // 将相似度转换为百分比形式，确保处理非数字情况
  const similarity = user.similarity as number;
  const similarityPercentage = similarity >= 0 ? (similarity * 100).toFixed(2) : 'N/A';

  return (
    <ProCard
      gutter={8}
      bodyStyle={{ paddingBottom: 4 }}
      onEmptied={() => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    >
      <Row justify="space-between" align="middle">
        <Col span={18}>
          <Row>
            <Col>
              <UserAvatarCard user={user} />
            </Col>
            <Col>
              {user.tags &&
                user.tags.map((tag) => (
                  <Tag color="volcano" key={tag}>
                    {tag}
                  </Tag>
                ))}
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <span style={{ marginBottom: 4 }}>相似度</span>
          <div style={{ fontWeight: 'bold' }}>
            <span>{similarityPercentage}%</span>
          </div>
        </Col>
      </Row>
    </ProCard>
  );
};

export default RecommendUserCard;
