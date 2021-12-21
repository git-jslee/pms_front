import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/constants';
import { Button, Table, Tag, Space } from 'antd';

const Home = () => {
    const [ lists, setLists ] = useState([]);
    const columns = [
        {
          title: '고객사',
          dataIndex: 'customer',
          key: 'customer',
        },
        {
          title: '구분',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '프로젝트명',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '상태',
          key: 'status',
          dataIndex: 'status',
        },
        {
          title: '시작일',
          key: 'startdate',
          dataIndex: 'startdate',
        },
      ];

    useEffect(() => {
        axios.get(`${API_URL}/projects`)
        .then((result) => {
            const lists = result.data;
            setLists(lists);
            console.log(lists)
        }).catch((error) => {
            console.error('에러발생 : ', error)
        })
    }, []);

    const data = [];
    const projectlist = lists.map((list, index) => {
        const array = {
            key: index,
            customer:  list.customer.name,
            type: list.code_type.name,
            name: list.name,
            status: list.code_status.name,
            startdate: list.planStartDate,
        }
        data.push(array);
    })

    return (
        <div>
            <h1>Main Page</h1>
            <Link to='/project'>
                <Button>프로젝트 등록</Button>
            </Link>
            <Link to='/work'>
                <Button>작업 등록</Button>
            </Link>
            <Link to='/customer'>
                <Button>고객 등록</Button>
            </Link>
            <Link to='/customer'>
                <Button>유지보수</Button>
            </Link>
            <hr></hr>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default Home;