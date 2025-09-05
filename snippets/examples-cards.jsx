export const ExamplesCards = ({
  examples,
  runtime,
}) => {
  const examplesData = {
    dataBindingArtboards: {
      title: 'Data Binding Artboards',
      description:
        'Swap an artboard with another artboard from the same .riv or one loaded at runtime.',
      image: '/images/runtimes/rive-data-bind-components.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/rive-js-data-binding-artboards-jx3pf9?file=%2Fsrc%2Findex.mjs%3A5%2C19',
        react:
          'https://codesandbox.io/p/sandbox/rive-react-data-binding-artboards-kmvzh8?file=%2Fsrc%2FApp.tsx',
      },
    },
    dataBindingImages: {
      title: 'Data Binding Images',
      description:
        'Replace images at runtime using data binding images with javascript.',
      image: '/images/runtimes/rive-db-images.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/objective-cohen-sqwh9q',
      },
    },
    dataBindingLists: {
      title: 'Data Binding Lists',
      description: 'Add, remove, edit, and swap items in your data binding list',
      image: '/images/runtimes/rive-db-lists.webp',
      links: {
        web: 'https://codesandbox.io/p/sandbox/suspicious-hertz-2lg4m8?file=%2Fsrc%2Findex.ts',
        react:
          'https://codesandbox.io/p/sandbox/rive-react-data-binding-lists-4msh9z?file=%2Fsrc%2FApp.tsx',
      },
    },
    fontsHostedCompressed: {
      title: 'Load a Hosted, Compressed Font Asset',
      description: 'Dynamically load a font asset from a hosted location with compression.',
      image: '/images/runtimes/brotli-compressed-fonts.webp',
      links: {
        react:
          'https://codesandbox.io/p/sandbox/prod-sound-6yc5xl?file=%2Fsrc%2FApp.tsx%3A19%2C1',
      },
    }
  }

  return (
    <Columns cols={2}>
      {examples.map((example) => {
        const { title, image, links, description } = examplesData[example]
        return (
          <Card key={title} title={title} img={image} href={links[runtime]} >
            {description}
          </Card>
        )
      })}
    </Columns>
  )
}
