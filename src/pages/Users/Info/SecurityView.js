import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { List } from 'antd';
import { compose } from 'redux';

const data = [
    {
        description:'Password Management',
        actions:[
            <a>Modify</a>,
            <a>Reset</a>
        ]
    },
];

class SecurityView extends Component {


    render() {

        return (
            <Fragment>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item actions={item.actions}>
                            <List.Item.Meta description={item.description} />
                        </List.Item>
                    )}
                />



            </Fragment>
        )
    }

}

export default SecurityView;