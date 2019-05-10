import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Table, Pagination, Popconfirm, Button,
    Form, Row, Col, Input, Divider, Card, Steps
} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './leaveDetail.less';

@connect(state => {
    console.log(state.loading.models.leaves)
    return {
        leavesByUser: state.leaves.list,
        loading: state.loading.models.leaves,
    }
})
@Form.create()
class leaveDetails extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: 'leaves/getLeavesByUser' })
    }

    columns = [
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: text => <a >{text}</a>,
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTIme',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                const leaveStatus =
                    record.isApproved === 'approve'
                        ? 'Approve' : record.isApproved === "reject" ? 'Reject' : 'Processing'
                return (
                    <span>
                        <a >{leaveStatus}</a>
                    </span>
                )
            }
        },
    ];


    render() {
        const { Step } = Steps;
        let ProcessStatus = 0;
        const { leavesByUser,loading } = this.props
        let leaves = [];
        if (leavesByUser.length > 0) {
            if (leavesByUser[0].isApproved === 'pending') {
                ProcessStatus = 1;
            } else {
                ProcessStatus = 2;
            }
            leaves = leavesByUser.map((item) => {
                return {
                    ...item,
                    startTime: item.startTime.slice(0, 10),
                    endTime: item.endTime.slice(0, 10),
                }
            })
        }
        return (
            <Fragment>
                <Card title="My Leave Request"
                    bordered={false}
                    style={{ marginBottom: '30px' }}>
                    <Steps progressDot current={ProcessStatus}>
                        <Step title="No Recent Request" description="" />
                        <Step title="In Processing" description="" />
                        <Step title="Processed" description="" />
                    </Steps>
                </Card>
                <Card title="Leave History"
                    bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            <Table
                                columns={this.columns}
                                dataSource={leaves}
                                loading={loading}
                            />
                        </div>
                    </div>
                </Card>

            </Fragment>


        )
    }

}

export default leaveDetails;