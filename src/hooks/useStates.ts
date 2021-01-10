import {
	useAggregationStore,
	useBudgetStore,
	useTemplateStore,
	useTypesStore,
	useUserStore,
} from '@/store';
import useSession from '@/hooks/useSession';

export default function useStates() {
	const aggregationStore = useAggregationStore();
	const budgetStore = useBudgetStore();
	const templateStore = useTemplateStore();
	const typesStore = useTypesStore();
	const userStore = useUserStore();

	const { deleteCookie } = useSession();

	const cookieName = process.env.VUE_APP_TOKEN;

	const init = () => {
		aggregationStore.getYearlyAggregations();
		aggregationStore.getUnpaidBillTotals();
		budgetStore.getBudgets();
		templateStore.getTemplates();
		typesStore.getAllBillTypes();
	};

	const logout = () => {
		deleteCookie(cookieName);
		aggregationStore.reset();
		budgetStore.reset();
		templateStore.reset();
		typesStore.reset();
		userStore.reset();
	};

	return {
		init,
		logout,
	};
}
