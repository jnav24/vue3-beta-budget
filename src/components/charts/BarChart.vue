<script>
import Chart from 'chart.js';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	setup() {
		const data = {
			type: 'bar',
			data: {
				labels: ['2020'],
				datasets: [
					{
						label: 'Earned',
						backgroundColor: 'rgba(69,173,168,0.7)',
						data: [326321.12],
					},
					{
						label: 'Spent',
						backgroundColor: 'rgba(198,40,40,0.5)',
						data: [16233.49],
					},
				],
			},
			options: {
				scales: {
					yAxes: [
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
			new Chart(myChart.value, data);
		});

		return { myChart };
	},
});
</script>

<template>
	<canvas ref="myChart"></canvas>
</template>
