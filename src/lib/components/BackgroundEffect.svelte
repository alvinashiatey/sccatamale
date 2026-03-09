<script lang="ts">
	import SobelFilter from './SobelFilter.svelte';
	import Duotone from './Duotone.svelte';
	// @ts-expect-error - enhanced image query is handled by vite-plugin-enhanced-img
	import BG1 from '$lib/assets/BG_01.webp?enhanced&w=800;1280;1920';

	function scrollOpacityAttachment(node: HTMLElement) {
		let viewportHeight = window.innerHeight;

		function handleScroll() {
			const scrollY = window.scrollY;
			const progress = Math.min(Math.max(scrollY / viewportHeight, 0), 0.5);
			node.style.setProperty('--scroll-opacity', String(progress));
		}

		function handleResize() {
			viewportHeight = window.innerHeight;
			handleScroll();
		}

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}
</script>

<div class="background-effect" {@attach scrollOpacityAttachment}>
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
			opacity 0.1s linear,
			transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
	}

	@media (hover: none) {
		.background-effect {
			opacity: var(--scroll-opacity, 0);
			transform: scale(1.05);
		}
	}

	.background-effect :global(picture),
	.background-effect :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
