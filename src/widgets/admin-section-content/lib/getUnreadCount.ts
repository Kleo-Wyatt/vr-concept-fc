export function getUnreadCount<T extends { read: boolean }>(items: T[]) {
  return items.filter((item) => !item.read).length;
}
