export function save(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

export function load(name) {
  try {
    return JSON.parse(localStorage.getItem(name))
  } catch (error) {
    console.log(`No entry with name ${name} found.`)
  }
}
