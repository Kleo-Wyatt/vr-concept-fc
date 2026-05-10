import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const uploadsRouter = Router();

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

const playersUploadDir = path.resolve(currentDir, '../uploads/players');

fs.mkdirSync(playersUploadDir, {
  recursive: true,
});

const allowedMimeTypes = new Set(['image/png', 'image/jpeg', 'image/webp']);

function getExtensionByMimeType(mimeType) {
  if (mimeType === 'image/png') {
    return '.png';
  }

  if (mimeType === 'image/jpeg') {
    return '.jpg';
  }

  if (mimeType === 'image/webp') {
    return '.webp';
  }

  return '';
}

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, playersUploadDir);
  },

  filename(_req, file, callback) {
    const originalExtension = path.extname(file.originalname).toLowerCase();
    const mimeExtension = getExtensionByMimeType(file.mimetype);
    const extension = originalExtension || mimeExtension || '.png';

    callback(null, `${Date.now()}-${randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter(_req, file, callback) {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new Error('Можно загрузить только PNG, JPG или WEBP'));
      return;
    }

    callback(null, true);
  },
});

uploadsRouter.post('/player-photo', (req, res) => {
  upload.single('photo')(req, res, (error) => {
    if (error) {
      res.status(400).json({
        message:
          error instanceof Error ? error.message : 'Не удалось загрузить фото',
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        message: 'Файл не выбран',
      });
      return;
    }

    res.status(201).json({
      image: `${req.protocol}://${req.get('host')}/uploads/players/${req.file.filename}`,
    });
  });
});
