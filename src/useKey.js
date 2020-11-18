import { useEffect, useState } from "react"
export const useKey = key => {
  const [pressed, setPressed] = useState(false);
  const match = e => key.toLowerCase() === e.key.toLowerCase();
  const onDown = e => {
    if (match(e)) setPressed(true);
  };
  const onUp = e => {
    if (match(e)) setPressed(false);
  };
  useEffect(() => {
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  });
  return pressed;
};