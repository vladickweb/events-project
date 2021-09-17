const nav = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
	nav.classList.toggle('change', window.scrollY > 0)
})

;(function () {
	const applyScrollEffects = () => {
		window.scrollY > 100
			? document.querySelector('.navigation').classList.add('sticky')
			: document.querySelector('.navigation').classList.remove('sticky')
		document.querySelectorAll('.parallax').forEach((elm) => {
			spaceLeft = elm.getBoundingClientRect().top // Returns remaining space between the element and viewport's top

			elm.dataset.axis === 'vertical'
				? (speedVertical = elm.dataset.speed * spaceLeft)
				: (speedVertical = 0)
			elm.dataset.axis === 'horizontal'
				? (speedHorizontal = elm.dataset.speed * spaceLeft)
				: (speedHorizontal = 0)

			elm.style.transform = `translate(${speedHorizontal}px, ${speedVertical}px)`
		})

		// Reveal effects
		document.querySelectorAll('.reveal').forEach((elm) => {
			isInViewport(elm)
				? elm.classList.add('visible')
				: elm.classList.remove('visible')
		})

		// Dynamic background generator
		document.querySelectorAll('.change-background').forEach((elm) => {
			if (isInViewport(elm)) {
				document.querySelector('.fake-bg').style.backgroundColor =
					elm.dataset.color
				document.querySelector('.fake-bg').classList.add('on')
			} else {
				document.querySelector('.fake-bg').classList.remove('on')
			}
		})
	}

	document.addEventListener('scroll', applyScrollEffects)

	// Scroll navigation links
	const scrollButtons = document.querySelectorAll('.scrollto')
	scrollButtons.forEach((elm) => {
		elm.onclick = (e) => {
			e.preventDefault()
			const href = elm.getAttribute('href')
			document.querySelector(href).scrollIntoView({behavior: 'smooth'})
		}
	})

	// Object viewport detection
	const isInViewport = (el) => {
		const rect = el.getBoundingClientRect()
		const vertInView =
			rect.top <= window.innerHeight && rect.top + rect.height >= 0
		const horInView =
			rect.left <= window.innerWidth && rect.left + rect.width >= 0
		return vertInView && horInView
	}
})()
