export const normalizeUsers = data => {

	data = data.map(x => {
		x.id = x._id;

		x.profile.id = x.profile._id;

		x.email = x.email.map(y => {
			y.id = y._id;
			delete y._id;

			return y;
		});

		delete x._id;
		delete x.__v;
		delete x.profile._id;
		delete x.profile.__v;
		delete x.profile.userid;

		return x;
	});

	let users = {};

	data.forEach(x => {
		users[x.id] = x;
	});

	return users;
};