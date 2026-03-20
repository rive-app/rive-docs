export const Runtimes = ({ runtimes = {}, cols = 3 }) => {
  const RUNTIME_DEFS = [
	{ key: 'web', title: 'Web (JS)', icon: 'js' },
	{ key: 'react', title: 'React', icon: 'react' },
	{ key: 'reactNative', title: 'React Native', icon: 'react' },
	{ key: 'flutter', title: 'Flutter', icon: 'flutter' },
	{ key: 'apple', title: 'Apple (iOS/macOS)', icon: 'apple' },
	{ key: 'android', title: 'Android', icon: 'android' },
	{ key: 'unity', title: 'Unity', icon: 'unity' },
	{
		key: 'unreal',
		title: 'Unreal Engine',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="text-primary dark:text-primary-light" viewBox="0 0 512 512" aria-hidden="true">
				<path
					fill="currentColor"
					d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm65.5-113.7l-25.1-28.3-42.4 42.6c-24.1-.3-47.9-6.2-69.3-17.2s-40.1-26.9-54.5-46.3c4.5 1.4 9.2 2.3 13.9 2.6 6.9 .1 14.5-2.4 14.5-14.1l0-115.1c.1-3-.5-5.9-1.7-8.6s-3.1-5-5.4-6.9-5-3.1-7.9-3.7-5.9-.5-8.8 .2c-19.6 4.5-35.3 53.5-35.3 53.5-.2-22.6 4.5-45 13.8-65.6s23-39 40.1-53.8c22.5-19.5 50.1-32.2 79.6-36.7-21.4 12.2-33.5 32.1-33.5 48.9 0 26.9 16.2 23.6 21 19.7l0 155.3c.8 1.9 1.9 3.8 3.2 5.5 2.1 3 5 5.4 8.2 7s6.9 2.5 10.5 2.5c16.2 0 37.3-18.5 37.3-18.5l0-125.7c0-12.8-9.6-28.2-19.3-33.5 0 0 17.9-3.2 31.7 7.4 2.6-3.2 5.3-6.2 8.2-9.1 32.2-31.6 62.5-40.6 87.7-45.1 0 0-45.9 36.1-45.9 84.5 0 36 .9 123.8 .9 123.8 17 16.4 42.4-7.3 65.2-30.8-4.4 21.3-24 75.9-86.6 105.4z"
				/>
			</svg>
		)
	}
]

	const cards = RUNTIME_DEFS.filter((runtime) => Boolean(runtimes[runtime.key]))

  if (cards.length === 0) {
		return null
	}

	return (
		<CardGroup cols={cols}>
			{cards.map((runtime) => (
				<Card
					key={runtime.key}
					title={runtime.title}
					href={runtimes[runtime.key]}
					icon={runtime.icon}
				/>
			))}
		</CardGroup>
	)
}

export default Runtimes
