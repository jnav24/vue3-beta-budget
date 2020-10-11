<script lang="ts">
import Chart, { ChartDataSets } from 'chart.js';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
	props: {
		labels: {
			required: true,
			type: Array,
		},
		data: {
			required: true,
			type: Array,
		},
	},
	setup(props) {
		let chart: Chart;
		const data = {
			type: 'line',
			data: {
				labels: [] as string[],
				datasets: [] as ChartDataSets[],
			},
			options: {},
		};
		const myChart = ref(null);

		onMounted(() => {
			chart = new Chart(myChart.value as any, data);
			console.log(chart);
		});

		watch(
			() => props.data,
			() => {
				data.data.datasets = props.data as ChartDataSets[];
				data.data.labels = props.labels as string[];
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
