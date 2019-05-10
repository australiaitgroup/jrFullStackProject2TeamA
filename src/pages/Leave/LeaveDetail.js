import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Table, Pagination, Popconfirm, Button,
    Form, Row, Col, Input, Divider, Card, Steps
} from 'antd';
import { routerRedux } from 'dva/router';
import { formatMessage, FormattedMessage } from 'umi/locale';
import styles from './leaveDetail.less';
import moment from 'moment';

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
            title: formatMessage({ id: 'leaves.list.starttime' }),
            dataIndex: 'startTime',
            key: 'startTime',
            render: text => <p>{moment(text).format('YYYY.MM.DD HH:MM')}</p>,
        },
        {
            title: formatMessage({ id: 'leaves.list.endtime' }),
            dataIndex: 'endTime',
            key: 'endTime',
            render: text => <p>{moment(text).format('YYYY.MM.DD HH:MM')}</p>,
        },
        {
            title: formatMessage({ id: 'leaves.list.duration' }),
            dataIndex: 'duration',
            key: 'duration',
            render: text => <p>{text}h</p>
        },
        {
            title: formatMessage({ id: 'leaves.list.leavetype' }),
            dataIndex: 'leaveType.leaveSubType',
            key: 'leaveSubType',
        },
        {
            title: formatMessage({ id: 'leaves.list.paid' }),
            dataIndex: 'leaveType.Paid',
            key: 'paid',
            render: text => <p>{text.toString()}</p>
        },
        {
            title: formatMessage({ id: 'leave.leaveApplication.description' }),
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: formatMessage({ id: 'leave.leaveApplication.status' }),
            dataIndex: 'status',
            key: 'status',
            filters:[{text:'Processing', value:'pending'},{text:'Rejected',value:'reject'},{text:'Approved',value:'approve'}],
            render: (text, record) => {
                const leaveStatus = 
                record.isApproved === 'approve' 
                ? 'Approved' : record.isApproved === "reject" ? 'Rejected' : 'Processing'
                return (
                    <span>
                        <p>{leaveStatus}</p>
                    </span>
                )
            }
        },
    ];

    // handleTableChange = (filters)=>{

    // }


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