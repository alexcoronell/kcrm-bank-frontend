const regularExpressions = {
	name: /^([A-ZÁÉÍÓÚ][a-zñáéíóú]+[\s]*)+$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

export const validateEmailHelper = (email: string) =>
	regularExpressions.email.test(email);

export const validatenameHelper = (name: string) =>
	regularExpressions.name.test(name);
