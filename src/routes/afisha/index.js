const {
  getAfishaByTerminalId,
  uploadedImageByTerminal,
  deleteImage,
  deleteImageByTerminal,
} = require('../../controllers/afisha.controller');

module.exports = (app, url, ...args) => {
  // Получить афишу на терминал
  app.get(`${url}/getBy/:id`, ...args, getAfishaByTerminalId);
  // Загрузить фото на терминал
  app.post(`${url}/upload/:id`, ...args, uploadedImageByTerminal);
  // Удалить определенное изображение по id
  app.delete(`${url}/del/:id`, ...args, deleteImage);
  // Удалить все изображения с терминала по id Терминала
  app.delete(`${url}/all/:id`, ...args, deleteImageByTerminal);
};
