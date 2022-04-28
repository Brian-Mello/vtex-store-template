declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.global.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  const content: any
  export default content
  const classNames: IClassNames
  export = classNames
}

declare module '*.gql' {
  import type { DocumentNode } from 'graphql'

  const value: {
    [key: string]: DocumentNode
  }
  export = value
}

declare module '*.png';

declare module 'vtex.order-items/OrderItems' {
  export const useOrderItems: () => any
}

declare module 'vtex.search-page-context/SearchPageContext' {
  export const useSearchPage: () => any
}
