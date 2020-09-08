<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Chart, { ChartConfiguration } from 'chart.js';

export default defineComponent({
	setup() {
		const data: ChartConfiguration = {
			type: 'doughnut',
			data: {
				labels: [
					'Childcare',
					'Educational',
					'Entertainment',
					'Food',
					'Gift',
					'Housing',
					'Investments',
					'Medical',
					'Miscellaneous',
					'Personal',
					'Subscriptions',
					'Shopping',
					'Tax',
					'Travel',
					'Vehicles',
				],
				datasets: [
					{
						label: 'Spent',
						backgroundColor: [
							'#C62828',
							'#FBD38D',
							'#FAF089',
							'#38A169',
							'#4299E1',
							'#D53F8C',
							'#B794F4',
							'#E53E3E',
							'#2B6CB0',
							'#81E6D9',
							'#9AE6B4',
							'#FC8181',
							'#D6BCFA',
							'#ECC94B',
							'#FBB6CE',
						],
						data: [
							40,
							39,
							20,
							40,
							39,
							80,
							40,
							120,
							95,
							84,
							163,
							24,
							36,
							88,
							69,
						],
					},
				],
			},
			options: {
				legend: {
					// display: false,
					fullWidth: false,
					position: 'bottom',
				},
				scales: {},
			},
		};
		const myChart = ref(null);

		onMounted(() => {
			new Chart(myChart.value ?? '', data);
		});

		return { myChart };
	},
});
</script>

<template>
	<canvas ref="myChart"></canvas>
</template>
