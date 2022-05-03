export const toUserFriendlyDate = (unix: number): string => {
  return new Date(unix).toLocaleString('ru');
};
