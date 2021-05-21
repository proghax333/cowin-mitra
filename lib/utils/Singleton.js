
export function useSingleton(ObjectType) {
  let instance = null;
  return () => {
    return instance || (instance = new ObjectType());
  };
}
