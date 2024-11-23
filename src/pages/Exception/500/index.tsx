import { Link } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

/**
 * 500页面
 * @constructor
 */
const ServerErrorPage: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);

export default ServerErrorPage;
