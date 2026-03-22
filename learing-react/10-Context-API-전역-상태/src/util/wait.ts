export async function wait(delay = 1000, successOrFail = false) {
  return new Promise((resolve, reject) => {
    let excuteFn = resolve
    if (successOrFail && Math.random() < 0.5) excuteFn = reject
    setTimeout(excuteFn, delay)
  })
}
