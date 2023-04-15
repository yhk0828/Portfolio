import { motion } from "framer-motion";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Graph = styled.div`
  padding: 10px;
  text-align: center;
`;
const Graph2 = styled.div`
  width: 100%;
`;
const Graph3 = styled.div`
  width: 100px;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  background-color: #f05d0e;
  color: white;
  border-radius: 25px;
  margin-bottom: 5px;
`;

type FSkills = {
  name: string;
  persent: number;
  animatedPercent: number;
};

const skills: FSkills[] = [
  { name: "HTML", persent: 90 ,animatedPercent: 0 },
  { name: "CSS", persent: 80 ,animatedPercent: 0 },
  { name: "JavaScript", persent: 60 ,animatedPercent: 0 },
  { name: "React.js", persent: 50 ,animatedPercent: 0 },
  { name: "TypeScript", persent: 40 ,animatedPercent: 0 },
];

function Skill() {
    // 숫자 카운트 애니메이션 ㅜ
    const [animatedSkills, setAnimatedSkills] = useState<Array<FSkills>>(
        skills.map((skill) => ({ ...skill}))
    );
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (animatedSkills.some((skill) => skill.animatedPercent < skill.persent)) {
          interval = setInterval(() => {
            setAnimatedSkills((prevSkills) =>
              prevSkills.map((skill) => ({
                ...skill,
                animatedPercent:
                  skill.animatedPercent +
                  (skill.persent - skill.animatedPercent) / 10,
              }))
            );
          }, 40);
        }
        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      }, [animatedSkills]);
      // 숫자 카운트 애니메이션 ㅗ
    return (
        <Graph>
            <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>안녕하세요</div>
                <div style={{ width: "50%" }}>
                    {animatedSkills.map((skill) => (
                        <Graph2 key={skill.name} style={{ padding: "10px" }}>
                            <Graph3>{skill.name}</Graph3>
                            <div style={{ display: "flex" }}>
                                <div
                                style={{
                                width: "90%",
                                height: "10px",
                                backgroundColor: "skyblue",
                                marginTop:"5px"}}>
                                    <motion.div
                                    initial={{ width: "0px",height: '10px'}}
                                    animate={{ width: `${skill.persent}%`}}
                                    transition={{
                                        duration: 2
                                    }}
                                    style={{background: skill.persent >= 80 ? "#08527A" : skill.persent >= 60 ? "#0B6DA2" : "#15A3EF" }}
                                    key={skill.name}
                                    >
                                    </motion.div>
                            
                                </div>
                                <div style={{color: "black",marginLeft:"10px",marginBottom:"10px"}}>
                                    {Math.ceil(skill.animatedPercent)}%
                                </div>
                            </div>
                        </Graph2>
                    ))}
                </div>
            </div>
        </Graph>
    )
}

export default Skill;