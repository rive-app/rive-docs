export const Demos = ({
  examples,
  // If you only want to display examples from a single runtime
  runtime,
  columns = 2,
  // For custom cards
  children,
  // where in the list do you want to put the custom children
  childrenIndex = 0
}) => {
  const examplesData = {
    cachingARiveFile: {
      title: 'Caching a Rive File',
      description: 'Load the .riv into memory once, use it multiple times.',
      riv: 'https://static.rive.app/rivs/rives_animated_emojis.riv',
      stateMachines: "State Machine 1",
      artboard: "Emoji_package",
      links: {
        web: "https://codesandbox.io/p/sandbox/rive-js-caching-a-rive-file-g675my?file=%2Fsrc%2Findex.ts%3A9%2C1",
        react: "https://codesandbox.io/p/sandbox/rive-react-caching-a-rive-file-53gmdf?file=%2Fsrc%2FApp.tsx"
      }
    },
    dataBindingArtboards: {
      title: 'Data Binding Artboards',
      description:
        'Swap an artboard with another artboard from the same .riv or one loaded at runtime.',
      image: '/images/runtimes/rive-data-bind-components.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/rive-js-data-binding-artboards-jx3pf9?file=%2Fsrc%2Findex.mjs%3A5%2C19',
        react:
          'https://codesandbox.io/p/sandbox/rive-react-data-binding-artboards-kmvzh8?file=%2Fsrc%2FApp.tsx',
        flutter: 'https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_artboards.dart'
      },
    },
    dataBindingImages: {
      title: 'Data Binding Images',
      description:
        'Replace images at runtime using data binding images with javascript.',
      image: '/images/runtimes/rive-db-images.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/objective-cohen-sqwh9q',
        flutter: 'https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_images.dart'
      },
    },
    dataBindingLists: {
      title: 'Data Binding Lists',
      description: 'Add, remove, edit, and swap items in your data binding list.',
      image: '/images/runtimes/rive-db-lists.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/suspicious-hertz-2lg4m8?file=%2Fsrc%2Findex.ts',
        react:
          'https://codesandbox.io/p/sandbox/rive-react-data-binding-lists-4msh9z?file=%2Fsrc%2FApp.tsx',
        flutter: 'https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_lists.dart'
      },
    },
    dataBindingQuickStart: {
      title: "Data Binding Quick Start",
      description: "Get started with Data Binding at runtime.",
      image: "/images/runtimes/rewards.gif",
      links: {
        flutter: "https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding.dart",
        reactNative: "https://github.com/rive-app/rive-react-native/blob/main/example/app/(examples)/DataBinding.tsx",
        unity: "https://github.com/rive-app/rive-unity-examples/blob/main/getting-started/Assets/RewardsController.cs",
        apple: "https://github.com/rive-app/rive-ios/blob/main/Example-iOS/Source/Examples/SwiftUI/RewardsView.swift"
      }
    },
    dataBindingSolos: {
      title: "Data Binding Solos",
      description: "Control solos at runtime using strings, numbers, or enums.",
      image: '/images/runtimes/data-binding-solos.gif',
      links: {
        react: "https://codesandbox.io/p/sandbox/rive-react-controlling-solos-at-runtime-ctcnlx?file=%2Fsrc%2FApp.tsx"
      }
    },
    googleAppAds: {
      title: "Google App Ads",
      description: "How to make an interactive Google App with Rive.",
      image: "/images/runtimes/google-app-ads.png",
      links: {
        mobile: "https://github.com/rive-app/rive-use-cases/tree/main/rive-google-ads"
      }
    },
    layouts: {
      title: "Responsive Layouts",
      description: "Create responsive layouts that adapt to different screen sizes.",
      riv: "https://static.rive.app/rivs/layouts_demo.riv",
      stateMachines: "State Machine 1",
      artboard: "Demo",
      links: {
        web: "https://codesandbox.io/p/devbox/rive-responsive-layout-js-forked-m77nlw",
        react: "https://codesandbox.io/p/devbox/rive-responsive-layouts-react-forked-nmpv39?file=%2Fsrc%2FApp.tsx",
        flutter: "https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/responsive_layouts.dart",
        reactNative: 'https://github.com/rive-app/rive-react-native/blob/main/example/app/(examples)/ResponsiveLayout.tsx'
      },
    },
    fontsHostedCompressed: {
      title: 'Load a Compressed Font for Web',
      description: 'Dynamically load a font asset from a hosted location with compression.',
      image: '/images/runtimes/brotli-compressed-fonts.webp',
      links: {
        react:
          'https://codesandbox.io/p/sandbox/prod-sound-6yc5xl?file=%2Fsrc%2FApp.tsx%3A19%2C1',
      },
    },
    quickStart: {
      title: "Quick Start",
      image: '/images/runtimes/quick-start.gif',
      description: 'Load and control your Rive (.riv) file.',
      links: {
        web: 'https://codesandbox.io/p/sandbox/rive-quick-start-js-xmwcm6?file=%2Fsrc%2Findex.ts',
        react: 'https://codesandbox.io/p/sandbox/rive-react-quick-start-4xy76h?file=%2Fsrc%2FApp.tsx%3A77%2C14',
        reactJs: 'https://codesandbox.io/p/devbox/rive-react-vanilla-js-quick-start-kz66t4?file=%2Fsrc%2FApp.tsx%3A53%2C7',
        reactNative: 'https://github.com/rive-app/rive-react-native/blob/main/example/app/(examples)/QuickStart.tsx'
      }
    },
    quickStartReact: {
      title: "Quick Start",
      image: '/images/runtimes/quick-start.gif',
      description: 'Load and control your Rive (.riv) file.',
      links: {
        react: 'https://codesandbox.io/p/sandbox/rive-react-quick-start-4xy76h?file=%2Fsrc%2FApp.tsx%3A77%2C14',
        reactJs: 'https://codesandbox.io/p/devbox/rive-react-vanilla-js-quick-start-kz66t4?file=%2Fsrc%2FApp.tsx%3A53%2C7',
      }
    },
    scriptingDrawingShapes: {
      title: "Drawing Shapes with Scripting",
      image: "/images/scripting/tipping-scripting-converter.gif",
      description: "TO DO",
      links: {
        editor: "TO DO"
      }
    },
    scriptingTippingConverter: {
      title: "Converter Script with View Model Properties",
      image: "/images/scripting/tipping-scripting-converter.gif",
      description: "Calculate the bill total using the converter's input value added to data binding values.",
      links: {
        editor: "TO DO"
      }
    },
    scriptingUnitTesting: {
      title: "Unit Testing Demo",
      image: "/images/scripting/debugging/unit-testing-demo.png",
      description: "This hands-on example demonstrates unit testing rgbToHex and hexToRgb color utilities.",
      links: {
        editor: "https://editor.uat.rive.app/file/unit-testing/30348"
      }
    },
    scriptingSnakeGame: {
      title: "Snake Game",
      image: "/images/scripting/tipping-scripting-converter.gif",
      description: "TO DO",
      links: {
        editor: "TO DO"
      }
    },
    starRating: {
      title: "Android New Compose API Quick Start",
      image: "/images/runtimes/star-rating.webp",
      description: "Get started with the new Compose API (Technical Preview) for Android.",
      links: {
        android: "https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/ComposeActivity.kt"
      }
    }
  }


  /*
    No need to edit below this line
  */
  const runtimesInOrder = [
    'web',
    'react',
    'reactJs',
    'reactNative',
    'flutter',
    'apple',
    'android',
    'unity',
    'unreal',
    'mobile',
    'editor'
  ]
  const runtimeTitles = {
    web: 'Web',
    reactJs: 'React (Imperative)',
    react: 'React',
    reactNative: "React Native",
    flutter: 'Flutter',
    apple: 'Apple',
    android: 'Android',
    unity: 'Unity',
    unreal: 'Unreal',
    mobile: 'Mobile',
    editor: 'Try in Rive'
  }

  // Keep track of Rive instances for when the window resizes
  const riveInstances = useRef([]);

  // After Rive has loaded globally, initialize the Rive instances
  const initRives = () => {
    const rive = window.rive;

    examples.forEach((example) => {
      const { riv, stateMachines = "State Machine 1", artboard } = examplesData[example];
      if (riv) {
        const canvasId = `rive-canvas-${example}`;
        const canvas = document.getElementById(canvasId);

        if (canvas) {
          const r = new rive.Rive({
            src: riv,
            stateMachines,
            canvas,
            artboard,
            autoplay: true,
            Layout: new rive.Layout({
              fit: rive.Fit.Layout,
            }),
            onLoad: () => {
              r.resizeDrawingSurfaceToCanvas();
              riveInstances.current.push(r)
            }
          });
        }
      }
    });
  }

  // Listen for the Rive script to load globally
  useEffect(() => {
    if (window.rive) {
      initRives()
      return;
    }

    const checkRive = () => {
      if (window.rive) {
        initRives()
        window.removeEventListener("rive-loaded", checkRive);
      }
    };

    const handleResize = () => {
      riveInstances.current.forEach((instance) => {
        instance.resizeDrawingSurfaceToCanvas();
      });
    }

    // You can dispatch your own event from the global loader
    window.addEventListener("rive-loaded", checkRive);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("rive-loaded", checkRive);
      window.removeEventListener("resize", handleResize);


      riveInstances.current.forEach((instance) => {
        instance.cleanup()
      })
    };
  }, []);

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

  const CardContainer = ({ children: content, link }) => {
    if (link) {
      return (
        <a
          href={link}
          className="card block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark border border-gray-950/10 dark:border-white/10 overflow-hidden w-full cursor-pointer hover:!border-primary dark:hover:!border-primary-light"
        >
          { content }
        </a>
      )
    }

    return (
      <div
        className="flex flex-col card block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark border border-gray-950/10 dark:border-white/10 overflow-hidden w-full"
      >
        { content }
      </div>
    )
  }

  // TO DO: Temporary solution until Mintlify fixes variables as src
  const getSrc = (imageSrc) => {
    //
    if (location.hostname === "localhost" && imageSrc.startsWith("/images/")) {
      return imageSrc
    }

    return `https://rive.app/docs${imageSrc}`
  }

  return (
    <div className={`
        card-group not-prose grid gap-x-4
        grid-cols-1
        ${columns >= 2 && "md:grid-cols-2"}
        ${columns >= 3 && "xl:grid-cols-3 xl:w-[67rem] xl:max-w-[calc(100vw-25rem)]"}
      `
    }>
      {examples.map((example, index) => {
        const { title, image, links, description, riv } = examplesData[example]
        const canvasId = `rive-canvas-${example}`

        return (
          <>
            {
              index === childrenIndex && children
            }
            <CardContainer
              key={canvasId}
              link={runtime && links[runtime]}
            >
              <div className="w-full h-0 relative pb-[75%]">
                <div className="absolute inset-0">
                  {
                    image && (
                      <img
                        alt={title}
                        className="w-full object-cover object-center"
                        src={getSrc(image)}
                      />
                    )
                  }

                  {
                    riv && !image && (
                      <canvas id={canvasId} style={{ width: "100%", height: "100%"}} />
                    )
                  }
                </div>
              </div>
              <div className="flex flex-grow flex-col px-6 py-5 relative" data-component-part="card-content-container">
                {
                  runtime && (

                    <div id="card-link-arrow-icon" className="absolute text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light top-5 right-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-right w-4 h-4"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </div>
                  )
                }

                <div className="flex flex-col grow">
                  <h2 className="not-prose font-semibold text-base text-gray-800 dark:text-white" data-component-part="card-title">{ title }</h2>

                  <div className="flex flex-col grow prose mt-1 font-normal text-sm leading-6 text-gray-600 dark:text-gray-400" data-component-part="card-content">
                    <div className="grow flex flex-col">
                      {description}
                    </div>
                    {
                      !runtime && (
                        <div className="mt-6 flex flex-wrap">
                          {
                            runtimesInOrder.map((currentRuntime) => {
                              return (
                                <RuntimeLink key={currentRuntime} runtime={currentRuntime} link={links[currentRuntime]} />
                              )
                            })
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </CardContainer>
          </>
        )
      })}
    </div>
  )
}
