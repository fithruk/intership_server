const registerShema = {
	body: {
		type: "object",
		properties: {
			name: { type: "string" },
			email: { type: "string" },
			password: { type: "string" },
		},
		required: ["name", "email", "password"],
	},
	response: {
		200: {
			type: "object",
			properties: {
				message: { type: "string" },
			},
			required: ["message"],
		},
	},
};

const loginShema = {
	body: {
		type: "object",
		properties: {
			email: { type: "string" },
			password: { type: "string" },
		},
		required: ["email", "password"],
	},
	response: {
		200: {
			type: "object",
			properties: {
				message: { type: "string" },
			},
			required: ["message"],
		},
	},
};

export { registerShema, loginShema };
