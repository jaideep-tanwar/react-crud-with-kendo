
import DashboardLayout from "../../../components/dashboardLayout"

export default function Profile({ postData }) {
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
  const id = {profile:'profile'}
  return {
    paths: [      
      { params: { profile: 'profile' } },
    ],
    fallback: true,
  }
}
export async function getStaticProps({ params }) {
  
  const postData  = {id:'2',title:'Javier Ramon',Date:'02/02/21'};
  return {
    props: { postData  },
  };
}
