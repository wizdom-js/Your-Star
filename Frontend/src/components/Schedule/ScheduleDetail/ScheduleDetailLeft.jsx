import React, { useEffect } from 'react';
import {
  ScheduleDetailButton,
  ScheduleDetailImage,
  ScheduleDetailLeftWrapper,
} from './ScheduleDetail.style';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  DELETE_FANMEETING_REQUEST,
  INSERT_FANMEETING_REQUEST,
} from '../../../store/modules/fan';
import { IMAGE_URL } from '../../../utils/contants';
import { WARNING_COUNT_REQUEST } from '../../../store/modules/meeting';
import swal from 'sweetalert';

export default function ScheduleDetailLeft() {
  const { meeting, detailMeetingDone, warningAccount } = useSelector(
    state => state.meeting
  );
  const { me } = useSelector(state => state.mypage);
  const history = useHistory();
  const dispatch = useDispatch();

  const enterButton = () => {
    // 입장버튼 클릭 시 경고횟수가 2 이상이면 못들어가게 처리
    if (warningAccount < 2) {
      history.push(`/pledge/${meeting.id}`);
    } else {
      swal(
        '경고횟수 2회 누적',
        '귀하는 미팅 진행 시 욕설 및 비방으로 경고횟수 2회가 누적되어 입장하실 수 없습니다.',
        'error'
      );
    }
  };

  // 입장 시 경고횟수 확인
  useEffect(() => {
    if (meeting.isReserve)
      dispatch({
        type: WARNING_COUNT_REQUEST,
        data: { memberId: me.memberId, meetingId: meeting.id },
      });
  }, [dispatch, me.memberId, meeting.id, meeting.isReserve]);

  const reserveMeeting = () => {
    if (me.memberId === 0) {
      return history.push('/login');
    }
    dispatch({
      type: INSERT_FANMEETING_REQUEST,
      data: {
        meetingId: meeting.id,
        memberId: me.memberId,
        email: me.email,
      },
    });
    history.push('/pay');
  };
  const cancelMeeting = () => {
    dispatch({
      type: DELETE_FANMEETING_REQUEST,
      data: { meetingId: meeting.id, memberId: me.memberId },
    });
  };
  const showButton = () => {
    const now = new Date();

    if (new Date(meeting.endDate) < now) {
      return (
        <ScheduleDetailButton>
          <div>종료</div>
        </ScheduleDetailButton>
      );
    } else if (new Date(meeting.startDate) <= now) {
      if (
        me.code === 1 ||
        ((me.code === 2 || me.code === 4) && me.managerCode === meeting.code) ||
        meeting.isReserve
      ) {
        if (meeting.warningCount >= 2) {
          return (
            <ScheduleDetailButton>
              <div>입장불가</div>
            </ScheduleDetailButton>
          );
        } else {
          return (
            <ScheduleDetailButton color="3">
              <div onClick={enterButton}>입장하기</div>
            </ScheduleDetailButton>
          );
        }
      } else {
        return (
          <ScheduleDetailButton>
            <div>미팅중</div>
          </ScheduleDetailButton>
        );
      }
    } else if (new Date(meeting.openDate) <= now) {
      if (meeting.isReserve) {
        return (
          <ScheduleDetailButton color="2">
            <div onClick={cancelMeeting}>예매취소</div>
          </ScheduleDetailButton>
        );
      } else {
        if (meeting.applicantCnt === meeting.cnt) {
          return (
            <ScheduleDetailButton>
              <div>매진</div>
            </ScheduleDetailButton>
          );
        } else if (me.code === 3) {
          return (
            <ScheduleDetailButton color="1">
              <div onClick={() => reserveMeeting()}>예매하기</div>
            </ScheduleDetailButton>
          );
        }
      }
    } else {
      return (
        <ScheduleDetailButton>
          <div>준비중</div>
        </ScheduleDetailButton>
      );
    }
  };

  return (
    <ScheduleDetailLeftWrapper>
      <ScheduleDetailImage>
        {detailMeetingDone && meeting.image === null ? (
          <img src={'/images/noimg.gif'} alt="noimage" />
        ) : (
          <img src={`${IMAGE_URL}${meeting.image}`} alt={meeting.image} />
        )}
      </ScheduleDetailImage>
      {showButton()}
    </ScheduleDetailLeftWrapper>
  );
}
