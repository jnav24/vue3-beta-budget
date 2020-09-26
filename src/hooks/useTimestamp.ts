export default function useTimestamp() {
	const format = (format = 'yyyy-MM-dd hh:mm A', timestamp = ''): string => {
		// date-fns
		// format(new Date(2017, 10, 6), 'MMM')

		// luxon
		// DateTime.local().toFormat('ff');
		return 'howdy';
	};

	const formatTimeZone = () => {
		// date-fns
		// const zonedDate = utcToZonedTime(new Date(), 'Europe/Berlin')
		// return format(zonedDate, 'yyyy-MM-dd', { timeZone: 'Europe/Berlin' });

		// luxon
		// DateTime.local().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd')
	};

	const addMonth = (addition: number, timestamp = '') => {
		// date-fns
		// addMonths(new Date(), 1)

		// luxon
		// DateTime.local().plus({ months: 1 })
	};

	const addYear = () => {
		// date-fns
		// addYears(date, amount)

		// luxon
		// DateTime.local().plus({ years: 1 })
	};

	const setDoubleDigits = (int: number): string => {
		if (int < 10) {
			return '0' + int;
		}

		return int.toString();
	};

	const getEndDayOfMonth = () => {
		// date-fns
		// endOfMonth(date)

		// luxon
		// DateTime.local().endOf('month').
	};

	const getStartDayOfMonth = () => {
		// date-fns
		// startOfMonth(date)

		// luxon
		// DateTime.local().startOf('month')
	};

	const unix = (): number => {
		// date-fns
		// getUnixTime(new Date());

		// luxon
		// dt.toMillis()

		return 0;
	};

	const generateUnixId = (): number => {
		return unix() * Math.round(Math.random() * 100) + 1;
	};

	const generateTempId = (): string => {
		return 'temp_' + generateUnixId();
	};

	const getAllMonths = (formatType: string): Array<Record<'value' | 'label', string>> => {
		return Array.from(Array(12).keys()).map(int => {
			let label = '';
			const month =
				int + 1 < 10
					? '0' + (int + 1).toString()
					: (int + 1).toString();
			const year = format('YYYY');

			switch (formatType) {
				case 'abbr':
					label = format('MMM', `${year}-${month}-01`);
					break;
				case 'full':
					label = format('MMMM', `${year}-${month}-01`);
					break;
				case 'num':
				default:
					label = month;
					break;
			}

			return {
				label,
				value: month,
			};
		});
	};

	return { addMonth, generateTempId, setDoubleDigits, unix };
}
