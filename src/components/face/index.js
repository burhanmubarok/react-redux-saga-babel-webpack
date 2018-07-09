import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd'
import './index.less'

class index extends Component {
    render() {
        return (
            <div className='rsch-face'>
                <div className='rsch-face-slogan'>
                    Washing & Dry Cleaning
                </div>
                <Row type='flex' justify='center'>
                    <Col span={8}>
                        <Form>
                            <Form.Item label='Address or Zip Code' labelCol={{span: 6, offset: 9}}>
                                <Input.Search
                                    enterButton
                                    placeholder='Type address or zip code here...'
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Row type='flex' justify='center'>
                    <Button type='primary'>Chat</Button>
                </Row>
            </div>
        );
    }
}

export default index;
