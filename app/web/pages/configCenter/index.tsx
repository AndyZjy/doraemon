import React, { Fragment, useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Table, message as Message, Popconfirm } from 'antd';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import ConfigFileModal from './components/configFileModal';
import DtTag from '@/components/dtTag';
import { API } from '@/api';
import moment from 'moment';
import './style.scss';
const ConfigCenter = () => {
    const [configList, setConfigList] = useState([]);
    const [currentConfigFile, setCurrentConfigFile] = useState({});
    const [configFileModalVisible, setConfigFileModalVisible] = useState(false);
    const [tablePagination, setTablePagination] = useState({
        size: 'small',
        current: 1,
        pageSize: 20,
        total: 0,
        tags: []
    });
    const [tagList, setTagList] = useState([])
    const [loading, setTableLoading] = useState(false)
    useEffect(() => {
        API.getAllTagList().then((response: any) => {
            const { success, data } = response;
            if (success) {
                setTagList(data.data)
            }
        })
    }, [])
    const getTableColumns = () => {
        return [{
            title: '文件名',
            key: 'filename',
            dataIndex: 'filename',
            width: 200,
            render: (value: any, row: any) => <Link to={`/page/config-detail/${row.id}`}>{value}</Link>
        }, {
            title: '路径',
            key: 'filePath',
            dataIndex: 'filePath',
            width: 320
        }, {
            title: '主机',
            key: 'hostIp',
            dataIndex: 'hostIp',
            width: 180
        }, {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            filterMultiple: true,
            filters: tagList.map((item: any) => {
                return {
                    text: item.tagName,
                    value: `${item.id}`
                }
            }),
            render: (item: any) => {
                return <DtTag color={item.tagColor}>{item.tagName}</DtTag>
            }
        }, {
            title: '备注',
            key: 'remark',
            dataIndex: 'remark'
        }, {
            title: '更新时间',
            key: 'updated_at',
            dataIndex: 'updated_at',
            render: (date: any) => date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '',
            width: 180
        }, {
            title: '操作',
            key: 'operation',
            width: 140,
            render: (value: any, row: any) => {
                return <Fragment>
                    <a onClick={handleConfigFileEdit.bind(this, row)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm title={`确认是否删除「${row.filename}」？`} onConfirm={handleConfigFileDelete.bind(this, row)}>
                        <a >删除</a>
                    </Popconfirm>
                </Fragment>
            }
        }]
    }
    const handleConfigFileEdit = (row: any) => {
        setCurrentConfigFile(row);
        setConfigFileModalVisible(true)
    }
    const handleConfigFileDelete = (row: any) => {
        const { id, filename } = row;
        API.deleteConfig({
            id
        }).then((response: any) => {
            const { success } = response;
            if (success) {
                Message.success(`文件「${filename}」删除成功`);
                loadMainData();
            }
        });
    }
    const handleConfigFileAdd = () => {
        setConfigFileModalVisible(true);
        setCurrentConfigFile({});
    }
    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const { current } = pagination;
        const { tags } = filters;
        setTablePagination(preState => {
            return {
                ...preState,
                current,
                tags
            }
        });
    }
    const loadMainData = () => {
        const { current, pageSize, tags } = tablePagination;
        setTableLoading(true)
        API.getConfigList({
            current,
            size: pageSize,
            tags
        }).then((response: any) => {
            const { success, data } = response;
            if (success) {
                setConfigList(data.data);
                setTablePagination({
                    ...tablePagination,
                    total: data.total
                })
            }
        }).finally(() => {
            setTableLoading(false);
        });
    }
    const handleConfigFileModalAction = (type: any) => {
        setConfigFileModalVisible(false)
        if (type === 'ok') {
            const isAdd = isEmpty(currentConfigFile);
            if (isAdd) {
                if (tablePagination.current === 1) {
                    loadMainData();
                }
                setTablePagination({
                    ...tablePagination,
                    current: 1
                });
            } else {
                loadMainData();
            }
        }
    }
    useEffect(() => {
        loadMainData();
    }, [tablePagination.current, ...tablePagination.tags])
    return (
        <div className="page-config-center">
            <div className="header_title">
                <span className="title">
                    配置中心
                </span>
                <Button icon={<PlusCircleOutlined />} type="primary" onClick={handleConfigFileAdd}>新增配置</Button>
            </div>
            <div>
                <Table
                    rowKey="id"
                    className="dt-table-fixed-base"
                    scroll={{ y: 'calc(100vh - 64px - 40px - 44px - 44px - 67px)' }}
                    style={{ height: 'calc(100vh - 64px - 40px - 44px)' }}
                    columns={getTableColumns()}
                    dataSource={configList}
                    loading={loading}
                    pagination={{
                        size: 'small',
                        showSizeChanger: false,
                        total: tablePagination.total,
                        current: tablePagination.current,
                        pageSize: tablePagination.pageSize,
                        showTotal: (total: any) => <span>共<span style={{ color: '#3F87FF' }}>{total}</span>条数据，每页显示{tablePagination.pageSize}条</span>
                    }}
                    onChange={handleTableChange} />
            </div>
            {configFileModalVisible && <ConfigFileModal
                tagList={tagList}
                value={currentConfigFile}
                visible={configFileModalVisible}
                onOk={handleConfigFileModalAction.bind(this, 'ok')}
                onCancel={handleConfigFileModalAction.bind(this, 'cancel')} />}
        </div>
    );
}
export default ConfigCenter;