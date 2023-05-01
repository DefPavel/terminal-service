module.exports.pagination = (page = 1, perPage = 5) => {
	let newPage = parseInt(page);
	if (newPage < 1) newPage = 1;
	const offset = (newPage - 1) * perPage;
	return { newPage, offset, perPage };
};
