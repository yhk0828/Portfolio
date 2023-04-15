import styled from 'styled-components';
import Footer from '../Components/Footer';
import { useState,useRef,useEffect } from 'react';
import { faAngleLeft,faAngleRight,faWindowMinimize,faWindowMaximize,faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skill from '../Components/Skill';
import Portfolio from '../Components/Portfolio';
import { motion } from 'framer-motion';

const WMonitor = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: #F7A173;
`
const WContainer = styled(motion.div)`
    width: 100%;
    height: 90%;
    position: relative;
`
const WWallpaper = styled.div`
    width: 100px;
    height: 100%;
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
`
interface Item {
    id?: number;
    title?: string;
    contents?: string;
}
interface Box {
    id: number;
    title: string;
    items?: Item[] | undefined;
  }

const WFolderContainer = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    &:active{
        opacity: 0.7;
    }
    &:hover{
        cursor: pointer;
    }
`

  const WFolder = styled.div`
    width: 50px;
    height: 50px;
    margin-left: 15px;
    background: url("./Img/folder.png") center center no-repeat;
    background-size: cover;
`
const WFoldertitle = styled.div`
    font-weight: bold;
    text-align: center;
`

type Ismaxim = {
    // styled component의 오류 때문에 $를 붙여서 boolean을 허용시켰다.
    $ismaxim: boolean;
}

const DContainer = styled(motion.div)<Ismaxim>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props)=>props.$ismaxim? '80%' : '100%'};
    height: ${(props)=>props.$ismaxim ? '80%' : '100%'};
    font-weight: bold;
    background-color: white;
    border-radius: 10px;
    z-index: 2;
    overflow: hidden;
    
