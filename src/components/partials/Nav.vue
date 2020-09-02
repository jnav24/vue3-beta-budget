<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
	ChartIcon,
	ChevronDownIcon,
	HomeIcon,
	ReportsIcon,
	UserCircleIcon,
} from '@/components/ui-elements';
import Link from '@/components/ui-elements/Link.vue';
import SubNav from '@/components/partials/SubNav.vue';
import SubNavItems from '@/components/partials/SubNavItems.vue';

export default defineComponent({
	components: {
		ChartIcon,
		ChevronDownIcon,
		HomeIcon,
		Link,
		ReportsIcon,
		SubNav,
		SubNavItems,
		UserCircleIcon,
	},
	setup() {
		const buttonSelected = ref(false);
		const showSubNav = ref(false);
		const profileLinks = [
			{ value: '', label: 'Profile', icon: 'UserIcon' },
			{ value: '', label: 'Logout', icon: 'LogoutIcon' },
		];

		const resetSelected = () => {
			showSubNav.value = false;
			buttonSelected.value = false;
		};
		const toggleSelected = () => {
			showSubNav.value = !showSubNav.value;
			buttonSelected.value = !buttonSelected.value;
		};

		return {
			buttonSelected,
			profileLinks,
			showSubNav,
			resetSelected,
			toggleSelected,
		};
	},
});
</script>

<template>
	<nav class="relative z-50">
		<div class="bg-primary px-4 py-1 h-16 flex flex-row items-center">
			<div
				class="container mx-auto flex flex-row items-center justify-between"
			>
				<img src="@/assets/logo.png" alt="" class="h-10 crisp" />

				<SubNav>
					<button
						class="flex text-sm border-2 focus:outline-none transition duration-300 ease rounded-full p-2"
						:class="{
							'border-white': buttonSelected,
							'border-primary': !buttonSelected,
						}"
						id="user-menu"
						aria-label="User menu"
						aria-haspopup="true"
						@blur="resetSelected()"
						@click="toggleSelected()"
					>
						<span class="rounded-full bg-white">
							<UserCircleIcon styles="h-6 w-6 text-primary" />
						</span>
						<span
							class="text-white ml-4 mr-2 my-0 ellipsis"
							style="max-width: 8rem"
							>Bobby Sanchez</span
						>
						<ChevronDownIcon
							class="transform transition duration-300"
							:class="{
								'rotate-180': buttonSelected,
								'rotate-0': !buttonSelected,
							}"
							styles="h-6 w-6 text-white"
						/>
					</button>

					<SubNavItems :items="profileLinks" :show="showSubNav" />
				</SubNav>
			</div>
		</div>

		<div class="bg-white shadow-sm">
			<div class="container mx-auto flex flex-row">
				<Link :link-to="{ name: 'home' }">
					<HomeIcon styles="w-4 h-4" />
					<span class="ml-2">Home</span>
				</Link>

				<Link :link-to="{ name: 'budgets' }">
					<ChartIcon styles="w-4 h-4" />
					<span class="ml-2">Budgets</span>
				</Link>

				<Link :link-to="{ name: 'reports' }">
					<ReportsIcon styles="w-4 h-4" />
					<span class="ml-2">Reports</span>
				</Link>
			</div>
		</div>
	</nav>
</template>
