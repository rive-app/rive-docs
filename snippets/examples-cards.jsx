import { useEffect, useRef } from "react";

export const ExamplesCards = ({
  examples,
  runtime,
  children,
  cols = 2
}) => {
  const examplesData = {
    dataBindingArtboards: {
      title: 'Example: Data Binding Artboards',
      description:
        'Swap an artboard with another artboard from the same .riv or one loaded at runtime.',
      image: '/images/app-runtimes/data-binding/rive-data-bind-components.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/rive-js-data-binding-artboards-jx3pf9?file=%2Fsrc%2Findex.mjs%3A5%2C19',
        react:
          'https://codesandbox.io/p/sandbox/rive-react-data-binding-artboards-kmvzh8?file=%2Fsrc%2FApp.tsx',
      },
    },
    dataBindingImages: {
      title: 'Example: Data Binding Images',
      description:
        'Replace images at runtime using data binding images with javascript.',
      image: '/images/app-runtimes/data-binding/rive-db-images.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/objective-cohen-sqwh9q',
      },
    },
    dataBindingLists: {
      title: 'Example: Data Binding Lists',
      description: 'Add, remove, edit, and swap items in your data binding list',
      image: '/images/app-runtimes/data-binding/rive-db-lists.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/suspicious-hertz-2lg4m8?file=%2Fsrc%2Findex.ts',
        react:
          'https://codesandbox.io/p/sandbox/rive-react-data-binding-lists-4msh9z?file=%2Fsrc%2FApp.tsx',
      },
    },
    layouts: {
      title: "Responsive Layouts",
      description: "Create responsive layouts that adapt to different screen sizes.",
      riv: "/assets/rivs/layouts_demo.riv",
      stateMachines: "State Machine 1",
      artboard: "Demo",
      links: {
        web: "https://codesandbox.io/p/devbox/rive-responsive-layout-js-forked-m77nlw",
      },
    }
  }

  // Keep track of Rive instances for when the window resizes
  const riveInstances = useRef([]);

  // After Rive has loaded globally, initialize the Rive instances
  const initRives = () => {
    const rive = window.rive;

    examples.forEach((example) => {
      const { riv, stateMachines = "State Machine 1", artboard } = examplesData[example];
      if (riv) {
        const canvasId = `rive-canvas-${example}-${runtime}`;
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
    };
  }, []);

  return (
    <Columns cols={cols}>
      { children }
      {examples.map((example) => {
        const { title, image, links, description, riv, stateMachines, artboard } = examplesData[example]
        const href = links[runtime]

        if (image) return  (
          <Card key={title} title={title} img={image} href={href} >
            {description}
          </Card>
        )

        if (riv && !image) {
          const canvasId = `rive-canvas-${example}-${runtime}`

          return (
            <a
              key={title}
              href={href}
              target="_blank"
              className="card block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark border border-gray-950/10 dark:border-white/10 overflow-hidden w-full cursor-pointer hover:!border-primary dark:hover:!border-primary-light"
            >
              <div className="w-full h-0 relative pb-[75%]">
                <div className="absolute inset-0">
                  <canvas id={canvasId} style={{ width: "100%", height: "100%"}} />
                </div>
              </div>
              <div className="px-6 py-5 relative" data-component-part="card-content-container">
                <div id="card-link-arrow-icon" className="absolute text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light top-5 right-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-right w-4 h-4"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </div>
                <div>
                  <h2 className="not-prose font-semibold text-base text-gray-800 dark:text-white" contenteditable="false" data-component-part="card-title">{ title }</h2>
                  {
                    description && (
                      <div className="prose mt-1 font-normal text-sm leading-6 text-gray-600 dark:text-gray-400" data-component-part="card-content">
                        <span data-as="p">{ description }</span>
                      </div>
                    )
                  }
                </div>
              </div>
            </a>
          )
        }
      })}
    </Columns>
  )
}