`

const FiledHeader = styled.div`
    width: 100%;
    height: 10%;
    background: linear-gradient(to top, #1981fd, #0153e4, #1981fd);
    color: white;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size: 20px;
`
const FiledTitle = styled(motion.div)`
    width: 85%;
    padding: 10px;
    margin-left: 20px;
`
const FiledWindowSize = styled.div`
    width: 15%;
    display: flex;
`
const FiledSize = styled.div`
    width: 33%;
    height: 100%;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    &:first-child{
        line-height: 30px;
    }
    &:hover{
      cursor: pointer;
    }
`
const FiledContents = styled.div`
    width: 100%;
    height: 90%;
    backgroundColor: white;
`
type Position = {
    x: number;
    y: number;
  };

  const Bigboxbox = styled.div`
  width: 100px;
  height: 60px;
  position: absolute;
  font-size: 14px;
  background-color: #35373b;
  color: #ffffff;
  
`
const Boxbox = styled.div`
  width: 100%;
  height: 50%;
  
  padding: 5px;
  
  &:hover {
      cursor: pointer;
  }
`

function Home() {
    const [boxes, setBoxes] = useState<Box[]>([
      { id: 1, title: "자기소개", items: [] },
      { id: 2, title: "포트폴리오", items: [] },
      { id: 3, title: "스킬", items: [] },
    ]);
    // 클릭한 폴더의 내용을 가져올수 있는 로직 ㅜ
    const [selectedBox, setSelectedBox] = useState<Box | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [$ismaxim, set$Ismaxim] = useState(true);
    const [$isminim, set$Isminim] = useState(true);
    const [pluss, setPluss] = useState(0);
    const [position, setPosition] = useState<Position | null>(null);
    const [position2, setPosition2] = useState<Position | null>(null);
    const [minibox, setMinibox] = useState(false);
    const [minibox2, setMinibox2] = useState(false);
    const boxdrag = useRef(null);
    
    const handleOpen = (box: Box) => {
        if (isOpen === false) {
        setSelectedBox(box);
        setIsOpen(true);
        setPluss(prev => prev + 1);
        }else if (isOpen === true) {
            return null;
        }
    };
    const handleClose = () => {
        if (isOpen === true) {
          setIsOpen(!isOpen);
          setPluss(prev => prev - 1);
          }else if (isOpen === false) {
          return null;
        }
    };
    // 클릭한 폴더의 내용을 가져올수 있는 로직 ㅗ
    const handleMinim = () => {
        set$Isminim(!$isminim);
        console.log("미니")
    };
    
    const handleMaxim = () => {
        set$Ismaxim(!$ismaxim);
    };

    const addFolder = () => {
        const newBoxTitle = window.prompt("새 폴더의 제목을 입력하세요.");
        if(newBoxTitle === ""){
            const newBox = { id: boxes.length + 1, title: `Box ${boxes.length + 1}` };
            setBoxes([...boxes, newBox]);
        }else if(newBoxTitle === null){
            return null;
        }else{
            const newBox = { id: boxes.length + 1, title: `${newBoxTitle}` };
            setBoxes([...boxes, newBox]);
        }
    };
    const config = () => {
      
    };
    const addSubBox = (boxId: number) => {
      const newBoxes = boxes.map((box) => {
        if (box.id === boxId) {
          return { ...box, items: [...(box.items ?? []), { id: Date.now(), title: "New Sub-Box" }] };
        }
        return box;
      });
      setBoxes(newBoxes);
    };
    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        if(minibox === false){
            setMinibox(!minibox);
        }
        if(minibox2 === true){
            setMinibox2(!minibox);
        }
      };
    const handleContextMenu2 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(minibox === true){
        setMinibox(!minibox);
    }
    if(minibox2 === true){
        setMinibox2(!minibox);
    }
    };
    const handleContextMenu3 = (e: React.MouseEvent<HTMLDivElement>,box:Box) => {
        e.preventDefault();
        setSelectedBox(box);
        setPosition2({ x: e.clientX, y: e.clientY });
        if(minibox === true){
            setMinibox(!minibox);
        }
        if(minibox2 === false){
            setMinibox2(!minibox);
        }
    };
    const onContextMenu = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
      event.preventDefault();
      setBoxes(boxes.filter((box) => box.id !== id));
    };

    return (
      <WMonitor onContextMenu={handleContextMenu} onClick={handleContextMenu2}>
        <WContainer ref={boxdrag}>
            <WWallpaper>
            {boxes.map((box) => (
                <WFolderContainer
                
                key={box.id}
                onClick={() => handleOpen(box)}
                
                >
                    <div onContextMenu={(event)=>handleContextMenu3(event, box)}>
                        <WFolder></WFolder>
                        <WFoldertitle>{box.title}</WFoldertitle>
                        {box.items?.map((item) => (
                            <div key={item.id}>{item.title}</div>
                        ))}
                    </div>
                </WFolderContainer>
            ))}
            </WWallpaper>

            {selectedBox && isOpen && $isminim ? (
            <DContainer
                dragConstraints={boxdrag}
                drag
                dragMomentum={false}
                dragElastic={0.1}
                layoutId="hello"
                $ismaxim={$ismaxim}
                initial={{ scale: 0 }}
                animate={{ scale: 1}}
                transition={{
                    type: "tween"
                }}
            >
                <FiledHeader onDoubleClick={handleMaxim}>
                    {/*클릭한 파일에 맞는 Title */}
                    <FiledTitle>
                        {selectedBox.title}
                    </FiledTitle>
                    <FiledWindowSize>
                        <FiledSize onClick={handleMinim}><FontAwesomeIcon icon={faWindowMinimize} /></FiledSize>
                        <FiledSize onClick={handleMaxim}><FontAwesomeIcon icon={faWindowMaximize} /></FiledSize>
                        <FiledSize onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></FiledSize>
                    </FiledWindowSize>
                </FiledHeader>
                <FiledContents onContextMenu={()=>addSubBox}>
                    { selectedBox.id === 2 ? <Portfolio></Portfolio>
                    : selectedBox.id === 3 ? <Skill></Skill>
                    : null }
                </FiledContents>
            </DContainer>
        ) : null}
        </WContainer>
        {position && minibox ? <Bigboxbox
            style={{
            left: position.x,
            top: position.y,
            }}
            >
            <Boxbox onClick={addFolder} >새 폴더</Boxbox>
            <Boxbox onClick={addFolder} >속성</Boxbox>
            </Bigboxbox>: null}
        {position2 && minibox2 ? <Bigboxbox
        style={{
        left: position2.x,
        top: position2.y,
        }}
        >
        {selectedBox && <Boxbox onClick={(event) => onContextMenu(event, selectedBox.id)} >삭제하기</Boxbox>}
        </Bigboxbox>: null}

        
        <Footer pluss={pluss} minim={handleMinim} select={selectedBox}></Footer>
      </WMonitor>
    );
  }

export default Home;