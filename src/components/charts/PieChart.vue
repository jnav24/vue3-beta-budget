<script>
import Chart from 'chart.js';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	setup() {
		const data = {
			type: 'pie',
			data: {
				labels: ['January'],
				datasets: [
					{
						label: 'Earned',
						backgroundColor: 'rgba(69,173,168,0.7)',
						data: [6321.12],
					},
					{
						label: 'Spent',
						backgroundColor: 'rgba(198,40,40,0.5)',
						data: [6233.49],
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
