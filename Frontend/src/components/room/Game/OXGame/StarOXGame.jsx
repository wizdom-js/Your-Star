import React from 'react';
import styled from 'styled-components';
import StarChosungScreen from '../../CommonComponents/MainItems/Game/StarChosungScreen';
import ScheduleListSelect from '../../CommonComponents/RightSideItems/Star/ScheduleListSelect';
import OXButtonStar from '../../CommonComponents/RightSideItems/Game/OXGame/OXButtonStar';
import UserSelfCamRight from '../../CommonComponents/RightSideItems/User/UserSelfCamRight';
// 포지션작업

export default function StarOXGame() {
  return (
    <div>
      <StarChosungScreen></StarChosungScreen>
      <ScheduleListSelect></ScheduleListSelect>
      <OXButtonStar></OXButtonStar>
      <UserSelfCamRight></UserSelfCamRight>
    </div>
  );
}
