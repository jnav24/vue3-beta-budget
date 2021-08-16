import { ExpenseFormContextType } from '@/components/modals/ExpenseFormProvider';
import useTimestamp from '@/hooks/useTimestamp';

export const getPaidDate = (expenseContext: ExpenseFormContextType) => {
	const { formatDate, getEndDayOfMonth, unix } = useTimestamp();
	const budgetCycle = expenseContext.budgetCycle.value;
	const endBudgetCycle = getEndDayOfMonth(budgetCycle).toISOString();
	const todayDate = formatDate();
	const todayDateUnix = unix(todayDate);

	if (expenseContext.data.initial_pay_date) {
		return expenseContext.data.initial_pay_date;
	}

	if (expenseContext.data.paid_date) {
		return expenseContext.data.paid_date;
	}

	if (
		todayDateUnix > unix(budgetCycle) &&
		unix(endBudgetCycle) > todayDateUnix
	) {
		return todayDate;
	}

	return budgetCycle;
};
