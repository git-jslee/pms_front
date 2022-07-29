import React from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout';
//
import ProjectTemplete from '../containers/project/ProjectTemplete';
//
// import HeaderContainer from '../containers/common/HeaderContainer';
// import SiteHeader from '../components/SiteHeader';
// import ProjectListContainer from '../containers/project/ProjectListContainer';
// import ProjectCountContainer from '../containers/project/ProjectCountContainer';
// import FormTemplate from '../components/common/FormTemplate';
// import ProjectSearchContainer from '../containers/project/ProjectSearchContainer';
// import ProjectSubContainer from '../containers/project/ProjectSubContainer';
//

// const LayoutTemplate = styled.div`
//   display: flex;
//   width: 1800px;
//   margin: 0 auto;
//   justify-content: space-between;
//   .header {
//     width: 166px;
//     flex-shrink: 0;
//     box-shadow: 5px 5px 10px rgba(181 191 198 / 46%),
//       -5px -9px 8px rgba(255 255 255 / 52%);
//     border-radius: 10px;
//     padding-top: 20px;
//     height: fit-content;
//     a {
//       display: block;
//       border-radius: 4px;
//       width: 131px;
//       height: 36px;
//       margin: 0 auto 20px;
//       color: ${paletteJY.gray[2]};
//       padding: 10px 12px;
//       &:hover {
//         box-shadow: inset 3px 3px 2px rgba(181 191 198 / 46%),
//           inset -3px -3px 2px rgba(255 255 255 / 52%);
//       }
//       i {
//       }
//       span {
//         display: inline-block;
//         text-align: justify;
//         width: 79px;
//         line-height: 2px;
//         margin-left: 12px;
//         &::after {
//           content: '';
//           display: inline-block;
//           width: 100%;
//         }
//       }
//     }
//   }
// `;

const ProjectPage = () => {
  return (
    <>
      <DefaultLayout title="프로젝트">
        <ProjectTemplete />
      </DefaultLayout>
    </>
  );
};

export default ProjectPage;
