import React from 'react';
import { Form, InputNumber } from 'antd';

const ProjectTimeForm = ( {code_tasks, id_project} ) => {
    const services = code_tasks.filter((v) => 
        v.code_service.id === id_project.code_service.id)
        
    const service_view = services.map((code, index) => {
        return (
            // <Form.Item key={index} label={code.name} name={code.code}>
            //     <InputNumber />
            // </Form.Item>
            <Form.Item label={code.name} key={index} >
                <Form.Item 
                    name={code.code} 
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <InputNumber />
                </Form.Item>
                <Form.Item 
                    name='11' 
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <InputNumber />
                </Form.Item>
            </Form.Item>
        )});

    // task 코드 와 프로젝트 별 작업시간 코드 비교 후 시같 정보 추출..
    const serviceInitValue = services.map((value, index) => {
        const worktime_filter = id_project.worktime_mgrs.filter((v) => {
            return v.code_task == value.id
        })[0].planTime
        // const worktime_filter2 = worktime_filter.filter((v) => {
        //     return v.code_task == value.id
        // })[0].planTime
        // console.log("22>>>", worktime_filter);
        return ([value.code, worktime_filter])
    });
    console.log("init>>>", serviceInitValue)

    // 위 Array 를 객체로 변경
    const arrayToObject = () => {
        let obj = {};
        serviceInitValue.forEach((v) => {
            let key = v[0];
            let value = v[1];

            obj[key] = value;
        })
    return obj;
    } 
    console.log("array>>>",arrayToObject());


    return (
        <>
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={ arrayToObject() }
            >
        {/* <h1>ProjectTimeForm....</h1> */}
        { service_view }
        </Form>
        </>
    )

};

export default ProjectTimeForm;