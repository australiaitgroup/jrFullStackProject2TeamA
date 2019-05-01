import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Table, Pagination, Popconfirm, Button,
    Form, Row, Col, Input, Divider, Card, Steps
} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './leaveDetail.less';

@connect()
@Form.create()
class leaveDetails extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: 'leaves/getLeaveRequest' })
    }
    approveHandler = () => {
        
        const { dispatch } = this.props;
        dispatch({ type: 'users/deleteUser', payload: { id } })
    };
    rejectHandler = (id) => {
        const { dispatch } = this.props;
        dispatch({ type: 'users/deleteUser', payload: { id } })
    };

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="">{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Duration',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => {
                return (
                    <span>
                        <a href="" onClick={this.approveHandler}>Approve</a>
                        <Divider type="vertical" />
                        <a href="" onClick={this.rejectHandler}>Reject</a>
                    </span>
                )
            }
        },
    ];


    render() {
        const {Step} = Steps;
        const dataSource = [
            {
                name: 'alex',
                email: 'alex@gmail.com',
            },
            {
                name: 'alex2',
                email: 'alex@gmail.com',
            },
            {
                name: 'alex3',
                email: 'alex@gmail.com',
            },

        ]
        return (
            <Fragment>
                <Card title="My Leave Request"
                    bordered={false}
                    style={{ marginBottom: '30px' }}>
                    <Steps progressDot current={0}>
                        <Step title="No Active Request" description="" />
                        <Step title="In Processing" description="" />
                        <Step title="Processed" description="" />

                    </Steps>
				</Card>
                <Card title="Leave History"
                    bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                        </div>
                    </div>
                </Card>

            </Fragment>


        )
    }

}

export default leaveDetails;