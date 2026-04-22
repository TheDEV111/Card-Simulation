export default function ConditionalWrap({ condition, wrapper, children }) {
  return condition ? wrapper(children) : children;
}
