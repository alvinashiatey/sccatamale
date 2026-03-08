<script lang="ts">
	interface Props {
		id?: string;
		dither?: boolean;
		dithering_amount?: number;
		noise_scale?: number;
	}

	let {
		id = 'brick-duotone',
		dither = false,
		dithering_amount = 3,
		noise_scale = 0.8
	}: Props = $props();
</script>

<svg width="0" height="0" style="position: absolute;">
	<filter {id} color-interpolation-filters="sRGB">
		{#if dither}
			<!-- Add dithering effect using turbulence -->
			<feTurbulence
				type="fractalNoise"
				baseFrequency={noise_scale}
				numOctaves="3"
				seed="1"
				result="noise"
			/>

			<!-- Add some displacement using the noise -->
			<feDisplacementMap
				in="SourceGraphic"
				in2="noise"
				scale={dithering_amount}
				xChannelSelector="R"
				yChannelSelector="G"
			/>
		{/if}

		<!-- Convert to grayscale first -->
		<feColorMatrix type="saturate" values="0" />

		<!-- Apply duotone effect with brick red and white -->
		<feComponentTransfer>
			<feFuncR type="table" tableValues="0.698 1" />
			<!-- 178 / 255 ≈ 0.698 -->
			<feFuncG type="table" tableValues="0.133 1" />
			<!-- 34 / 255 ≈ 0.133 -->
			<feFuncB type="table" tableValues="0.133 1" />
			<!-- 34 / 255 ≈ 0.133 -->
		</feComponentTransfer>
	</filter>
</svg>
