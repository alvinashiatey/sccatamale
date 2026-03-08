<script lang="ts">
	import SobelFilter from './SobelFilter.svelte';
	import Duotone from './Duotone.svelte';
	// @ts-expect-error - enhanced image query is handled by vite-plugin-enhanced-img
	import BG1 from '$lib/assets/BG_01.webp?enhanced&w=800;1280;1920';
</script>

<div class="background-effect">
	<enhanced:img src={BG1} alt="Background Image" class="background-image" sizes="100vw" />
</div>

<SobelFilter />
<Duotone />

<style>
	.background-effect {
		width: 100%;
		height: 100dvh;
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 100;
		pointer-events: none;
		mix-blend-mode: multiply;
		filter: url(#sobel) invert(1) url(#brick-duotone);

		/* Refined reveal animation */
		opacity: 0;
		transform: scale(1.05);
		transition:
			opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
			transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
	}

	:global(.background-effect.is-active) {
		opacity: 1;
		transform: scale(1);
	}

	.background-effect :global(picture),
	.background-effect :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
