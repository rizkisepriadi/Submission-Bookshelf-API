const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	if (!name) {
		const response = h.response({
			status: "fail",
			message: "Gagal menambahkan buku. Mohon isi nama buku",
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message:
				"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
		});
		response.code(400);
		return response;
	}

	const id = nanoid(16);
	const finished = pageCount === readPage;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
		finished,
		insertedAt,
		updatedAt,
	};

	books.push(newBook);

	const isSuccess = books.filter(book => book.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: "success",
			message: "Buku berhasil ditambahkan",
			data: {
				bookId: id,
			},
		});
		response.code(201);
		return response;
	}
	const response = h.response({
		status: "fail",
		message: "Gagal menambahkan buku",
	});
	response.code(400);
	return response;

};

const getAllBooksHandler = (request, h) => {
	const { name, reading, finished } = request.params;

	if (!name && !reading && !finished) {
		const response = h.response({
			status: "success",
			data: {
				books: books.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}

	if (name) {
		const booksName = books.filter(book => {
			const bookName = book.name.toLowerCase();
			return bookName.includes(name.toLowerCase());
		});

		const response = h.response({
			status: "success",
			data: {
				books: booksName.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}

	if (reading) {
		const booksReading = books.filter(book => Number(book.reading) === Number(reading),
		);

		const response = h.response({
			status: "success",
			data: {
				books: booksReading.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}

	if (finished) {
		const booksFinished = books.filter(book => Number(book.finished) === Number(finished),
		);
		
		const response = h.response({
			status: "success",
			data: {
				books: booksFinished.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}
};

const getBookByIdHandler = (request, h) => {
	const { id } = request.params;
	const book = books.filter((n) => n.id === id)[0];

	if (book !== undefined) {
		const response = h.response({
			status: "success",
			message: "Menampilkan Detail Buku",
			data: {
				book,
			},
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Buku tidak ditemukan",
	});
	response.code(404);
	return response;
};

const editBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	if (!name) {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbarui buku. Mohon isi nama buku",
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message:
				"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
		});
		response.code(400);
		return response;
	}

	const finished = pageCount === readPage;
	const updatedAt = new Date().toISOString();


	const index = books.findIndex(book => book.id === id);

	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			updatedAt,
		};

		const response = h.response({
			status: "success",
			message: "Buku berhasil diperbarui",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Gagal memperbarui buku. Id tidak ditemukan",
	});
	response.code(404);
	return response;
};

const deleteBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const index = books.findIndex(book => book.id === id);

	if (index !== -1) {
		books.splice(index, 1);
		const response = h.response({
			status: "success",
			message: "Buku berhasil dihapus",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Buku gagal dihapus. Id tidak ditemukan",
	});
	response.code(404);
	return response;
};


module.exports = {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deleteBookByIdHandler,
};