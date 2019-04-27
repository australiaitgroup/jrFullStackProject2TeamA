import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

import { Form, Modal, Input, Row, Col } from 'antd'

@connect()
@Form.create()
class InfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };

    }
    showModelHandler = (e) => {
        e.preventDefault();
        console.log(this)
        this.setState({
            visible: true,
        });
    }
    cancleHandler = () => {
        this.setState({
            visible: false,
        })
    }
    okHandler = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        const { title, children, form: { getFieldDecorator } } = this.props;
        const FormItem = Form.Item;
        return (
            <Fragment>
                <span onClick={this.showModelHandler}>{children}</span>
                <Modal
                    width={640}
                    bodyStyle={{ padding: '32px 40px 48px' }}
                    title={title}
                    visible={this.state.visible}
                    onCancel={this.cancleHandler}
                    onOk={this.okHandler}
                >
                    <Form verticalGap={1} layout="horizontal" hideRequiredMark>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={10}>
                                <FormItem label="First Name">
                                    {getFieldDecorator('First Name', {
                                        rules: [
                                            {
                                                required: true,

                                            },
                                        ],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={10}>
                                <FormItem label='Last Name'>
                                    {getFieldDecorator('Last Name', {
                                        rules: [
                                            {
                                                required: true,

                                            },
                                        ],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label='Email'>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="Address">
                            {getFieldDecorator('Address', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
            </Fragment>
        )
    }

}

export default InfoModal;