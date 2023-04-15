import styled from "styled-components"
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

const WFooter = styled.div`
    width: 100vw;
    height: 10vh;
    border-top: 3px solid black;
    display: flex;
    font-size: 26px;
    font-weight: bold;
    z-index: 9999;
`
const WStart = styled.div`
    width: 10%;
    height: 100%;
    background-color: #F3732F;
    display : flex;
    justify-content : center;
    align-items : center;
`
const WMiddle = styled.div`
    width: 80%;
    height: 100%;
    border-left: 3px solid black;
    border-right: 3px solid black;
    background-color: silver;
    display : flex;
    align-items : center;
`
const WWatch = styled.div`
    width: 10%;
    height: 100%;
    background-color: white;
    display : flex;
    justify-content : center;
    align-items : center;
`
const Boxxx = styled(motion.div)`
    width: 20%;
    height: 100%;
    background-color: #1e1e1e;
    color: white;
    &:hover{
        cursor: pointer;
    }
    display : flex;
    justify-content : center;
    align-items : center;

`

function Footer (e:any) {
    const { pluss, minim, select } = e;

    const renderDivs = () => {
        const divs = [];
        for (let i = 0; i < pluss; i++) {
        divs.push(<>
            <Boxxx key={i+""} onClick={minim}>
                {select && (
                    <div>
                        {select.title}
                    </div>
                )}
            </Boxxx>
        </>
        );
        }
        return divs;
    };
    //시계
    function Clock() {
        const [time, setTime] = useState(new Date());
      
        useEffect(() => {
          const intervalId = setInterval(() => {
            setTime(new Date());
          }, 3000);
          return () => clearInterval(intervalId);
        }, []);
      
        let hours = time.getHours();
        const ampm = hours > 12 ? '오후' : '오전';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutes = ('0' + time.getMinutes()).slice(-2);
      
        return (
          <div>{`${ampm} ${hours}:${minutes}`}</div>
        );
    }
    return (
        <>
        <WFooter>
            <WStart>시작</WStart>
            <WMiddle>
                {renderDivs()}
            </WMiddle>
            <WWatch>{Clock()}</WWatch>
        </WFooter>
        </>
    )
}
export default Footer;