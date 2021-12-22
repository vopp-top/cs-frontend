import { NextPage } from "next";
import React, { useState } from "react";
import { FaCaretDown, FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import Heading from "../Heading";
import Icon from "../Icon";
import Text from "../Text";
import { AnimatePresence, motion } from "framer-motion";
// Types -------------------------------------------------------------------------

interface Props {}

interface FaqTypes {
  question: string;
  answer: string;
}

// Component ---------------------------------------------------------------------
const FrequentlyAskedQuestions: React.FC<Props> = () => {
  const FaQ: FaqTypes[] = [
    {
      question: "How we collect data?",
      answer: `Data is collected from the most active streamers every month. We analyse chat logs from past broadcasts. If you delete video then we can't analyse it. For now we are not analysing anything real-time.`,
    },
    {
      question: `Why my name/emote is not showing up?`,
      answer: `Only users who sent at least 100 messages are included. Same about emotes and its use count. If you can't find user/emote then it did not met the given condition.`,
    },
    // {
    //   question: `Will this be open-source?`,
    //   answer: `Front-end is open-source, but for Back-end currenlty, will not be open-sourced. It still has many bugs and we are still working on it.`,
    // },
    {
      question: `Can I get full database access?`,
      answer: `Yes. If you have good reason then I can share it. Contact with me here: animekkk@protonmail.com`,
    },
  ];

  return (
    <Content>
      {FaQ.map((q, i) => {
        return <Question key={i} q={q} />;
      })}
    </Content>
  );
};

export const Question: NextPage<{ q: FaqTypes }> = ({ q }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Item>
      <Top onClick={() => setCollapsed(!collapsed)}>
        <Text>{q.question}</Text>
        <Icon textColor={"main"} size={18} as={collapsed ? FaPlus : FaMinus} />
      </Top>
      <AnimatePresence>
        {!collapsed && (
          <Bottom
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 1,
              transition: {
                duration: 0.2,
                ease: "backOut",
              },
            }}
          >
            {q.answer}
          </Bottom>
        )}
      </AnimatePresence>
    </Item>
  );
};

export default FrequentlyAskedQuestions;

// Styled ------------------------------------------------------------------------

const Content = styled.div``;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 2rem;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.subHover};
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  padding: 1.2rem 0;
  justify-content: space-between;
`;

const Bottom = styled(motion.div)`
  color: ${({ theme }) => theme.colors.textSub};
  padding-bottom: 1.2rem;
  overflow: hidden;
`;
