
import  MainChat from '../components/MainChat';
import  Sidebar  from './../components/Sidebar';

const Home = () => {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <MainChat />
    </div>
        
    
  )
}

export default Home