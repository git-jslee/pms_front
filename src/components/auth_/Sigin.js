import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import swal from 'sweetalert';
import axios from 'axios';
import { API_URL } from '../../config/constants';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       height: '100vh',
//     },
//     image: {
//       backgroundImage: 'url(https://source.unsplash.com/random)',
//       backgroundSize: 'cover',
//     },
//     paper: {
//       margin: theme.spacing(8, 4),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     avatar: {
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//       width: '100%',
//       marginTop: theme.spacing(1),
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
// }));


const Sigin = () => {
  const info = (username) => {
    if (username !== undefined) {
      message.info(`로그인 성공 - ${username}`);
    } else {
      message.info(`ID/Paword 를 확인해 주세요`);
    }
    
  };

  const loginUser = (id, password) => {
      axios.post(`${API_URL}/auth/local`, {
        identifier: id,
        password: password,
      }).then((result) => {
      console.log("22>>>", result);
      if ('jwt' in result.data) {
        console.log("jwt>>>>")
        localStorage.setItem('jwt', result.data['jwt']);
        localStorage.setItem('user', JSON.stringify(result.data['user']));
        // window.location.href = "/profile";
        info(result.data.user.username);
      }
    })
    .catch((error) => {
      info();
      console.error('에러발생 : ', error)
    })
  };
  
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = e => {
    console.log("11>>>>", e);
    const response = loginUser(
      e.identifier, e.password,
    );
    // console.log("33response>>", response);
  }

  return (
    <>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="identifier"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );

};

export default Sigin;