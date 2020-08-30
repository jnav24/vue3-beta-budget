<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Chart from 'chart.js';

export default defineComponent({
	setup() {
		const data = {
			type: 'horizontalBar',
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
						backgroundColor: '#C62828',
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
					display: false,
				},
				scales: {
					xAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
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
