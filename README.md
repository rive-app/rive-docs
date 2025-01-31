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