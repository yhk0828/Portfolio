import styled from 'styled-components';
import {motion} from "framer-motion";

const Monitor = styled.div`
    width: 100%;
    height: 100%;
    background: url("./Img/xp.jpg") center center no-repeat;
    background-color: black;
    overflow: hidden;
`
const LoadingBox = styled.div`
    background-color: black;
    border: 2px solid silver;
    border-radius: 3px;
    margin: 0 auto;
    margin-top: 65vh;
    width: 130px;
    height: 20px;
    overflow: hidden;
    padding: 1px;
`
const LoadingGage = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 13px;

`
const Gage = styled(motion.div)`
    width: 33.3333%;
    height: 100%;
    background-color: #5F5CB2;
    border: 1px solid black;
    border-radius: 2px;
`

function Loading() {
  return (
    <Monitor>
        <LoadingBox>
        <LoadingGage
        animate={{ x: 130 }}
        transition={{ duration: 3 }}
      >
        <Gage/><Gage/><Gage/>
      </LoadingGage>
      </LoadingBox>
    </Monitor>
  );
}

export default Loading;
