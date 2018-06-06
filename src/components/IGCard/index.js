import React from 'react';
import { Row, Col, Card, Icon, Avatar } from 'antd';
import styles from './styles.scss';

const { Meta } = Card;
type Props = { info: Object };

export default ({ info }: Props) => (
  <div className={styles.IGCard}>
    <Row type="flex" justify="center">
      {info.map(function(res){
          return (
            <Col sm={24} md={12} lg={8} key={res.id}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src={res.images.low_resolution.url} />}
                actions={[
                  <Icon type="setting" />,
                  <Icon type="edit" />,
                  <Icon type="ellipsis" />
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src={res.user.profile_picture} />
                  }
                  title={res.user.username}
                  description={res.caption.text}
                />
              </Card>
            </Col>
          );
      })}
    </Row>
  </div>
);
