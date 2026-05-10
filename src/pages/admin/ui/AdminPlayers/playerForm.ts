import type { Player, PlayerPayload } from '../../model/playersApi';

export const PLAYER_PLACEHOLDER_IMAGE =
  '/images/players/player-placeholder.png';

export const initialPlayerFormData: PlayerPayload = {
  number: 0,
  name: '',
  position: 'Полузащитник',
  image: PLAYER_PLACEHOLDER_IMAGE,
  bio: '',
  joinedDate: '',
  height: '',
  weight: '',
};

export const positionOptions = [
  'Вратарь',
  'Защитник',
  'Полузащитник',
  'Нападающий',
];

const allowedPhotoTypes = ['image/png', 'image/jpeg', 'image/webp'];

const MAX_PHOTO_SIZE_BYTES = 3 * 1024 * 1024;

export function getPlayerFormData(player: Player | null): PlayerPayload {
  if (!player) {
    return initialPlayerFormData;
  }

  return {
    number: player.number,
    name: player.name,
    position: player.position,
    image: player.image || PLAYER_PLACEHOLDER_IMAGE,
    bio: player.bio,
    joinedDate: player.joinedDate,
    height: player.height,
    weight: player.weight,
  };
}

export function validatePlayerForm(formData: PlayerPayload) {
  if (
    !Number.isInteger(Number(formData.number)) ||
    Number(formData.number) < 0
  ) {
    return 'Введите корректный номер игрока';
  }

  if (!formData.name.trim()) {
    return 'Введите имя игрока';
  }

  if (!formData.position.trim()) {
    return 'Выберите позицию игрока';
  }

  return '';
}

export function validatePlayerPhoto(file: File) {
  if (!allowedPhotoTypes.includes(file.type)) {
    return 'Можно выбрать только PNG, JPG или WEBP';
  }

  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    return 'Размер фото не должен превышать 3 МБ';
  }

  return '';
}
