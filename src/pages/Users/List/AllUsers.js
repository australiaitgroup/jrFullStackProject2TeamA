import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Form, Row, Col, Input, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './AllUsers.less';
import InfoModal from './InfoModal';

const columns = [
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
		render: () => {
			return (
				<span>
					<InfoModal title='Edit'
					><a href="">Edit</a>
					</InfoModal>
					<Divider type="vertical" />
					<Popconfirm title="Confirm to delete?">
						<a href="">Delete</a>
					</Popconfirm>

				</span>
			)
		}
	},
];
//queryUser component
@Form.create()
class QueryUser extends Component {



	addUserHandler() {

	}

	render() {
		const { form: { getFieldDecorator } } = this.props;
		return (
			<Form onSubmit={this.handleSearch} layout="inline">
				<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
					<Col md={8} sm={24}>
						<Form.Item label="Email">
							{getFieldDecorator('email')(<Input placeholder="Email" />)}
						</Form.Item>
					</Col>
					<Col md={8} sm={24}>
						<span className={styles.submitButtons}>
							<Button type="primary" htmlType="submit">
								Search
			  				</Button>
							<InfoModal title="Add User">
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
	return { userList: state.users.list }
})
@Form.create()
class AllUsers extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({ type: 'users/getAllUsers' })
	}
	render() {
		const { userList } = this.props;
		console.log(userList);
		const dataSource = [{
			key: '1',
			name: 'John Brown',
			email: 32,
			address: 'New York No. 1 Lake Park',
		}, {
			key: '2',
			name: 'Jim Green',
			email: 42,
			address: 'London No. 1 Lake Park',
		}, {
			key: '3',
			name: 'Joe Black',
			email: 32,
			address: 'Sidney No. 1 Lake Park',
		}, {
			key: '4',
			name: 'Disabled User',
			email: 99,
			address: 'Sidney No. 1 Lake Park',
		}];
		return (
			<Fragment>
				<div className={styles.tableList}>
					<div className={styles.queryForm}><QueryUser /></div>
					<div className={styles.tableListForm}>
						<Table
							columns={columns}
							dataSource={userList}
						/>
					</div>
				</div>
			</Fragment>


		)
	}

}

export default AllUsers;