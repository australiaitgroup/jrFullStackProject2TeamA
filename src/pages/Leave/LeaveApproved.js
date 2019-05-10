import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Form, Row, Col, Input, Divider, Card } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './leaveApproved.less';
import Link from 'umi/link';

@connect(state => {
	const requestList = [];
	return {
		requestList: state.leaves.list,
		loading: state.loading.models.leaves
	}

})
@Form.create()
class LeaveApproved extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({ type: 'leaves/getLeaveApproved' })
	}

	columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: text => <a>{text}</a>,
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
			render: text => text.slice(0, 10),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (text, record) => {
				return (
					<span>
						<a >{record.isApproved}</a>
					</span>
				)
			}
		},
	];

	render() {
		const { requestList, loading } = this.props;
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
				<Card title="Leaves Approved"
					extra={<Link to='/leave-management/leaverequest'>{'<<Back'}</Link>}
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
export default LeaveApproved;