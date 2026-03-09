<script lang="ts">
	interface CarouselImage {
		src: any;
		alt: string;
		caption: string;
	}

	let {
		images,
		label,
		title,
		dateRange
	}: {
		images: CarouselImage[];
		label: string;
		title: string;
		dateRange: string;
	} = $props();

	let trackElement: HTMLDivElement | undefined = $state();
	let isInView = $state(false);
	let currentIndex = $state(0);

	$effect(() => {
		if (!trackElement) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				isInView = entry.isIntersecting;
			},
			{ threshold: 0.2 }
		);

		observer.observe(trackElement);
		return () => observer.disconnect();
	});

	// Keep currentIndex in sync when user scrolls manually (swipe/trackpad)
	$effect(() => {
		if (!trackElement) return;

		function onScroll() {
			if (!trackElement) return;
			const slides = trackElement.querySelectorAll('.carousel-slide');
			if (slides.length === 0) return;

			const scrollLeft = trackElement.scrollLeft;
			const trackOffset = trackElement.offsetLeft;
			let closestIndex = 0;
			let closestDistance = Infinity;

			for (let i = 0; i < slides.length; i++) {
				const slide = slides[i] as HTMLElement;
				const distance = Math.abs(slide.offsetLeft - trackOffset - scrollLeft);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = i;
				}
			}

			currentIndex = closestIndex;
		}

		trackElement.addEventListener('scrollend', onScroll);
		return () => trackElement?.removeEventListener('scrollend', onScroll);
	});

	function handleKeydown(event: KeyboardEvent) {
		if (!trackElement || !isInView) return;

		// Don't trigger if user is typing in an input/textarea
		const activeElement = document.activeElement;
		const isTyping =
			activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement;
		if (isTyping) return;

		if (event.key === 'ArrowRight') {
			navigate(1);
		} else if (event.key === 'ArrowLeft') {
			navigate(-1);
		}
	}

	function navigate(direction: number) {
		if (!trackElement) return;

		const slides = trackElement.querySelectorAll('.carousel-slide');
		if (slides.length === 0) return;

		const nextIndex = Math.max(0, Math.min(slides.length - 1, currentIndex + direction));
		if (nextIndex === currentIndex) return;

		currentIndex = nextIndex;
		const target = slides[currentIndex] as HTMLElement;

		trackElement.scrollTo({
			left: target.offsetLeft - trackElement.offsetLeft,
			behavior: 'smooth'
		});
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<section class="carousel" aria-roledescription="carousel" aria-label={title}>
	<div class="carousel-track" bind:this={trackElement} role="region" aria-live="polite">
		{#each images as image, i (i)}
			<figure
				class="carousel-slide"
				role="group"
				aria-roledescription="slide"
				aria-label="{i + 1} of {images.length}"
			>
				<enhanced:img
					src={image.src}
					alt={image.alt}
					sizes="(min-width: 1280px) 1280px, (min-width: 768px) 800px, 400px"
				/>
				<figcaption>{i + 1}. {image.caption}</figcaption>
			</figure>
		{/each}
	</div>

	<div class="exhibition-info">
		<span class="images-count"> {currentIndex + 1} / {images.length}</span>
		<span class="exhibition-label">{label}</span>
		<span class="exhibition-title">{title}</span>
		<span class="exhibition-date">{dateRange}</span>
	</div>
</section>

<style>
	.carousel {
		width: 100%;
	}

	.carousel-track {
		display: flex;
		gap: var(--space-4);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
		margin-left: calc(
			max(0px, (100vw - var(--container-max-width)) / 2) + var(--container-padding)
		);
		padding-right: 0;
		padding-bottom: var(--space-4);
	}

	.carousel-track::-webkit-scrollbar {
		display: none;
	}

	.carousel-slide {
		flex: 0 0 fit-content;
		scroll-snap-align: start;
		margin: 0;
	}

	.carousel-slide :global(img) {
		width: 100%;
		height: 70vh;
		display: block;
		object-fit: contain;
	}

	.carousel-slide figcaption {
		margin-top: var(--space-2);
		font-family: var(--font-primary);
		font-size: var(--font-size-sm);
		color: var(--color-tertiary);
		opacity: 0.7;
		line-height: var(--line-height-relaxed);
		transition:
			opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
			transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	@media (hover: hover) {
		.carousel-slide figcaption {
			opacity: 0;
			transform: translateY(4px);
			pointer-events: none;
		}

		.carousel-slide:hover figcaption {
			opacity: 1;
			transform: translateY(0);
		}

		.carousel-slide:focus-within figcaption {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (hover: none) {
		.carousel-slide figcaption {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.exhibition-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding-top: var(--space-4);
		padding-left: var(--site-left-padding);
		padding-right: var(--container-padding);
		font-family: var(--font-primary);
		color: var(--color-tertiary);
	}

	.exhibition-label {
		font-weight: var(--font-weight-bold);
	}

	.exhibition-title {
		color: var(--color-secondary);
	}

	.exhibition-date {
		color: var(--color-secondary);
	}

	@media (max-width: 768px) {
		.carousel-slide {
			flex: 0 0 85%;
			align-self: center;
		}

		.carousel-slide :global(img) {
			width: 100%;
			height: auto;
			max-height: 60vh;
			object-fit: contain;
		}
	}
</style>
