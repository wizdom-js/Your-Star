import React, { useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Block, Layout, Wrapper } from '../../../styles/variables';
import {
  ScheduleDetailContent,
  ScheduleDetailHeader,
  ScheduleDetailTitle,
  ScheduleDetailWrapper,
} from './ScheduleDetail.style';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import ScheduleDetailLeft from '../../Schedule/ScheduleDetail/ScheduleDetailLeft';
import ScheduleDetailRight from '../../Schedule/ScheduleDetail/ScheduleDetailRight';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DETAIL_MEETING_REQUEST } from '../../../store/modules/meeting';

export default function ScheduleDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { meeting } = useSelector(state => state.meeting);
  const { me } = useSelector(state => state.mypage);
  useEffect(() => {
    dispatch({
      type: DETAIL_MEETING_REQUEST,
      data: { memberId: me.memberId, meetingId: id, email: me.email },
    });
  }, [id, dispatch, me]);

  return (
    <Layout>
      <Navbar />
      <Wrapper>
        <Block>
          <ScheduleDetailWrapper>
            <ScheduleDetailHeader>
              <ScheduleDetailTitle>
                <div id="meeting-icon">
                  <Link to="/schedule">
                    <IoIosArrowBack />
                  </Link>
                </div>
                <div id="meeting-name">{meeting.name}</div>
              </ScheduleDetailTitle>
            </ScheduleDetailHeader>
            <ScheduleDetailContent>
              <div id="detail">
                <div id="detail2">
                  <ScheduleDetailLeft />
                  <ScheduleDetailRight />
                </div>
              </div>
            </ScheduleDetailContent>
          </ScheduleDetailWrapper>
        </Block>
      </Wrapper>
      <Footer />
    </Layout>
  );
}
