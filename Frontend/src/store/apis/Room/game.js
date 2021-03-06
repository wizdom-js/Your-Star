import axios from 'axios';
import { BASE_URL } from '../../../utils/contants';

// 게임 점수 추가
export async function AddGameScoreAPI(meetingId, memberId) {
  console.log(meetingId, '  ', memberId, '게임 점수 추가되었습니다');
  const result = await axios.put(
    `${BASE_URL}meetings/game-score/${meetingId}/${memberId}`
  );
  return result;
}

// 게임 순위 불러오기
export async function CallGameRankAPI(meetingId) {
  let data = [];
  const result = await axios
    .get(`${BASE_URL}meetings/game-result/admin/${meetingId}`)
    .then(function (response) {
      data = response;
    });
  console.log(data);
  return data;
}
