import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Table, Pagination, Popconfirm, Button,
    Form, Row, Col, Input, Divider, Card, Steps
} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './leaveDetail.less';

@connect(state => {
    return { leavesByUser: state.leaves.list }
})
@Form.create()
class leaveDetails extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: 'leaves/getLeavesByUser' })
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
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'satartTime',
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
                ? 'Approved' : record.isApproved === "reject" ? 'reject' : 'Processing'
                return (
                    <span>
                        <a onClick={this.approveHandler}>{leaveStatus}</a>
                    </span>
                )
            }
        },
    ];


    render() {
        const { Step } = Steps;
        let ProcessStatus = 0;
        const { leavesByUser } = this.props
        if(leavesByUser.length>0){
            if(leavesByUser[0].isApproved==='pending'){
                ProcessStatus=1;
            }else{
                ProcessStatus=2;
            }
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
                                dataSource={leavesByUser}
                            />
                        </div>
                    </div>
                </Card>

            </Fragment>


        )
    }

}

export default leaveDetails;