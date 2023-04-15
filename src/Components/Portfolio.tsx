import { motion, AnimatePresence } from 'framer-motion';
import styled from "styled-components"
import { faAngleLeft,faAngleRight,faWindowMinimize,faWindowMaximize,faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

// 포트폴리오 == P
const PContainer = styled(motion.div)`
    width:100%;
    height:100%;
    padding: 2.5%;
`
const PBox = styled(motion.div)`
    position: absolute;
    left: 30%;
    top: 15%;
    margin: 0 auto; 
    width: 40%;
    height: 70%;
    background-color: silver;
    border-radius: 25px;
    overflow: hidden;
`
const FrontCard = styled(motion.div)`
    width: 100%;
    height: 100%;
`
const BackCard = styled(motion.div)`
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
`

const IndexBox = styled(motion.div)`
    width: 30px;
    height: 30px;
    background-color: silver;
    color: black;
    border-radius: 45px;
    line-height: 30px;
    position: absolute;
    top: 45%;
    text-align: center;
    &:hover{
        background-color: gray;
        cursor: pointer;
    }
`
const PButtonBox = styled(motion.div)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5%;
    width: 200px;
    height: 50px;
    display: flex;
`
interface GGray {
    $isGray: boolean;
}
const PButton = styled.div<GGray>`
    width: 20px;
    height: 20px;
    background-color: ${(props) => (props.$isGray ? "gray" : "silver")};
    margin: 0 auto;
    border-radius: 20px;
    &:hover{
        background-color: gray;
        cursor: pointer;
    }
`;
const PortImg = styled.div`
    width: 100%;
    height: 200px;
    background-size: cover;
`


interface InBox {
    id: number;
    title: string;
    link: string;
    comment?: string;
    img?: string;
}

const Inboxes: InBox[] = [
    { id: 1, title: '넷플릭스', link: "https://www.netflix.com/browse", 
        img: "./Img/Netflix.png",
        comment:"React.js와 TypeScript를 사용하여 만든 넷플릭스 클론 코딩입니다. Home의 메인페이지는 강의수업이며 firebase를 통한 회원가입, 검색, 반응형을 추가하였습니다.",
    },
    { id: 2, title: '코인 어플', link: "/portfolio/box2",
    img: "./Img/wallpaper.jpg",
        comment:""},
    { id: 3, title: '회원가입', link: "/portfolio/box3",
    img: "./Img/xp.jpg",
    comment:""},
];

function Portfolio() {
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev);
    const [isNext, setIsNext] = useState(true);
    const [$isGray, $setIsGray] = useState(true);
    const [flip,setFlip] = useState(false);
    function onFlip() {
        setFlip(true);
    }
    const onFlip2 = () => {
        setFlip(false);
    }
    const [filteredInBoxes, setFilteredInBoxes] = useState(Inboxes);
    const increaseIndex = () => {
      if (leaving) return;
      const maxIndex = filteredInBoxes.length-1;
      toggleLeaving();
      setIndex((prev) => prev === maxIndex ? 0 : prev+1);
      setIsNext(() => true);
    }
    const decreaseIndex = () => {
      if (leaving) return;
      const maxIndex = filteredInBoxes.length-1;
      toggleLeaving();
      setIndex((prev) => prev === 0 ? maxIndex : prev-1);
      setIsNext(() => false);
    }
    function navButton(e:number){
        toggleLeaving();
        setIndex(e);
        $setIsGray(prev=> !prev);
      };
      const rowVariants = {
        hidden: {
            opacity: 0
        },
        visible:{
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        hover:{
            rotateY: 180,
            duration: 0.5
        }
    }
    return (
        <>
        
        <PContainer>
            <AnimatePresence
            custom={isNext}
            initial={false}
            onExitComplete={toggleLeaving}
            >
                {filteredInBoxes.slice(index,index+1).map(box => 
                    <PBox   
                    key={index}
                    onHoverStart={onFlip}
                    onHoverEnd={onFlip2}
                    whileHover="hover"
                    variants={rowVariants}
                    initial="hidden" 
                    animate="visible" 
                    exit="exit" 
                    transition={{type: "tween",duration: 1}}
                    >
                {!flip ?
                    <FrontCard >
                        <PortImg style={{backgroundImage: `url(${filteredInBoxes[index].img})`}}>
                        </PortImg>
                        <div  style={{padding: "20px"}}>
                            <div  style={{marginBottom: "20px",fontSize:"22px"}}>
                                {box.title}
                            </div>
                            <div>
                                {box.comment}
                            </div>    
                        </div>
                    </FrontCard> :
                    <BackCard>
                        <div style={{width:"100%",height: "40%",backgroundColor: "red"}}>
                            싫어요
                        </div>
                        <div>
                            {/*이미지*/}
                        </div>
                        <div>
                            {box.title}
                        </div>
                        <div>
                            {box.comment}
                        </div>
                    </BackCard>
                    }
                    
                </PBox>
                )}
                
            </AnimatePresence>
                <PButtonBox >
                    <PButton onClick={()=>navButton(0)} $isGray={filteredInBoxes[0].id === index+1} >
                    </PButton>
                    <PButton onClick={()=>navButton(1)} $isGray={filteredInBoxes[1].id === index+1}>
                    </PButton>
                    <PButton onClick={()=>navButton(2)} $isGray={filteredInBoxes[2].id === index+1}>
                    </PButton>
                </PButtonBox>
                <>
                    <IndexBox onClick={decreaseIndex} style={{left:"20%"}}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    </IndexBox>
                    <IndexBox onClick={increaseIndex} style={{right:"20%"}}>
                    <FontAwesomeIcon icon={faAngleRight} />
                    </IndexBox>
                </>
        </PContainer>
        </>
    )
}

export default Portfolio;