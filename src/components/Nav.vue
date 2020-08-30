<script lang="ts">
import { defineComponent } from 'vue';
import ChartIcon from '@/components/ui-elements/icons/ChartIcon.vue';
import ChevronDownIcon from '@/components/ui-elements/icons/ChevronDownIcon.vue';
import HomeIcon from '@/components/ui-elements/icons/HomeIcon.vue';
import ReportsIcon from '@/components/ui-elements/icons/ReportsIcon.vue';
import UserCircleIcon from '@/components/ui-elements/icons/UserCircleIcon.vue';
import Link from '@/components/ui-elements/Link.vue';

export default defineComponent({
	components: {
		ChartIcon,
		ChevronDownIcon,
		HomeIcon,
		ReportsIcon,
		UserCircleIcon,
		Link,
	},
});
</script>

<template>
	<nav>
		<div class="bg-primary px-4 py-1 h-16 flex flex-row items-center">
			<div
				class="container mx-auto flex flex-row items-center justify-between"
			>
				<img src="@/assets/logo.png" alt="" class="h-10 crisp" />

				<button
					class="flex text-sm border-2 border-transparent focus:outline-none focus:border-white transition duration-150 ease-in-out"
					id="user-menu"
					aria-label="User menu"
					aria-haspopup="true"
				>
					<span class="rounded-full bg-white">
						<UserCircleIcon styles="h-6 w-6 text-primary" />
					</span>
					<span
						class="text-white ml-4 mr-2 my-0 ellipsis"
						style="max-width: 8rem"
						>Bobby Sanchez</span
					>
					<ChevronDownIcon styles="h-6 w-6 text-white" />
				</button>
			</div>
		</div>

		<div class="bg-white">
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
