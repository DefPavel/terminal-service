const { knexConnection } = require('../database/connections');
const fs = require('fs');
// Вернуть изображения для определённого терминала
const getAfishaByTerminalId = async (req, res) => {
  const { id: idTerminal } = req.params;
  try {
    if (!idTerminal) throw 'Параметр idTerminal не найден';

    const data = await knexConnection('afisha')
      .select('id', 'path_url', 'date_crt')
      .where('id_terminal', idTerminal)
      .orderBy('date_crt', 'desc');

    res.status(200).json(data || []);
  } catch (error) {
    res.status(500).json(error);
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
  } catch (error) {
    res.status(500).json(error);
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
  } catch (error) {
    res.status(500).json(error);
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
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAfishaByTerminalId,
  uploadedImageByTerminal,
  deleteImage,
  deleteImageByTerminal,
};
