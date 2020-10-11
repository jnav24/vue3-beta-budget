<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch } from 'vue';
import Chart, { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

export default defineComponent({
	props: {
		data: {
			required: true,
			type: Object as PropType<ChartData>,
		},
		options: {
			default: {} as PropType<ChartOptions>,
			type: Object as PropType<ChartOptions>,
		},
	},
	setup(props) {
		let chart: Chart;
		const data: ChartConfiguration = {
			type: 'doughnut',
			data: props.data,
			options: {
				...{
					legend: {
						// display: false,
						fullWidth: false,
						position: 'bottom',
					},
					scales: {},
				},
				...props.options,
			},
		};
		const myChart = ref(null);

		onMounted(() => {
			chart = new Chart(myChart.value ?? '', data);
		});

		watch(
			() => props.data,
			() => {
				data.data = props.data;
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
