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
    state={
        leaves:[],
        filteredInfo:null,
        sortedInfo:null,
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: 'leaves/getLeavesByUser' })
    }
   
    

    handleChange = (pagination,filters,sorter)=>{
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        })
    }


    render() {
        const { Step } = Steps;
        let{filteredInfo, sortedInfo}=this.state;
        filteredInfo = filteredInfo || {};
        sortedInfo = sortedInfo || {};
        console.log(filteredInfo)
        let ProcessStatus = 0;
        const { leavesByUser,loading } = this.props;
        const columns = [
            {
                title: formatMessage({ id: 'leaves.list.starttime' }),
                dataIndex: 'startTime',
                key: 'startTime',
                sorter: (a, b) => Date.parse(a.startTime)- Date.parse(b.startTime),
                sortOrder: this.state.sortedInfo?this.state.sortedInfo.columnKey === 'startTime' && this.state.sortedInfo.order:null,
                render: text => <p>{moment(text).format('YYYY.MM.DD HH:MM')}</p>,
            },
            {
                title: formatMessage({ id: 'leaves.list.endtime' }),
                dataIndex: 'endTime',
                key: 'endTime',
                sorter: (a, b) => Date.parse(a.endTime)- Date.parse(b.endTime),
                sortOrder: this.state.sortedInfo?this.state.sortedInfo.columnKey === 'endTime' && this.state.sortedInfo.order:null,
                render: text => <p>{moment(text).format('YYYY.MM.DD HH:MM')}</p>,
            },
            {
                title: formatMessage({ id: 'leaves.list.duration' }),
                dataIndex: 'duration',
                key: 'duration',
                sorter: (a, b) => a.duration - b.duration,
                sortOrder: this.state.sortedInfo?this.state.sortedInfo.columnKey === 'duration' && this.state.sortedInfo.order:null,
                render: text => <p>{text}h</p>
            },
            {
                title: formatMessage({ id: 'leaves.list.leavetype' }),
                dataIndex: 'leaveType.leaveSubType',
                key: 'leaveSubType',
                filters:[{text:'Annual', value:'annual'},{text:'Personal',value:'personal'}],
                filteredValue: this.state.filteredInfo?this.state.filteredInfo.leaveSubType:null,
                onFilter:(value, record) => record.leaveType.leaveSubType.includes(value),
            },
            {
                title: formatMessage({ id: 'leaves.list.paid' }),
                dataIndex: 'leaveType.Paid',
                key: 'paid',
                filters:[{text:'True', value:'true'},{text:'False',value:'false'}],
                filteredValue: this.state.filteredInfo?this.state.filteredInfo.paid:null,
                onFilter:(value, record) => record.leaveType.Paid.toString().includes(value),
                render: text => <p>{text.toString()}</p>
            },
            {
                title: formatMessage({ id: 'leave.leaveApplication.description' }),
                dataIndex: 'description',
                key: 'description',
                render: text => 
                    <div style={{width:200,wordWrap: 'break-word'}}>
                        <p>{text.toString()}</p>
                    </div>
            },
            {
                title: formatMessage({ id: 'leave.leaveApplication.status' }),
                dataIndex: 'status',
                key: 'status',
                filters:[{text:'Processing', value:'pending'},{text:'Rejected',value:'reject'},{text:'Approved',value:'approve'}],
                filteredValue: this.state.filteredInfo?this.state.filteredInfo.status:null,
                onFilter:(value, record) => record.isApproved.includes(value),
                fixed: 'right',
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
        
        return (
            <Fragment>
                <Card title={<FormattedMessage id="leaves.history" />}
                    bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            <Table
                                columns={columns}
                                dataSource={leavesByUser}
                                loading={loading}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </Card>
            </Fragment>
        )
    }

}

export default leaveDetails;