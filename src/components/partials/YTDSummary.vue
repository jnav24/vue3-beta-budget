<script lang="ts">
import { defineComponent } from 'vue';
import DonutChart from '@/components/charts/DonutChart.vue';
import { ChartData, ChartOptions } from 'chart.js';

export default defineComponent({
	components: {
		DonutChart,
	},
	props: {
		color: {
			required: true,
			type: String,
		},
		percentage: {
			required: true,
			type: String,
		},
		text: {
			required: true,
			type: String,
		},
	},
	setup(props) {
		const percent = Number(props.percentage);
		const chartData: ChartData = {
			labels: [],
			datasets: [
				{
					label: '',
					backgroundColor: [props.color, '#edf2f7'],
					borderWidth: 1,
					data: [percent, 100 - percent],
					weight: 0.5,
				},
			],
		};

		const chartOptions: ChartOptions = {
			cutoutPercentage: 75,
			circumference: Math.PI,
			rotation: -Math.PI,
			layout: {
				padding: {
					left: 0,
					right: 0,
				},
			},
			legend: {
				display: false,
			},
			tooltips: {
				enabled: false,
			},
			scales: {
				xAxes: [
					{
						gridLines: {
							drawBorder: false,
						},
					},
				],
			},
		};

		return { chartData, chartOptions };
	},
});
</script>

<template>
	<div class="w-48 relative my-2">
		<DonutChart :data="chartData" :options="chartOptions" />
		<div class="-translate-y-10 transform">
			<p
				:style="`color: ${color}`"
				class="text-3xl font-bold text-center"
			>
				{{ percentage }}%
			</p>
			<p class="text-gray-700 text-center text-sm">
				{{ text }}
			</p>
		</div>
	</div>
</template>
