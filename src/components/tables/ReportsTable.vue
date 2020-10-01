<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardFooter from '@/components/ui-elements/card/CardFooter.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';

export default defineComponent({
	components: {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
	},
	props: {},
	setup(props) {
		const headers: string[] = [];

		onMounted(() => {
			console.log(props);
		});

		return { headers };
	},
});
</script>

<template>
	<!--
		All Bill types will have the following
		name (except vehicles)
		vehicle (only vehicles)
		type (except misc)
		paid date (only for spending bill types)
		amount
		mileage (vehicles only)
		balance (vehicles, credit card, loans, housing)
	-->
	<section class="mb-24 px-4 sm:px-0">
		<div class="mt-4 flex flex-row items-center justify-between">
			<h2 class="text-2xl text-gray-600 font-body">
				January
			</h2>
		</div>

		<Card>
			<CardHeader class="bg-gray-100 rounded-t">
				<div :class="`grid gap-2 grid-cols-2 sm:grid-cols-4`">
					<div>
						Header
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<p>Content goes here</p>
				<p>Content goes here</p>
				<p>Content goes here</p>
				<p>Content goes here</p>
				<p>Content goes here</p>
			</CardContent>

			<CardFooter
				class="bg-gray-100 overflow-hidden pt-2 rounded-b text-right"
			>
				<span class="text-gray-600 mr-2 text-base">Total</span>
				<span class="font-bold text-gray-700 text-lg">$12,324.23</span>
			</CardFooter>
		</Card>
	</section>
</template>
