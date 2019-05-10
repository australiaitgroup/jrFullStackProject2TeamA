
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './Infos.less'
import InfoDetail from './InfoDetail'
import SecurityView from './SecurityView'
import { formatMessage, FormattedMessage } from 'umi/locale';
const TabPane = Tabs.TabPane;
@connect()
class Info extends Component {


	render() {
		const { children } = this.props;
		return (
			<Fragment>
				<div className={styles.main}
				>
					<div>
						<Tabs
							defaultActiveKey="1"
							tabPosition='left'
						>
							<TabPane tab={<FormattedMessage id="user.personalInfo" />}key="1">
								<InfoDetail />
								
							</TabPane>
							<TabPane tab={<FormattedMessage id="user.security" />} key="2">
								<SecurityView />
							</TabPane>
						</Tabs>
					</div>
					<div >
						{children}
					</div>
				</div>
			</Fragment>
		)
	}
}

export default Info;