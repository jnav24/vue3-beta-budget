<script lang="ts">
import Chart, { ChartDataSets } from 'chart.js';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
	props: {
		labels: {
			required: true,
			type: Array as () => string[],
		},
		data: {
			required: true,
			type: Array as () => ChartDataSets[],
		},
	},
	setup(props) {
		let chart: Chart;
		const data = {
			type: 'bar',
			data: {
				labels: [] as string[],
				datasets: [] as ChartDataSets[],
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
			chart = new Chart(myChart.value as any, data);
		});

		watch(
			() => props.data,
			() => {
				data.data.datasets = props.data;
				data.data.labels = props.labels;
				chart.update();
			}
		);

		return { myChart };
	},
});
</script>

<template>
	<canvas ref="myChart"></canvas>
</template>
