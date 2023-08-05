# @skagoo/labs

This is a monorepo with multiple standalone web [apps](./apps) which share some local packages:

- [./packages/react-three-fiber-ext](./packages/react-three-fiber-ext): Exports custom react-three-fiber components and hooks that use [react-three-fiber](https://github.com/pmndrs/react-three-fiber), React and TypeScript.

The monorepo is built using [Turborepo](https://turborepo.org/) and [pnpm workspaces](https://pnpm.io/workspaces) to link packages together.
