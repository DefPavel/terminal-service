const { knexConnection } = require('../database/connections');
const { pagination } = require('../utils/pagination');
const fs = require('fs');
// Вернуть изображения для определённого терминала
const getAfishaByTerminalId = async (req, res) => {
	try {
		const { id: idTerminal } = req.params;

		const {
			offset,
			newPage: page,
			perPage
		} = pagination(req.query.page || 1, req.query.perPage || 5);

		if (!idTerminal) throw 'Параметр не найден';

		const { count } = await knexConnection('afisha').where('id_terminal', idTerminal).count().first();

		const data = await knexConnection('afisha')
			.select('id', 'path_url', 'date_crt')
			.where('id_terminal', idTerminal)
			.offset(offset)
			.limit(perPage)
			.orderBy('id', 'desc');

		data.forEach((x) => {
			x.path_url = x.path_url.split(`uploadFiles/${idTerminal}/`)[1];
		});

		const result = await Promise.all([count, data]).then(
			async ([total, rows]) => {
				console.log(total);
				const paginateObj = {
					total: parseInt(total),
					perPage: perPage,
					offset: offset,
					to: offset + rows.length,
					lastPage: Math.ceil(total / perPage),
					currentPage: page,
					from: offset,
				};

				return { paginate: paginateObj, data: rows };
			}
		);

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
	const checkFile = await knexConnection('afisha').where('path_url', path).first();
	if (checkFile) throw 'Данный файл с таким именем уже существует!';
	// создать файл
	await fs.promises.writeFile(path, Buffer.from(buffer), 'UTF-8');
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
