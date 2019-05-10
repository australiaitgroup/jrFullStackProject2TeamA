import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Form, Row, Col, Input, Divider, Card } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './leaveRequest.less';
import Link from 'umi/link';
import { formatMessage, FormattedMessage } from 'umi/locale';
import moment from 'moment';

@connect()
class Action extends Component {
	onClickAction = (e) => {
		e.preventDefault()
		const { dispatch, action, record } = this.props;
		const id = record._id;
		dispatch({
			type: 'leaves/approveLeave',
			payload: { id, action }
		})
	}

	render() {
		const { children } = this.props;
		return (
			<Fragment>
				<a onClick={this.onClickAction}>{children}</a>
			</Fragment>
		)

	}
}


@connect(state => {
	const requestList = [];
	return {
		requestList: state.leaves.list,
		loading: state.loading.models.leaves
	}

})
@Form.create()
class LeaveRequest extends Component {
	state={
		filteredInfo:null,
        sortedInfo:null,
	}
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({ type: 'leaves/getLeaveRequest' })
	}
	approveHandler = (id) => {
		const { dispatch } = this.props;
		dispatch({ type: 'users/deleteUser', payload: { id } })
	};
	rejectHandler = (id) => {
		const { dispatch } = this.props;
		dispatch({ type: 'users/deleteUser', payload: { id } })
	};
	handleChange = (pagination,filters,sorter)=>{
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        })
    }

	


	render() {
		const { requestList, loading } = this.props;
		console.log(loading)
		let{filteredInfo, sortedInfo}=this.state;
        filteredInfo = filteredInfo || {};
        sortedInfo = sortedInfo || {};
		let leaveList = []
		const columns = [
			{
				title: formatMessage({ id: 'leaves.list.action' }),
				dataIndex: 'actions',
				key: 'actions',
				fixed: 'left',
				render: (text, record) => {
					return (
	
						<span>
							<Action record={record} action="approve">{formatMessage({ id: 'leaves.approve' })}</Action>
							<Divider type="vertical" />
							<Action record={record} action='reject'>{formatMessage({ id: 'leaves.reject' })}</Action>
						</span>
					)
				}
			},
			{
				title: formatMessage({ id: 'leaves.list.name' }),
				dataIndex: 'name',
				key: 'name',
				fixed: 'left',
				render: text => <a href="">{text}</a>,
			},
			{
				title: formatMessage({ id: 'leaves.list.email' }),
				dataIndex: 'email',
				key: 'email',
				fixed: 'left',
			},
			{
				title: formatMessage({ id: 'leaves.list.annualLeaveBalance' }),
				dataIndex: 'annualLeaveBalance',
				key: 'annualLeaveBalance',
				sorter: (a, b) => a.annualLeaveBalance - b.annualLeaveBalance,
                sortOrder: this.state.sortedInfo?this.state.sortedInfo.columnKey === 'annualLeaveBalance' && this.state.sortedInfo.order:null,
			},
			{
				title: formatMessage({ id: 'leaves.list.personalLeaveBalance' }),
				dataIndex: 'personalLeaveBalance',
				key: 'personalLeaveBalance',
				sorter: (a, b) => a.personalLeaveBalance - b.personalLeaveBalance,
                sortOrder: this.state.sortedInfo?this.state.sortedInfo.columnKey === 'personalLeaveBalance' && this.state.sortedInfo.order:null,
			},
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
				dataIndex: 'leaveSubType',
				key: 'leaveSubType',
				filters:[{text:'Annual', value:'annual'},{text:'Personal',value:'personal'}],
                filteredValue: this.state.filteredInfo?this.state.filteredInfo.leaveSubType:null,
                onFilter:(value, record) => record.leaveType.leaveSubType.includes(value),
			},
			{
				title: formatMessage({ id: 'leaves.list.paid' }),
				dataIndex: 'Paid',
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
			
		];
		if (requestList.length > 0) {
			leaveList = requestList.map((request) => {
				const { applicant: { email, firstName, lastName, annualLeaveBalance, personalLeaveBalance,x },duration,startTime,endTime,description,leaveType:{leaveSubType,Paid} } = request
				return {
					...request,
					email,
					x,
					name: `${firstName} ${lastName}`,
					annualLeaveBalance, 
					personalLeaveBalance,
					leaveSubType,
					Paid,
				}
			})
		}

		return (
			<Fragment>
				<Card title={<FormattedMessage id="leaves.title.leaves" />} 
					extra={<Link to='/leave-management/leave-approved'>{formatMessage({ id: 'leaves.approved' })}</Link>}
					bordered={false}>
					<div className={styles.tableList}>
						<div className={styles.tableListForm}>
							<Table
								columns={columns}
								dataSource={leaveList}
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

export default LeaveRequest;