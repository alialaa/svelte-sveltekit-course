import { loremIpsum } from 'lorem-ipsum';
import { v4 as uuidv4 } from 'uuid';

function generateNotifications(length = 10) {
	return Array(length)
		.fill(null)
		.map((n, i) => {
			const date = new Date();
			date.setDate(date.getDate() + i);
			return {
				id: uuidv4(),
				title: loremIpsum({ count: 1, sentenceLowerBound: 5, sentenceUpperBound: 10 }),
				body: loremIpsum({ count: 1, sentenceLowerBound: 20, sentenceUpperBound: 25 }),
				date: date.getTime()
			};
		});
}

export default generateNotifications;
