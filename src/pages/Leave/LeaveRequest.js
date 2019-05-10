import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Form, Row, Col, Input, Divider, Card } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './leaveRequest.less';
import Link from 'umi/link';

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
			title: 'Start Time',
			dataIndex: 'startTime',
			key: 'startTime',
			render: text => text.slice(0, 10),
		},
		{
			title: 'End Time',
			dataIndex: 'endTime',
			key: 'endTIme',
			render: text => text.slice(0, 10)
		},
		{
			title: 'Actions',
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
	];


	render() {
		const { requestList, loading } = this.props;
		console.log(loading)
		let leaveList = []
		if (requestList.length > 0) {
			leaveList = requestList.map((request) => {
				const { applicant: { email, firstName, lastName, x } } = request
				return {
					...request,
					email,
					x,
					name: `${firstName} ${lastName}`
				}
			})
		}

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
				<Card title="My Leave Approvals"
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