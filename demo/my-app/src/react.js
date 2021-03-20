export const createElement = (tag, props, ...children) => {
  return {
    tag,
    props,
    children
  }
}

export default {
  createElement
}