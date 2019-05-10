import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Row, Col, Divider } from 'antd';
import { connect } from 'dva';
import styles from './InfoDetail.less';

const FormItem = Form.Item;
@connect(state=>{
    return state.user.currentUser
})
@Form.create()
class InfoDetail extends Component {
    componentDidMount() {
        const {email,firstName,lastName,address}=this.props
        this.props.form.setFieldsValue({
            email,
            firstName,
            lastName,
            address
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <div className={styles.baseView} ref={this.getViewDom}>
                <div >
                    <Form layout="horizontal" onSubmit={this.handleSubmit} hideRequiredMark>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12}>
                                <FormItem label={formatMessage({ id: 'user.firstname' })}>
                                    {getFieldDecorator('firstName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: formatMessage({ id: 'app.settings.basic.email-message' }, {}),
                                            },
                                        ],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                <FormItem label={formatMessage({ id: 'user.lastname' })}>
                                    {getFieldDecorator('lastName', {
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
                        <FormItem label={formatMessage({ id: 'user.address' })}>
                            {getFieldDecorator('address', {
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