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

	columns = [
		{
			title: formatMessage({ id: 'leaves.list.action' }),
			dataIndex: 'actions',
			key: 'actions',
			render: (text, record) => {
				return (

					<span>
						<Action record={record} action="approve">Approve</Action>
						<Divider type="vertical" />
						<Action record={record} action='reject'>Reject</Action>
					</span>
				)
			}
		},
		{
			title: formatMessage({ id: 'leaves.list.name' }),
			dataIndex: 'name',
			key: 'name',
			render: text => <a href="">{text}</a>,
		},
		{
			title: formatMessage({ id: 'leaves.list.email' }),
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: formatMessage({ id: 'leaves.list.annualLeaveBalance' }),
			dataIndex: 'annualLeaveBalance',
			key: 'annualLeaveBalance',
		},
		{
			title: formatMessage({ id: 'leaves.list.personalLeaveBalance' }),
			dataIndex: 'personalLeaveBalance',
			key: 'personalLeaveBalance',
		},
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
            dataIndex: 'leaveSubType',
            key: 'leaveSubType',
        },
        {
            title: formatMessage({ id: 'leaves.list.paid' }),
            dataIndex: 'Paid',
            key: 'paid',
            render: text => <p>{text.toString()}</p>
        },
        {
            title: formatMessage({ id: 'leave.leaveApplication.description' }),
            dataIndex: 'description',
            key: 'description',
        },
		
	];


	render() {
		const { requestList, loading } = this.props;
		console.log(loading)
		let leaveList = []
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
					extra={<Link to='/leave-management/leaveapproved'>Leave Approved</Link>}
					bordered={false}>
					<div className={styles.tableList}>
						<div className={styles.tableListForm}>
							<Table
								columns={this.columns}
								dataSource={leaveList}
								loading={loading}
							/>
						</div>
					</div>
				</Card>
			</Fragment>


		)
	}

}

export default LeaveRequest;