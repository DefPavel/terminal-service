const {
  getAfishaByTerminalId,
  uploadedImageByTerminal,
  deleteImage,
  deleteImageByTerminal,
} = require('../../controllers/afisha.controller');

const {checkToken} = require('../../middlewares/auth.middleware');

module.exports = (app, url, ...args) => {
  // Получить афишу на терминал
  app.get(`${url}/getBy/:id`, checkToken, getAfishaByTerminalId);
  // Загрузить фото на терминал
  app.post(`${url}/upload/:id`, checkToken, uploadedImageByTerminal);
  // Удалить определенное изображение по id
  app.delete(`${url}/del/:id`, checkToken, deleteImage);
  // Удалить все изображения с терминала по id Терминала
  app.delete(`${url}/all/:id`, checkToken, deleteImageByTerminal);
};
