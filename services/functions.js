import {Share} from 'react-native';

//provides to send null value
export const nullcheck = value => {
  if (!value) {
    return '';
  } else {
    return value;
  }
};
//month list to convert date
const month_names = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

//gets month name from input date
export const gettingDate = date => {
  return `${month_names[date.getMonth()]} ${date.getDate()}`;
};

//gets time from input date
export const gettingTime = date => {
  const H = new Date(date).getHours();
  const M = new Date(date).getMinutes();
  return `${H < 10 ? `0${H}` : H}:${M < 10 ? `0${M}` : M}`;
};

//share referral code (with Share of react native)
export const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'Share your referral link and earn $20',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    alert(error.message);
  }
};
