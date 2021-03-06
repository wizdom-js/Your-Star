import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

const OtherAngelStyle = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  text-align: center;
  padding: 5% 5% 5% 5%;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: #f9f8b9;
  cursor: pointer;
`;

export default function OtherScreenAngle(props) {
  const { storeSession } = useSelector(state => state.MeetingRoom);

  const sendQnaContents = () => {
    swal({
      title: '이 질문을 선택하시겠어요 ?',
      text: props.text + '\n \n \n (\'네 !\' 버튼을 클릭 시 위의 내용이 팬분들과 공유됩니다.)',
      buttons: {
        cancel: '아니오',
        confirm: '네 !',
      },
    }).then(event => {
      if (event === true) {
        storeSession.signal({
          data: props.text,
          to: [],
          type: 'qnaContents',
        });
        swal({
          title: '아래의 질문을 팬분들과 공유하고 있어요',
          text: props.text,
          button: 'close',
        }).then(() => {
          // 스타가 모달 창 닫았을 경우 사용자에게도 닫으라는 신호 보내기
          storeSession.signal({
            data: '',
            to: [],
            type: 'qnaContents',
          });
        });
      }
    });
  };

  return (
    <OtherAngelStyle
      onClick={() => {
        sendQnaContents();
      }}
    >
      {props.text}
    </OtherAngelStyle>
  );
}
