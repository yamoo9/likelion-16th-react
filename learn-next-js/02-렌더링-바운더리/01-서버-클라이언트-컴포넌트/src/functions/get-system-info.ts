import os from 'node:os'
import process from 'node:process'

export const getSystemInfo = () => [
  {
    label: 'OS',
    value: 'macOS? Windows? Linux/Unix?',
  },
  { 
    label: 'CPU', 
    value: `${os.cpus().length} 코어`
  },
  { 
    label: 'Node.js', 
    value: process.version 
  },
  {
    label: 'RAM',
    value: `${os.totalmem() / (1024 ** 3) } GB`,
  },
]

export type SystemInfo = ReturnType<typeof getSystemInfo>