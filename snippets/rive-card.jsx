export const RiveCard = ({ title, description, links, children }) => {

  const runtimesInOrder = ['web', 'react', 'reactNative', 'flutter', 'apple', 'android', 'unity', 'unreal']
  const runtimeTitles = {
    web: 'Web',
    react: 'React',
    reactNative: "React Native",
    flutter: 'Flutter',
    apple: 'Apple',
    android: 'Android',
    unity: 'Unity',
    unreal: 'Unreal'
  }

  const RuntimeLink = ({ link, runtime }) => {
    if (!link) return null

    return (
      <a
        href={link }
        target="_blank"
        className="cursor-pointer border border-neutral-600 hover:border-white rounded-[4px] text-14 py-1 px-5 mr-[10px] mb-[10px]"
      >
        {runtimeTitles[runtime]}
      </a>
    )
  }

  return (
    <div
      className="flex flex-col card block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark border border-gray-950/10 dark:border-white/10 overflow-hidden w-full"
    >

      <div className="w-full h-0 relative pb-[75%]">
        <div className="absolute inset-0">
          { children }
        </div>
      </div>

      <div className="flex flex-grow flex-col px-6 py-5 relative" data-component-part="card-content-container">
      <div className="flex flex-col grow">
        <h2 className="not-prose font-semibold text-base text-gray-800 dark:text-white" data-component-part="card-title">{title}</h2>
        <div className="flex flex-col grow prose mt-1 font-normal text-sm leading-6 text-gray-600 dark:text-gray-400" data-component-part="card-content">
          <div className="grow flex flex-col">
            {description}
          </div>
            <div className="mt-6 flex flex-wrap">
              {
                runtimesInOrder.map((currentRuntime) => {
                  return (
                    <RuntimeLink key={currentRuntime} runtime={currentRuntime} link={links[currentRuntime]} />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )

};
