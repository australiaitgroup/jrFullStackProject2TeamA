import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
	Form,
	Input,
	DatePicker,
	Select,
	Button,
	Card,
	InputNumber,
	Radio,
	Icon,
	Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './LeaveApplication.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ormat ='HH';

@connect(({ leaves, user }) => ({
  	leaves, user
}))
@Form.create()
class LeaveApplication extends PureComponent {
	state={
		applicant:'',
		description:'',
		leaveType:'',
		supervisor:'',
		startTime:'',
		endTime:'',
		paid:'',
	}
	componentDidMount(){
		const { dispatch} = this.props;
		dispatch({
			type: 'user/fetchAdmins',
		});
	}
	handleSubmit = e => {
		const { dispatch, form, user } = this.props;
		const {currentUser} = user
		e.preventDefault();
		const currentApplicant = this.state.applicant;
		const currentDescription = this.state.description;
		const chosenLeaveType = this.state.leaveType;
		const currentSupervisor = this.state.supervisor;
		form.validateFieldsAndScroll((err, values) => {
			values["applicant"]=currentUser._id;
			if (!err) {
				dispatch({
					type: 'leaves/addNewLeave',
					payload: values
				});
			}
		});
	};

	render() {
		const {user} = this.props;
		const {admins}= user;
		const {
			form: { getFieldDecorator, getFieldValue },
		} = this.props;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 7 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
				md: { span: 10 },
			},
		};

		const submitFormLayout = {
			wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 10, offset: 7 },
			},
		};

		return (
			<PageHeaderWrapper
				title={<FormattedMessage id="leaves.applicationForm.title" />}
				content={<FormattedMessage id="leaves.applicationForm.description" />}
			>
				<Card bordered={false}>
					<Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
						{/* <FormItem {...formItemLayout} label={<FormattedMessage id="leave.leaveApplication.user" />}>
						{getFieldDecorator('applicant', {
							rules: [
							{
								required: true,
								message: formatMessage({ id: 'validation.title.required' }),
							},
							],
						})(<Input placeholder={formatMessage({ id: 'leaves.user.placeholder' })} />)}
						</FormItem> */}
						<FormItem {...formItemLayout} label={<FormattedMessage id="form.date.label" />}>
						{getFieldDecorator('startTime', {
							rules: [
							{
								required: true,
								message: formatMessage({ id: 'validation.date.required' }),
							},
							],
						})(
							<DatePicker
								showTime={{format:'HH:mm:ss'}}
								format="YYYY-MM-DD HH:mm:ss"
								style={{ width: '100%' }}
								placeholder={[
									formatMessage({ id: 'leaves.startDate.placeholder' }),
								]}
							/>
						)}
						</FormItem>
						<FormItem {...formItemLayout} label={<FormattedMessage id="form.date.label" />}>
						{getFieldDecorator('endTime', {
							rules: [
							{
								required: true,
								message: formatMessage({ id: 'validation.date.required' }),
							},
							],
						})(
							<DatePicker
								showTime={{format:'HH:mm:ss'}}
								format="YYYY-MM-DD HH:mm:ss"
								style={{ width: '100%' }}
								placeholder={[
									formatMessage({ id: 'leaves.endDate.placeholder' }),
								]}
							/>
						)}
						</FormItem>
						<FormItem {...formItemLayout} label={<FormattedMessage id="leave.leaveApplication.leaveType" />}>
						{getFieldDecorator('leaveSubType', {
							rules: [
							{
								required: true,
								message: formatMessage({ id: 'validation.title.required' }),
							},
							],
						})(
							<Select >
								<Option value="annual">Annual</Option>
								<Option value="personal">Personal</Option>
							</Select>
						)}
						</FormItem>
						<FormItem {...formItemLayout} label={<FormattedMessage id="leave.leaveApplication.paid" />}>
						{getFieldDecorator('paid', {
							rules: [
							{
								required: true,
								message: formatMessage({ id: 'validation.title.required' }),
							},
							],
						})(
							<Select >
								<Option value="true">True</Option>
								<Option value="false">False</Option>
							</Select>
						)}
						</FormItem>
						<FormItem {...formItemLayout} label={<FormattedMessage id="leave.leaveApplication.description" />}>
							{getFieldDecorator('description', {
								rules: [
								{
									required: true,
									message: formatMessage({ id: 'validation.goal.required' }),
								},
								],
							})(
								<TextArea
								style={{ minHeight: 32 }}
								placeholder={formatMessage({ id: 'leaves.description.placeholder' })}
								rows={4}
								/>
							)}
						</FormItem>
						<FormItem {...formItemLayout} label={<FormattedMessage id="leave.leaveApplication.supervisor" />}>
							{getFieldDecorator('supervisor', {
								rules: [
								{
									required: true,
									message: formatMessage({ id: 'validation.title.required' }),
								},
								],
							})(
								<Select>
									{admins?admins.map((item)=>
										<Option value={item._id} key={item._id}>{item.firstName+" "+item.lastName+" : "+item.email}</Option>
									):<Option value="select">select</Option>}
								</Select>
							)}
						</FormItem>
						<FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
						<Button type="primary" htmlType="submit">
							<FormattedMessage id="form.submit" />
						</Button>
						<Button style={{ marginLeft: 8 }}>
							<FormattedMessage id="form.save" />
						</Button>
						</FormItem>
					</Form>
				</Card>
			</PageHeaderWrapper>
		);
	}
}

export default LeaveApplication;