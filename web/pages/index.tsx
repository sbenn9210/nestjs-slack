import Search from '../components/Search';
import Sidebar from '../components/Sidebar';

export function Index(props: any) {
  return (
    <div className="flex flex-col bg-gray-100 overflow-y-auto">
      <Search />
      <Sidebar />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  let user = {};
  const res = await fetch('http://localhost:3333/api');
  user = await res.json();

  return {
    props: {
      user,
    },
  };
}

export default Index;
