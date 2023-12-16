const {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deleteBookByIdHandler,
} = require("./bookshelf-api/src/handler");

const routes = [
	{
		method: "*",
		path: "/{any*}",
		handler: (request, h) => {
			return "Halaman tidak ditemukan";
		},
	},
	{
		method: "POST",
		path: "/books",
		handler: addBookHandler,
	},
	{
		method: "GET",
		path: "/books",
		handler: getAllBooksHandler,
	},
	{
		method: "GET",
		path: "/books/{id}",
		handler: getBookByIdHandler,
	},
	{
		method: "PUT",
		path: "/books/{id}",
		handler: editBookByIdHandler,
	},
	{
		method: "DELETE",
		path: "/books/{id}",
		handler: deleteBookByIdHandler,
	},
];

module.exports = routes;