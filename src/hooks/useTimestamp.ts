// import { DateTime } from 'luxon';
import {
	format,
	addMonths,
	endOfMonth,
	startOfMonth,
	addYears,
	getUnixTime,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export default function useTimestamp() {
	const getDateObject = (timestamp = '') =>
		timestamp.length ? new Date(timestamp) : new Date();

	const formatDate = (
		pattern = 'yyyy-MM-dd hh:mm A',
		timestamp = ''
	): string => {
		// date-fns
		return format(getDateObject(timestamp), pattern);

		// luxon
		// DateTime.local().toFormat('ff');
	};

	const formatTimeZone = (
		pattern = 'yyyy-MM-dd hh:mm',
		zone = 'UTC',
		timestamp = ''
	) => {
		// date-fns; need date-fns-tz
		const zonedDate = utcToZonedTime(getDateObject(timestamp), zone);
		return formatDate(pattern, zonedDate.toLocaleString());

		// luxon
		// DateTime.local().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd')
	};

	const addMonth = (addition: number, timestamp = '') => {
		// date-fns
		return addMonths(getDateObject(timestamp), addition);

		// luxon
		// DateTime.local().plus({ months: 1 })
	};

	const addYear = (addition: number, timestamp = '') => {
		// date-fns
		return addYears(getDateObject(timestamp), addition);

		// luxon
		// DateTime.local().plus({ years: 1 })
	};

	const setDoubleDigits = (int: number): string => {
		if (int < 10) {
			return '0' + int;
		}

		return int.toString();
	};

	const getEndDayOfMonth = (timestamp = '') => {
		// date-fns
		return endOfMonth(getDateObject(timestamp));

		// luxon
		// DateTime.local().endOf('month').
	};

	const getStartDayOfMonth = (timestamp = '') => {
		// date-fns
		return startOfMonth(getDateObject(timestamp));

		// luxon
		// DateTime.local().startOf('month')
	};

	const unix = (timestamp = ''): number => {
		// date-fns
		return getUnixTime(getDateObject(timestamp));

		// luxon
		// dt.toMillis()
	};

	const generateUnixId = (): number => {
		return unix() * Math.round(Math.random() * 100) + 1;
	};

	const generateTempId = (): string => {
		return 'temp_' + generateUnixId();
	};

	const getAllMonths = (
		formatType: 'abbr' | 'full' | 'num' | string
	): Array<Record<'value' | 'label', string>> => {
		return Array.from(Array(12).keys()).map(int => {
			let label = '';
			const month =
				int + 1 < 10
					? '0' + (int + 1).toString()
					: (int + 1).toString();
			const year = formatDate('yyyy');

			switch (formatType) {
				case 'abbr':
					label = formatDate('MMM', `${year}-${month}-01 00:00:00`);
					break;
				case 'full':
					label = formatDate('MMMM', `${year}-${month}-01 00:00:00`);
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

	return {
		addMonth,
		addYear,
		formatDate,
		formatTimeZone,
		generateTempId,
		getEndDayOfMonth,
		getAllMonths,
		setDoubleDigits,
		unix,
		getStartDayOfMonth,
	};
}
