
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './Infos.less'
import InfoDetail from './InfoDetail'
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
              <TabPane tab="Personal info" key="1">
                <InfoDetail />
              </TabPane>
              <TabPane tab="Security" key="2">Content of tab 2</TabPane>
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