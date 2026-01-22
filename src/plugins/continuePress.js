import { ref } from "vue";

export default function useLongPress(callback, options = {}) {
  const { duration = 500, interval = 80 } = options;
  const isPressed = ref(false);
  let pressTimer = null;
  let intervalTimer = null;

  const start = (event) => {
    isPressed.value = true;
    pressTimer = setTimeout(() => {
      callback(event);

      intervalTimer = setInterval(() => {
        if (isPressed.value) {
          callback(event);
        }
      }, interval);
    }, duration);
  };

  const stop = () => {
    isPressed.value = false;
    if (pressTimer) clearTimeout(pressTimer);
    if (intervalTimer) clearInterval(intervalTimer);
  };

  return { start, stop };
}
