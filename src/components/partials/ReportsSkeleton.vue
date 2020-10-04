<template>
	<main class="container mx-auto px-4 sm:px-0 py-6 animate-pulse">
		<div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
			<aside class="col-span-1 lg:col-span-1">
				<div class="block sm:grid-cols-3 sm:grid sm:gap-2 lg:block">
					<div
						v-for="(elem, index) in Array.from(Array(5).keys())"
						:key="index"
						class="rounded-md transition duration-150 my-2 sm:my-4 bg-white w-full h-20"
					/>
				</div>
			</aside>

			<div
				class="bg-white rounded-md transition duration-150 my-2 sm:my-4 col-span-1 lg:col-span-4 hidden sm:grid"
			/>
		</div>
	</main>
</template>
