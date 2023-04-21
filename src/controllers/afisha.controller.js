const { knexConnection } = require('../database/connections');
const fs = require('fs');
// Вернуть изображения для определённого терминала
const getAfishaByTerminalId = async (req, res) => {
  const { id: idTerminal } = req.params;

  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 5;

  try {
    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;

    if (!idTerminal) throw 'Параметр не найден';
    const result = {};

    const { count } = await knexConnection('afisha').count().first();

    const data = await knexConnection('afisha')
      .select('id', 'path_url', 'date_crt')
      .where('id_terminal', idTerminal)
      .offset(startIndex)
      .limit(limit)
      .orderBy('id', 'desc');

    if (endIndex < count)
      result.next = {
        page: page + 1,
        limit: limit,
      };

    if (startIndex > 0)
      result.previous = {
        page: page - 1,
        limit: limit,
      };

    result.data = data;

    res.status(200).json(result || []);
  } catch (e) {
    const error = new Error(e);
    res.status(500).json({ message: error.message });
  }
};
// Удалить все изображения на терменале
const deleteImageByTerminal = async (req, res) => {
  const { id: idTerminal } = req.params;
  try {
    if (!idTerminal) throw 'Параметр id не найден';

    const data = await knexConnection('afisha')
      .where('id_terminal', idTerminal)
      .del(['id', 'path_url']);

    for (const iterator of data) {
      await fs.promises.unlink(iterator.path_url);
    }

    res.status(200).json([]);
  } catch (e) {
    const error = new Error(e);
    res.status(500).json({ message: error.message });
  }
};
// Удалить определённое изображение
const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw 'Параметр id не найден';

    const data = await knexConnection('afisha').where('id', id).del(['id', 'path_url']);
    await fs.promises.unlink(data[0].path_url);

    res.status(200).json([]);
  } catch (e) {
    const error = new Error(e);
    res.status(500).json({ message: error.message });
  }
};
// проверка существования
const checkDirectory = async (path) => {
  try {
    await fs.promises.access(path);
    return true;
  } catch (error) {
    return false;
  }
};
// Записать файл
const writeImages = async (path, idTerminal, buffer) => {
  // создать файл
  await fs.promises.writeFile(path, Buffer.from(buffer));
  // создать запись в бд
  await knexConnection('afisha').insert({
    path_url: path,
    id_terminal: idTerminal,
  });
};
// Загрузить изображения для определённого терминала
const uploadedImageByTerminal = async (req, res) => {
  const { id: idTerminal } = req.params;
  try {
    if (!idTerminal) throw 'Параметр idTerminal не найден';

    const path = `uploadFiles/${idTerminal}/`;

    const checkPath = await checkDirectory(path);

    if (!checkPath) await fs.promises.mkdir(path, { recursive: true });

    const arrayFiles = req.body.files.file;

    if (Array.isArray(arrayFiles)) {
      for (const iterator of arrayFiles) {
        await writeImages(path + iterator.name, idTerminal, iterator.data.data);
      }
    } else await writeImages(path + arrayFiles.name, idTerminal, arrayFiles.data.data);

    res.status(200).json([]);
  } catch (e) {
    const error = new Error(e);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAfishaByTerminalId,
  uploadedImageByTerminal,
  deleteImage,
  deleteImageByTerminal,
};
