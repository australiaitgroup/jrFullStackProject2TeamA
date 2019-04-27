import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

import { Form, Modal, Input, Row, Col } from 'antd'
import { assignAll } from 'lodash-decorators/utils';

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
        this.setState({
            visible: true,
        });
    }
    cancelHandler = () => {
        this.setState({
            visible: false,
        })
    }
    okHandler = () => {
        const { title, form: { validateFields },dispatch } = this.props;
        validateFields((err, values) => {
            if (!err) {
                console.log(values);
                if(title==="Add User"){
                    dispatch({
                        type: 'users/addUser',
                        payload: values,
                      });
                }
                if(title==="Edit"){

                }
            }
        });


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
                    onCancel={this.cancelHandler}
                    onOk={this.okHandler}
                >
                    <Form layout="horizontal" hideRequiredMark>
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
                                        required: false,
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