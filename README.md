# Rive Docs

Welcome to the official repository for Rive's documentation, available at [https://rive.app/docs](https://rive.app/docs).

## Contributing

We welcome any and all external contributions. For more information, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Getting Started

1. Clone the [rive-docs](https://github.com/rive-app/rive-docs) repository.
2. Set up for local development as described in [Mintlify](#mintlify).
3. Update the documentation, following the [contribution guide](./CONTRIBUTING.md).
4. Run `mintlify dev` to preview your changes locally
5. Create your pull request, following the [contribution guide](./CONTRIBUTING.md#creating-your-pull-request).

## Mintlify

Rive uses [Mintlify](https://mintlify.com) for documentation. Follow Mintlify's [Local Development](https://mintlify.com/docs/development) guide to set up your local environment for previewing your changes locally.

### Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where mint.json is)

```
mintlify dev
```


#### Troubleshooting

- Mintlify dev isn't running - Run `mintlify install` it'll re-install dependencies.
- Page loads as a 404 - Make sure you are running in a folder with `mint.json` (i.e from this repository's root directory).

## Custom Rive Components

#### YouTube

Display a YouTube video

```jsx
import { YouTube } from '/snippets/youtube.mdx'

<YouTube id="6J3JIwgUwe0" />
```

#### Marketplace Links

![Marketplace Snippet](/images/marketplace-snippet.png)

1. Publish the demo to the Marketplace using the support at Rive user account (credentials in 1password).

```jsx
import { Marketplace } from '/snippets/marketplace.mdx'

<Marketplace
  href="https://rive.app/community/files/26116-48795-animating-draw-order"
/>
```

#### Demos

![Demos Snippet](/images/demos-snippet.png)

1. Publish the demo to the Marketplace using the support at Rive user account (credentials in 1password).
2. Upload the 400x300px thumbnail to the `rive-static-content/docs` S3 bucket (This is necessary until Mintlify supports hosting images that are in an array).
3. Add a new item in the `examplesData` array in demos.jsx.

```jsx
import { Demos } from '/snippets/demos.jsx'

// Display a single demos
<Demos examples={['dataBindingQuickStart']} />

// Display multiple demos
<Demos examples={['dataBindingQuickStart', 'cachingARiveFile']} />

// Display only content for a single runtime
<Demos examples={['dataBindingQuickStart']} runtime="apple" />

// Define the number of columns
<Demos examples={['dataBindingQuickStart']} columns={3} />

// Add a custom child component
// See demos.mdx for a real example
<Demos examples={['dataBindingQuickStart']} childrenIndex={0} >
  <div>I'm a child!</div>
</Demos>
```
