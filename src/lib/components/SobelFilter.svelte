<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
	<filter id="sobel" color-interpolation-filters="sRGB">
		<!-- Convert to grayscale -->
		<feColorMatrix
			type="matrix"
			in="SourceGraphic"
			result="RA"
			values="0 0 0 0 1
		0 0 0 0 1
		0 0 0 0 1
		1 0 0 0 0"
		></feColorMatrix>
		<feColorMatrix
			type="matrix"
			in="SourceGraphic"
			result="GA"
			values="0 0 0 0 1
		0 0 0 0 1
		0 0 0 0 1
		0 1 0 0 0"
		></feColorMatrix>
		<feColorMatrix
			type="matrix"
			in="SourceGraphic"
			result="BA"
			values="0 0 0 0 1
		0 0 0 0 1
		0 0 0 0 1
		0 0 1 0 0"
		></feColorMatrix>
		<feDiffuseLighting in="RA" result="R" surfaceScale="8.0">
			<feDistantLight elevation="90"></feDistantLight>
		</feDiffuseLighting>
		<feDiffuseLighting in="GA" result="G" surfaceScale="8.0">
			<feDistantLight elevation="90"></feDistantLight>
		</feDiffuseLighting>
		<feDiffuseLighting in="BA" result="B" surfaceScale="8.0">
			<feDistantLight elevation="90"></feDistantLight>
		</feDiffuseLighting>
		<feColorMatrix
			type="matrix"
			in="R"
			result="RS"
			values="-1 0 0 0 1
		0 0 0 0 0
		0 0 0 0 0
		0 0 0 0 1"
		></feColorMatrix>
		<feColorMatrix
			type="matrix"
			in="G"
			result="GS"
			values="0 0 0 0 0
		0 -1 0 0 1
		0 0 0 0 0
		0 0 0 0 1"
		></feColorMatrix>
		<feColorMatrix
			type="matrix"
			in="B"
			result="BS"
			values="0 0 0 0 0
		0 0 0 0 0
		0 0 -1 0 1
		0 0 0 0 1"
		></feColorMatrix>
		<feComposite in="RS" in2="GS" result="RSGS" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"
		></feComposite>
		<feComposite in="RSGS" in2="BS" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"></feComposite>

		<!-- Invert the result -->
		<!-- <feComponentTransfer>
			<feFuncA type="table" tableValues="1 0" />
		</feComponentTransfer> -->

		<!-- Output as grayscale using alpha as visual intensity -->
		<!-- <feColorMatrix
			type="matrix"
			values="0 0 0 0 1
		    0 0 0 0 1
		    0 0 0 0 1
		    0 0 0 1 0"
		/> -->
	</filter>
</svg>
