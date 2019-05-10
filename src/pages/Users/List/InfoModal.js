import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Modal, Input, Row, Col } from 'antd'
import { assignAll } from 'lodash-decorators/utils';
import styles from './InfoModal.less'

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
        const {
            record: { firstName, lastName, email, address }
        } = this.props
        this.props.form.setFieldsValue({
            email,
            firstName,
            lastName,
            address
        })

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
        const { title, record, form: { validateFields }, dispatch } = this.props;
        validateFields((err, values) => {
            //values = {
            //    name:""
            //    email:""
            //}
            if (!err) {

                if (title === "Add User") {
                    dispatch({
                        type: 'users/addUser',
                        payload: values,
                    });
                }
                if (title === "Edit") {
                    dispatch({
                        type: 'users/updateUser',
                        payload: {
                            fields: values,
                            id: record._id
                        }
                    });
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
                    width={620}
                    bodyStyle={{ padding: '12px 40px 18px' }}
                    title={title}
                    visible={this.state.visible}
                    onCancel={this.cancelHandler}
                    onOk={this.okHandler}
                >
                    <Form layout="horizontal" hideRequiredMark>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={12}>
                                <FormItem label="First Name">
                                    {getFieldDecorator('firstName', {
                                        rules: [
                                            {
                                                required: true,
                                            },
                                        ],
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label='Last Name'>
                                    {getFieldDecorator('lastName', {
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
                                        initialValue: "email",
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