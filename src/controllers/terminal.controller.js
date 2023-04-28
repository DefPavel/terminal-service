const { knexConnection } = require('../database/connections');

// Получить все объекты терминалов
const getAllTerminals = async (req, res) => {
  try {
    const data = await knexConnection('terminals').select('id', 'name').orderBy('name', 'asc');

    res.status(200).json(data || []);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTerminals,
};
