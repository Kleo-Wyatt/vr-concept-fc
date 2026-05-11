type ReadableItem = {
  read: boolean;
};

export function getUnreadCount<T extends ReadableItem>(items: T[]) {
  return items.filter((item) => !item.read).length;
}
