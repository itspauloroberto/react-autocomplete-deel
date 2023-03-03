import { useEffect } from 'react';
export function useEventListener(eventType: keyof DocumentEventMap, eventTrigger: any, callbackFn: any) {
  useEffect(() => {
    document.addEventListener(eventType, callbackFn);

    return () => {
      document.removeEventListener(eventType, callbackFn);
    };
  }, [eventTrigger]);
}