import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Loading from './Routes/Loading';
import Home from './Routes/Home';

const MonitorImg = styled.div`
  width: 100vw;
  height: 100vh;
`

function App() {
  // 3초가 지나면 부팅완료된 화면을 보이기
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);
  /////

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MonitorImg>
          <Routes>
            <Route path="/" element={!isLoaded ? <Loading></Loading> : (<Home></Home>)}>
            </Route>
          </Routes>
        </MonitorImg>
        
      </BrowserRouter>
    </>
  );
}

export default App;


