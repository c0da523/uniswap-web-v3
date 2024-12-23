// 1. 直接导入 SVG 作为 React 组件
declare module '*.svg' {
  import React from 'react'
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default SVGComponent
}

// 2. 使用 ?url 后缀导入 SVG URL
declare module '*.svg?url' {
  const content: string
  export default content
}

// 3. 使用 ?raw 后缀导入 SVG 源代码
declare module '*.svg?raw' {
  const content: string
  export default content
}

// 4. 使用 ?component 后缀显式导入为组件
declare module '*.svg?component' {
  import React from 'react'
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default SVGComponent
}
