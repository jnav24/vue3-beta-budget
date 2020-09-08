<script lang="ts">
import { defineComponent, ref } from 'vue';
import ChartIcon from '@/components/ui-elements/icons/ChartIcon.vue';
import ChevronDownIcon from '@/components/ui-elements/icons/ChevronDownIcon.vue';
import CloseIcon from '@/components/ui-elements/icons/CloseIcon.vue';
import HomeIcon from '@/components/ui-elements/icons/HomeIcon.vue';
import MenuIcon from '@/components/ui-elements/icons/MenuIcon.vue';
import ReportsIcon from '@/components/ui-elements/icons/ReportsIcon.vue';
import UserCircleIcon from '@/components/ui-elements/icons/UserCircleIcon.vue';
import Link from '@/components/ui-elements/Link.vue';
import SubNav from '@/components/partials/SubNav.vue';
import SubNavItems from '@/components/partials/SubNavItems.vue';

export default defineComponent({
	components: {
		ChartIcon,
		ChevronDownIcon,
		CloseIcon,
		HomeIcon,
		Link,
		MenuIcon,
		ReportsIcon,
		SubNav,
		SubNavItems,
		UserCircleIcon,
	},
	setup() {
		const buttonSelected = ref(false);
		const showMobileNav = ref(false);
		const showSubNav = ref(false);
		const profileLinks = [
			{ value: '', label: 'Profile', icon: 'UserIcon' },
			{ value: '', label: 'Logout', icon: 'LogoutIcon' },
		];
		const menu = [
			{ link: { name: 'home' }, label: 'Home', icon: 'HomeIcon' },
			{ link: { name: 'budgets' }, label: 'Budgets', icon: 'ChartIcon' },
			{
				link: { name: 'reports' },
				label: 'Reports',
				icon: 'ReportsIcon',
			},
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
			showMobileNav,
			showSubNav,
			resetSelected,
			toggleSelected,
			menu,
		};
	},
});
</script>

<template>
	<nav class="relative z-50">
		<div class="bg-primary px-4 py-1 h-16 flex flex-row items-center relative">
			<div
				class="container mx-auto flex flex-row items-center justify-between"
			>
				<div class="flex flex-row items-center">
					<MenuIcon
						v-if="!showMobileNav"
						@click="showMobileNav = true"
						class="block sm:hidden cursor-pointer h-8 mr-2 w-8 text-white focus:bg-dark-primary active:bg-dark-primary rounded p-1 outline-none"
					/>
					<CloseIcon
						v-if="showMobileNav"
						@click="showMobileNav = false"
						class="block sm:hidden cursor-pointer h-8 mr-2 w-8 text-white focus:bg-dark-primary active:bg-dark-primary rounded p-1 outline-none"
					/>
					<img src="@/assets/logo.png" alt="" class="h-10 crisp" />
				</div>

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
							<UserCircleIcon class="h-6 w-6 text-primary" />
						</span>

						<span
							class="text-white ml-4 mr-2 my-0 ellipsis max-w-32 hidden sm:block"
						>
							Bobby Sanchez
						</span>

						<span class="hidden sm:block">
							<ChevronDownIcon
								class="transform transition duration-300 h-6 w-6 text-white"
								:class="{
									'rotate-180': buttonSelected,
									'rotate-0': !buttonSelected,
								}"
							/>
						</span>
					</button>

					<SubNavItems :items="profileLinks" :show="showSubNav" />
				</SubNav>
			</div>
		</div>

		<div v-if="showMobileNav" class="bg-primary block sm:hidden px-4 py-2 absolute w-full z-10">
			<Link
				v-for="(item, index) in menu"
				:key="index"
				link-type="inverted"
				:link-to="item.link"
			>
				<component :is="item.icon" class="w-4 h-4"></component>
				<span class="ml-2">{{ item.label }}</span>
			</Link>
		</div>

		<div class="bg-white shadow-sm hidden sm:block">
			<div class="container mx-auto flex flex-row">
				<Link
					v-for="(item, index) in menu"
					:key="index"
					:link-to="item.link"
				>
					<component :is="item.icon" class="w-4 h-4"></component>
					<span class="ml-2">{{ item.label }}</span>
				</Link>
			</div>
		</div>
	</nav>
</template>
