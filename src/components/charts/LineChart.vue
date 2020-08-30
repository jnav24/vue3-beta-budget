<script>
import Chart from 'chart.js';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	setup() {
		const data = {
			type: 'line',
			data: {
				labels: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
				],
				datasets: [
					{
						label: 'Earned',
						backgroundColor: 'rgba(69,173,168,0.7)',
						data: [40, 39, 10, 40, 39, 80, 40],
					},
					{
						label: 'Spent',
						backgroundColor: 'rgba(198,40,40,0.5)',
						data: [80, 19, 20, 60, 9, 20, 70],
					},
				],
			},
			options: {},
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
