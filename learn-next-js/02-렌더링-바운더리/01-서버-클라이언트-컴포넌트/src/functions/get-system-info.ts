export const getSystemInfo = () => [
  {
    label: 'OS',
    value: 'macOS? Windows? Linux/Unix?',
  },
  { 
    label: 'CPU', 
    value: '?? 코어' 
  },
  { 
    label: 'Node.js', 
    value: 'x.y.z' 
  },
  {
    label: 'RAM',
    value: '?? GB',
  },
]

export type SystemInfo = ReturnType<typeof getSystemInfo>