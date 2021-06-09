import Layout from '../../components/layout'
import DashboardLayout from "../../components/dashboardLayout"

export default function Post({ postData }) {
  console.log(postData)
  return (
    <DashboardLayout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.Date}
    </DashboardLayout>
  )
}
export async function getStaticPaths() {
  const id = {id:'1'}
  return {
    paths: [      
      { params: { id: '1' } },
    ],
    fallback: true,
  }
}
export async function getStaticProps({ params }) {
  
  const postData  = {id:'1',title:'Peter Parkar',Date:'02/02/21'};
  return {
    props: { postData  },
  };
}
