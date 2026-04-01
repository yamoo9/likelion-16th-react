import os from 'node:os'
import process from 'node:process'

export const getSystemInfo = () => [
  {
    label: 'OS',
    value: getOSInfo(),
  },
  {
    label: 'CPU',
    value: `${os.cpus().length} 코어`,
  },
  {
    label: 'Node.js',
    value: process.version,
  },
  {
    label: 'RAM',
    value: `${Math.round(os.totalmem() / 1024 ** 3)} GB`,
  },
]

export type SystemInfo = ReturnType<typeof getSystemInfo>

function getOSInfo() {
  const platform = os.platform()
  if (platform === 'darwin') return 'macOS'
  if (platform === 'win32') return 'Windows'
  if (platform === 'linux') return 'Linux/Unix'
  return 'unknown OS'
}