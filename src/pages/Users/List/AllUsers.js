import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Form, Row, Col, Input, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './AllUsers.less';
import InfoModal from './InfoModal';


//queryUser component
@connect(({ loading }) => ({ loading: loading.models.users }))
@Form.create()
class QueryUser extends Component {



	handleSearch = (e) => {
		e.preventDefault()
		const { dispatch } = this.props;
		this.props.form.validateFields((err, values) => {
			const { email } = values;
			console.log(email);
			if (email != null) {
				dispatch({ type: 'users/queryUser', payload: { email } })
			}
		});

	}

	render() {
		const { form: { getFieldDecorator } } = this.props;
		return (
			<Form onSubmit={this.handleSearch} layout="inline">
				<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
					<Col md={10} sm={24}>
						<Form.Item label="Email">
							{getFieldDecorator('email')(<Input placeholder="Email" />)}
						</Form.Item>
					</Col>
					<Col md={12} sm={24}>
						<span className={styles.submitButtons}>
							<Button type="primary" htmlType="submit">
								Search
			  				</Button>
							<InfoModal title="Add User" record={{}}>
								<Button icon="plus" style={{ marginLeft: 8 }}>
									New User
			  				</Button>
							</InfoModal>
						</span>
					</Col>
				</Row>
			</Form>
		)
	}

}


@connect(state => {
	// const userList=[];
	return {
		userList: state.users.list,
		loading: state.loading.models.users
	}
})
@Form.create()
class AllUsers extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({ type: 'users/getAllUsers' })
	}
	deleteHandler(id) {
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
			title: 'Address',
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
						<InfoModal title='Edit' record={record}
						><a href="">Edit</a>
						</InfoModal>
						<Divider type="vertical" />
						<Popconfirm title="Confirm to delete?" onConfirm={this.deleteHandler.bind(this, record._id)}>
							<a href="">Delete</a>
						</Popconfirm>

					</span>
				)
			}
		},
	];


	render() {
		const { userList, loading } = this.props;
		console.log(loading);
		const newUserList = userList.map(user => {
			return {
				...user,
				name: `${user.firstName} ${user.lastName}`
			}
		})
		return (
			<Fragment>
				<div className={styles.tableList}>
					<div className={styles.queryForm}><QueryUser /></div>
					<div className={styles.tableListForm}>
						<Table
							columns={this.columns}
							dataSource={newUserList}
							loading={loading}
						/>
					</div>
				</div>
			</Fragment>


		)
	}

}

export default AllUsers;