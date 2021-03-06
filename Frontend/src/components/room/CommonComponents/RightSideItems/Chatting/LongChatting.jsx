import React, { useEffect, useRef, useState } from 'react';
import {
  LongChattingInputBox,
  LongChattingListBox,
  HalfSideDiv1,
  LongChattingBox,
} from './Chatting.style';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChattingInputChange,
  ChattingAction,
} from '../../../../../store/modules/meetingRoom';
import { checkText } from '../../../../../utils/checkText';

export default function LongChatting() {
  const [testInput, setTestinput] = useState('');

  const dispatch = useDispatch();

  const SubmitText = Input => dispatch(ChattingInputChange(Input));
  const AppendChattingList = inputValue => dispatch(ChattingAction(inputValue));

  const handleChatMessageChange = e => {
    setTestinput(e.target.value);
  };

  const { storeSession, backgroundColor, chattingList } = useSelector(
    state => state.MeetingRoom
  );

  const { me } = useSelector(state => state.mypage);

  const SendMessage = e => {
    if (e.key === 'Enter' && testInput !== '') {
      if (checkText(testInput)) {
        const inputValue = {
          userName: me.nick,
          text: testInput,
          chatClass: 'messages__item--operator',
        };
        storeSession.signal({
          data: `${me.nick},${testInput}`,
          to: [],
          type: 'chat',
        });
        SubmitText(testInput);
        AppendChattingList(inputValue);
      }
      setTestinput('');
    }
  };

  // 채팅 스크롤 아래로 내려주기
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    // 채팅 리스트가 업데이트 될 때마다 제일 아래로 내려주기
    scrollToBottom();
  }, [chattingList]);

  return (
    <>
      <HalfSideDiv1>
        <LongChattingBox>
          <LongChattingListBox>
            {chattingList.map((value, idx) => {
              return (
                <div key={idx + value.text}>
                  <p style={{ margin: '0' }}>
                    {value.userName} : {value.text}
                  </p>
                </div>
              );
            })}
            <div ref={messagesEndRef}></div> {/**채팅 스크롤 아래로 내려주기 */}
          </LongChattingListBox>
          <LongChattingInputBox
            onKeyPress={SendMessage}
            value={testInput}
            onChange={handleChatMessageChange}
            color={backgroundColor} // redux에서 받아온 color를 input styled에 넣어주기
            placeholder="메시지 보내기"
          ></LongChattingInputBox>
        </LongChattingBox>
      </HalfSideDiv1>
    </>
  );
}
