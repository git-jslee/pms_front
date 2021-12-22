import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/constants';
import {useParams} from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Divider,
  message,
} from 'antd';

let code_types = [];
let customers = [];
let code_services = [];
let code_statuses = [];
let code_tasks = [];
// let id_project = [];

const ProjectView = () => {
    const {id} = useParams();
    const [responses, setResponses] = useState();
    const [id_project, setId_project] = useState();
    
    useEffect(() => {
      axios
      .all([
          axios.get(`${API_URL}/code-types`),
          axios.get(`${API_URL}/customers`), 
          axios.get(`${API_URL}/code-services`),
          axios.get(`${API_URL}/code-statuses`),
          axios.get(`${API_URL}/code-tasks`),
          axios.get(`${API_URL}/projects/${id}`),
      ])
      .then(
          axios.spread((...responses) => {
          setId_project(responses[5].data)
          setResponses(responses);
          })
      )
      .catch((error) => {
          console.error('에러발생 : ', error)
      })
  }, []);

    // if(responses.length > 1) {
    //     // code_types = responses[0].data;
    //     // customers = responses[1].data;
    //     // code_services = responses[2].data;
    //     // code_statuses = responses[3].data;
    //     // code_tasks = responses[4].data;
    //     // id_project = responses[5].data;
    // }

    // console.log(projects);
    // const init_view = (value) => {
    //     console.log(value);
    //     const project_name = value.name;
    //     const name = `크레아 홈페이지 프로젝트 `;
    //     console.log(name);
    //     return {
    //         type: 1,
    //         project: project_name,
    //         test: name,
    //     }
    // }
    console.log(">>>>", responses);

    // if (responses == null){
    //     console.log('로딩중....')
    //     return <h1>로딩중...</h1>
    // };

    return (
        <>
            <h1>Project View 페이지..</h1>
            <hr></hr>
            {
              responses == null ? (
                <h1>로딩중...</h1>
                ) : (
                <ProjectForm responses={responses} id_project={id_project} />
                ) 
            }
        </>
    );
};

export default ProjectView;