import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './InfoDetail.less';

const FormItem = Form.Item;
@connect()
@Form.create()
class InfoDetail extends Component {

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <div className={styles.baseView} ref={this.getViewDom}>
                <div className={styles.left}>
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                        <Row>
                            <Col span={10}>
                                <FormItem label="First Name">
                                    {getFieldDecorator('First Name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                                            },
                                        ],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={10} offset={4}>
                                <FormItem label='Last Name'>
                                    {getFieldDecorator('Last Name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                                            },
                                        ],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Address">
                            {getFieldDecorator('Address', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                        <Button type="primary">
                            <FormattedMessage
                                id="app.settings.basic.update"
                                defaultMessage="Update Information"
                            />
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default InfoDetail;