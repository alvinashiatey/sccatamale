<script lang="ts">
	import logo from '$lib/assets/icon.svg';
	import Carousel from '$lib/components/Carousel.svelte';
	import BackgroundEffect from '$lib/components/BackgroundEffect.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import exhibitionDataRaw from '$lib/events/onView/data.json';
	import { onMount } from 'svelte';
	import { createSEOData } from '$lib/seo';
	const seoData = createSEOData({
		image: '',
		title: 'SCCA',
		url: 'https://sccatamale.org'
	});

	const data = (exhibitionDataRaw as any).default || exhibitionDataRaw;

	// Automatically find and enhance all images in the onView/images directory
	// Limiting width to 1280px to prevent massive file sizes in the build
	const globbedImages = import.meta.glob('$lib/events/onView/images/*.{png,jpg,jpeg,webp}', {
		query: { enhanced: true, w: '400;800;1280' },
		eager: true
	});

	const exhibitionImages = (data.images || []).map((img: any) => {
		// Resolve relative path from JSON (e.g. "./images/1.png")
		// to the globbed absolute path key
		const filename = img.image.split('/').pop();
		const matchingPath = Object.keys(globbedImages).find((path) => path.endsWith(filename));

		return {
			src: matchingPath ? (globbedImages[matchingPath] as any).default : img.image,
			alt: img.caption,
			caption: img.caption
		};
	});

	const hours: Record<string, { open: string; close: string }> = {
		monday: { open: '11:00', close: '20:00' },
		tuesday: { open: '11:00', close: '20:00' },
		wednesday: { open: '11:00', close: '20:00' },
		thursday: { open: '11:00', close: '20:00' },
		friday: { open: 'Closed', close: 'Closed' },
		saturday: { open: '11:00', close: '18:00' },
		sunday: { open: '11:00', close: '18:00' }
	};

	const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	let currentTime = $state(new Date());
	let isOpen = $state(false);
	let currentTimeStr = $state('');
	let closingTimeStr = $state('');
	let nextOpenStr = $state('');
	let isHeaderHovered = $state(false);

	function formatTime12h(h: number, m: number): string {
		const period = h >= 12 ? 'PM' : 'AM';
		const hour = h % 12 === 0 ? 12 : h % 12;
		const min = String(m).padStart(2, '0');
		return `${hour}:${min} ${period}`;
	}

	function formatTime(date: Date): string {
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
			timeZone: 'Africa/Accra'
		});
	}

	function getGhanaDate(date: Date): Date {
		return new Date(date.toLocaleString('en-US', { timeZone: 'Africa/Accra' }));
	}

	function getNextOpenStr(ghanaDate: Date): string {
		const todayIndex = ghanaDate.getDay(); // 0=Sun ... 6=Sat
		const currentTotalMins = ghanaDate.getHours() * 60 + ghanaDate.getMinutes();

		// Check remaining days in the week cycle (up to 7 days ahead)
		for (let i = 1; i <= 7; i++) {
			const nextIndex = (todayIndex + i) % 7;
			const nextDayName = dayOrder[nextIndex];
			const nextHours = hours[nextDayName];

			if (nextHours.open === 'Closed') continue;

			const [openHour, openMin] = nextHours.open.split(':').map(Number);

			// If it's still today but before opening, say "today at ..."
			if (i === 0 && currentTotalMins < openHour * 60 + openMin) {
				return `today at ${formatTime12h(openHour, openMin)} GMT`;
			}

			const dayLabel =
				i === 1 ? 'tomorrow' : nextDayName.charAt(0).toUpperCase() + nextDayName.slice(1);
			return `${dayLabel} at ${formatTime12h(openHour, openMin)} GMT`;
		}

		return '';
	}

	function checkIfOpen(ghanaDate: Date): boolean {
		const day = dayOrder[ghanaDate.getDay()];
		const todayHours = hours[day];
		if (todayHours.open === 'Closed') return false;

		const [openHour, openMin] = todayHours.open.split(':').map(Number);
		const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
		const totalMins = ghanaDate.getHours() * 60 + ghanaDate.getMinutes();

		return totalMins >= openHour * 60 + openMin && totalMins < closeHour * 60 + closeMin;
	}

	function updateTime() {
		currentTime = new Date();
		const ghanaDate = getGhanaDate(currentTime);
		currentTimeStr = formatTime(currentTime);
		isOpen = checkIfOpen(ghanaDate);

		const day = dayOrder[ghanaDate.getDay()];
		const closeRaw = hours[day].close;
		if (closeRaw !== 'Closed') {
			const [closeHour, closeMin] = closeRaw.split(':').map(Number);
			closingTimeStr = formatTime12h(closeHour, closeMin);
		}

		if (!isOpen) {
			nextOpenStr = getNextOpenStr(ghanaDate);
		}
	}

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<Header {...seoData} />
<BackgroundEffect visible={isHeaderHovered} />
<div class="container">
	<header
		onmouseenter={() => (isHeaderHovered = true)}
		onmouseleave={() => (isHeaderHovered = false)}
	>
		<a href="/" onfocus={() => (isHeaderHovered = true)} onblur={() => (isHeaderHovered = false)}>
			<img src={logo} alt="SvelteKit logo" />
		</a>
	</header>
</div>

<Carousel
	images={exhibitionImages}
	label="On view now:"
	title={data.title}
	dateRange={data.dateRange}
/>

<div class="container">
	<div class="content">
		<section class="today">
			{#if isOpen}
				<p>
					We are currently <span class="state">open</span>. It is
					<span class="time_GMT">{currentTimeStr} GMT</span>
					— we close today at <span class="closing_today">{closingTimeStr} GMT</span>.
				</p>
			{:else}
				<p>
					We are currently <span class="state">closed</span>. It is
					<span class="time_GMT">{currentTimeStr} GMT</span>
					— we next open <span class="next_open">{nextOpenStr}</span>.
				</p>
			{/if}
		</section>

		<section class="about">
			<p>
				The Savannah Centre for Contemporary Art (SCCA) is an artist-run project space, exhibition
				and research hub, cultural repository and artists' residency located in Tamale, Ghana-
				dedicated to art and cultural practices which emerged in the 20th Century.
			</p>
		</section>

		<section class="contact">
			<p>
				For more information, please contact <a href="tel:+233372096210">+233 37 209 6210</a> or
				<a href="mailto:sccatamale@gmail.com">sccatamale@gmail.com</a>
			</p>
		</section>

		<section class="openings">
			<p>
				Opening Times: <br />
				Monday–Thursday: 11:00 am - 8:00 pm <br />
				Saturday–Sunday: 11:00 am - 6:00 pm <br />
				Closed on Fridays
			</p>
		</section>

		<section class="collaboratore" hidden>
			<p>
				SCCA is built on community effort. Below is an ever-growing list of individuals who have
				collaborated with and supported us, presented in no hierarchical order
			</p>
		</section>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 800px;
		padding: 2rem 0;
	}

	header {
		width: fit-content;
		padding: 2rem 0;
	}

	header a {
		width: fit-content;
	}

	header img {
		width: 150px;
		max-width: 150px;
		height: auto;
	}

	@media (max-width: 768px) {
		.content {
			gap: 1.5rem;
			padding: 1rem 0;
		}

		header img {
			max-width: 120px;
		}
	}
</style>
