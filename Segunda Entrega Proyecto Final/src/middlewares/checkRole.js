const isAdmin = true

const adminValidationError = () => {
	const error = {
		error: -1,
		descripcion: "no autorizado",
	}
	return error
}

export const validateAdmin = (req, res, next) => {
	if (!isAdmin) {
		res.json(adminValidationError())
	} else {
		next()
	}
}
