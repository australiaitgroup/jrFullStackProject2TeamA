import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
	getNoticeData() {
		const { notices = [] } = this.props;
		if (notices.length === 0) {
			return {};
		}
		const newNotices = notices.map(notice => {
		const newNotice = { ...notice };
		if (newNotice.datetime) {
			newNotice.datetime = moment(notice.datetime).fromNow();
		}
		if (newNotice.id) {
			newNotice.key = newNotice.id;
		}
		if (newNotice.extra && newNotice.status) {
			const color = {
				todo: '',
				processing: 'blue',
				urgent: 'red',
				doing: 'gold',
			}[newNotice.status];
			newNotice.extra = (
				<Tag color={color} style={{ marginRight: 0 }}>
					{newNotice.extra}
				</Tag>
			);
		}
		return newNotice;
		});
		return groupBy(newNotices, 'type');
	}

	getUnreadData = noticeData => {
		const unreadMsg = {};
		Object.entries(noticeData).forEach(([key, value]) => {
			if (!unreadMsg[key]) {
				unreadMsg[key] = 0;
			}
			if (Array.isArray(value)) {
				unreadMsg[key] = value.filter(item => !item.read).length;
			}
		});
		return unreadMsg;
	};

	changeReadState = clickedItem => {
		const { id } = clickedItem;
		const { dispatch } = this.props;
		dispatch({
			type: 'global/changeNoticeReadState',
			payload: id,
		});
	};

	fetchMoreNotices = tabProps => {
		const { list, name } = tabProps;
		const { dispatch, notices = [] } = this.props;
		const lastItemId = notices[notices.length - 1].id;
		dispatch({
			type: 'global/fetchMoreNotices',
			payload: {
				lastItemId,
				type: name,
				offset: list.length,
		},
		});
	};

	render() {
		const {
			currentUser,
			fetchingMoreNotices,
			fetchingNotices,
			loadedAllNotices,
			onNoticeVisibleChange,
			onMenuClick,
			onNoticeClear,
			skeletonCount,
			theme,
		} = this.props;
		const menu = (
			<Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
				<Menu.Item key="userinfo">
				<Icon type="setting" />
				<FormattedMessage id="menu.settings" defaultMessage="account settings" />
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="logout">
				<Icon type="logout" />
				<FormattedMessage id="menu.account.logout" defaultMessage="logout" />
				</Menu.Item>
			</Menu>
		);
		const loadMoreProps = {
			skeletonCount,
			loadedAll: loadedAllNotices,
			loading: fetchingMoreNotices,
		};
		const noticeData = this.getNoticeData();
		const unreadMsg = this.getUnreadData(noticeData);
		let className = styles.right;
		if (theme === 'dark') {
			className = `${styles.right}  ${styles.dark}`;
		}
		return (
			<div className={className}>
				{currentUser.name ? (
				<HeaderDropdown overlay={menu}>
					<span className={`${styles.action} ${styles.account}`}>
					<span className={styles.name}>{currentUser.name}</span>
					</span>
				</HeaderDropdown>
				) : (
				<Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
				)}
				<SelectLang className={styles.action} />
			</div>
		);
	}
}
