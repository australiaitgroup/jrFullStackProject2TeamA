import React, { PureComponent } from 'react';
import router from 'umi/router';
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
	Alert,
	Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './LeaveApplication.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ormat = 'HH';

@connect(({ leaves, user, loading }) => ({
	leaves,
	user,
	loading: loading.models.leaves,

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
		timeError:false,
	}
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({
			type: 'user/fetchAdmins',
		});
	}
	handleSubmit = e => {
		const { dispatch, form, user } = this.props;
		const { currentUser } = user
		e.preventDefault();
		const currentApplicant = this.state.applicant;
		const currentDescription = this.state.description;
		const chosenLeaveType = this.state.leaveType;
		const currentSupervisor = this.state.supervisor;
		form.validateFieldsAndScroll((err, values) => {
			values["applicant"]=currentUser._id;
			const annualLeaveBalance = currentUser.annualLeaveBalance;
			const personalLeaveBalance = currentUser.personalLeaveBalance;
			const startTime = moment(values.startTime).toDate();
			const endTime = moment(values.endTime).toDate();
			const type = values["leaveSubType"];
			const paid = values["paid"];
			const duration = Math.ceil((endTime-startTime)/3600000);
			console.log(type);
			console.log(paid);
			let isError = false;
			let isZeroAnnualBalance=false;
			let isZeroPersonalBalance=false;
			// if type
			if(duration < 0){
				isError = true;
				this.setState({
					timeError: true,
				})
			}
			if(type==='annual' && annualLeaveBalance-duration<0){
				isZeroAnnualBalance=true;
			}
			if(type==='personal' && personalLeaveBalance-duration<0){
				isZeroPersonalBalance=true;
			}
			if (!err && !isError) {
				if(isZeroAnnualBalance || isZeroPersonalBalance){
					if(isZeroAnnualBalance){
						confirm({
							title: formatMessage({ id: 'leaves.annualLeaveBalance.WarningTitle' }),
							content: formatMessage({ id: 'leaves.annualLeaveBalance.WarningContent' }),
							onOk() {
								dispatch({
									type: 'leaves/addNewLeave',
									payload: values
								});
								window.location.replace("/leave-history");
							},
							onCancel() {},
						});
					}
					if(isZeroPersonalBalance){
						confirm({
							title: formatMessage({ id: 'leaves.personalLeaveBalance.WarningTitle' }),
							content: formatMessage({ id: 'leaves.personalLeaveBalance.WarningContent' }),
							onOk() {
								dispatch({
									type: 'leaves/addNewLeave',
									payload: values
								});
								window.location.replace("/leave-history");
							},
							onCancel() {},
						});
					}
				}else{
					dispatch({
						type: 'leaves/addNewLeave',
						payload: values
					});
					window.location.replace("/leave-history");
				}
			}
		});
	};

	render() {
		const {user} = this.props;
		const {timeError}=this.state;
		console.log(timeError);
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
				{timeError?<div>
					<Alert type="error" message={<FormattedMessage id="leaves.timeError.message" />} banner closable/>
				</div>:null}
				<Card bordered={false}>
					<Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
						<FormItem {...formItemLayout} label={<FormattedMessage id="leave.leaveApplication.startTime" />}>
							{getFieldDecorator('startTime', {
								rules: [
									{
										required: true,
										message: formatMessage({ id: 'leaves.validation.startTime' }),
									},
								],
							})(
								<DatePicker
									showTime={{ format: 'HH:mm:ss' }}
									format="YYYY-MM-DD HH:mm:ss"
									style={{ width: '100%' }}
									placeholder={formatMessage({ id: 'leaves.startDate.placeholder' }).toString()}
								/>
							)}
						</FormItem>
						<FormItem {...formItemLayout} label={<FormattedMessage id="leave.leaveApplication.endTime" />}>
							{getFieldDecorator('endTime', {
								rules: [
									{
										required: true,
										message: formatMessage({ id: 'leaves.validation.endTime' }),
									},
								],
							})(
								<DatePicker
									showTime={{ format: 'HH:mm:ss' }}
									format="YYYY-MM-DD HH:mm:ss"
									style={{ width: '100%' }}
									placeholder={formatMessage({ id: 'leaves.endDate.placeholder' }).toString()}
								/>
							)}
						</FormItem>
						<FormItem {...formItemLayout} label={<FormattedMessage id="leave.leaveApplication.leaveType" />}>
							{getFieldDecorator('leaveSubType', {
								rules: [
									{
										required: true,
										message: formatMessage({ id: 'leaves.validation.leaveType' }),
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
										message: formatMessage({ id: 'leaves.validation.paid' }),
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
										message: formatMessage({ id: 'leaves.validation.description' }),
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
										message: formatMessage({ id: 'leaves.validation.supervisor' }),
									},
								],
							})(
								<Select>
									{admins ? admins.map((item) =>
										<Option value={item._id} key={item._id}>{item.firstName + " " + item.lastName + " : " + item.email}</Option>
									) : <Option value="select">select</Option>}
								</Select>
							)}
						</FormItem>
						<FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
						<Button type="primary" htmlType="submit">
							<FormattedMessage id="form.submit" />
						</Button>
						</FormItem>
					</Form>
				</Card>
			</PageHeaderWrapper>
		);
	}
}

export default LeaveApplication;