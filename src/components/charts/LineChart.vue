<script lang="ts">
    import Chart, {ChartDataSets} from 'chart.js';
import { defineComponent, onMounted, ref } from 'vue';

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
		const data = {
			type: 'line',
			data: {
				labels: props.labels as string[],
				datasets: props.data as ChartDataSets[],
			},
			options: {},
		};
		const myChart = ref(null);

		onMounted(() => {
			new Chart(myChart.value as any, data);
		});

		return { myChart };
	},
});
</script>

<template>
	<canvas ref="myChart"></canvas>
</template>
